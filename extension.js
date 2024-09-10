const vscode = require('vscode');
const initializeProject = require('./src/Init-Project');

function activate(context) {
  console.log('CodeJumpstart: Fuel your projects, one setup at a time.');

  // Register the initializeProject command
  let initializeCommand = vscode.commands.registerCommand('codejumpstart.initializeProject', async function () {
    vscode.window.showInformationMessage('Kickstarting the code generator... Amaan is on the job!');

    // Call the initializeProject function here
    await initializeProject();

    // Show success message when initialization is complete
    vscode.window.showInformationMessage('All set! Build something epic.');
  });

  context.subscriptions.push(initializeCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};




// const vscode = require('vscode');
// const scaffoldProject = require('./src/Init-Project');

// function activate(context) {
//   console.log('CodeJumpstart: Fuel your projects, one scaffold at a time.');

//   let scaffoldCommand = vscode.commands.registerCommand('codejumpstart.scaffoldProject', async function () {
//     vscode.window.showInformationMessage('Kickstarting the code generator... Amaan is on the job!');

//     // Call the scaffoldProject function here
//     await scaffoldProject();
//   });

//   context.subscriptions.push(scaffoldCommand);
// }

// function deactivate() {}

// module.exports = {
//   activate,
//   deactivate
// };
