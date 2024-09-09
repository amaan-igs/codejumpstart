const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

async function scaffoldProject() {
  // Load Templates
  const templates = loadTemplates();
  if (!templates) {
    return;  // Exit if templates folder is not found or empty
  }

  // Language/Framework Selection
  const languages = Object.keys(templates);
  const selectedLanguage = await vscode.window.showQuickPick(languages, {
    placeHolder: 'Select a language/framework'
  });

  if (!selectedLanguage) {
    vscode.window.showErrorMessage('No language selected!');
    return;
  }

  // Project Name Input
  const projectName = await vscode.window.showInputBox({
    prompt: 'Enter project name',
    value: 'my-project'
  });

  if (!projectName) {
    vscode.window.showErrorMessage('No project name provided!');
    return;
  }

  vscode.window.showInformationMessage('Carving out the perfect project structure... one file at a time.');

  // Scaffold the Project
  const template = templates[selectedLanguage];
  scaffold(template, projectName);
  
  vscode.window.showInformationMessage('All set! Build something epic.');
}

// Function to load templates from the templates folder
function loadTemplates() {
  const templateFolder = path.join(__dirname, '..', 'templates');
  
  // Check if the templates folder exists
  if (!fs.existsSync(templateFolder)) {
    vscode.window.showErrorMessage('Templates folder not found. Make sure it exists in the root of the extension.');
    return null;
  }

  const templates = {};

  // Read all template files from the templates folder
  try {
    fs.readdirSync(templateFolder).forEach(file => {
      const content = fs.readFileSync(path.join(templateFolder, file), 'utf-8');
      templates[file.replace('.json', '')] = JSON.parse(content);
    });
  } catch (error) {
    vscode.window.showErrorMessage('Error reading templates: ' + error.message);
    return null;
  }

  return templates;
}

// Function to scaffold the folder structure and files based on the template
function scaffold(template, projectName) {
  const workspacePath = vscode.workspace.rootPath;

  if (!workspacePath) {
    vscode.window.showErrorMessage('Please open a folder to scaffold the project.');
    return;
  }

  // Create folders and files from the template
  try {
    for (const folder in template.folderStructure) {
      const folderPath = path.join(workspacePath, folder.replace('${projectName}', projectName));
      
      // Check if the folder contains an array (indicating multiple files in that folder)
      if (Array.isArray(template.folderStructure[folder])) {
        // Create the folder
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        // Create each file in the folder
        template.folderStructure[folder].forEach(file => {
          const filePath = path.join(folderPath, file.replace('${projectName}', projectName));
          fs.writeFileSync(filePath, '');  // Create empty files
        });
      } else {
        // If it's not an array, treat it as a file with content
        const filePath = path.join(workspacePath, folder.replace('${projectName}', projectName));
        fs.writeFileSync(filePath, template.folderStructure[folder]);  // Write the file content
      }
    }

    // Create the content files
    for (const file in template.files) {
      let content = template.files[file];

      // If the content is an object, convert it to a JSON string
      if (typeof content === 'object') {
        content = JSON.stringify(content, null, 2); // Pretty-print with 2-space indentation
      }

      // If the content is a string, replace placeholders like ${projectName}
      if (typeof content === 'string') {
        content = content.replace(/\${projectName}/g, projectName);
      }

      const filePath = path.join(workspacePath, file.replace('${projectName}', projectName));
      fs.writeFileSync(filePath, content);  // Write content to the file
    }
  } catch (error) {
    vscode.window.showErrorMessage('Error scaffolding project: ' + error.message);
  }
}

module.exports = scaffoldProject;
