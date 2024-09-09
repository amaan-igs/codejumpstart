const vscode = require('vscode');
const scaffoldProject = require('./src/scaffoldProject');

function activate(context) {
  console.log('CodeJumpstart: Fuel your projects, one scaffold at a time.');

  let scaffoldCommand = vscode.commands.registerCommand('codejumpstart.scaffoldProject', async function () {
    vscode.window.showInformationMessage('Kickstarting the code generator... Amaan is on the job!');

    // Call the scaffoldProject function here
    await scaffoldProject();
  });

  context.subscriptions.push(scaffoldCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
