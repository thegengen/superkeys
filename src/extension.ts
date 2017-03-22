// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let runner = new Runner();

    var disposable = vscode.commands.registerCommand('superKeys.activate', () => {
        runner.activate();
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(runner);
}

class Runner {
    constructor () {
        this.register('superKeys.quickOpen', 'workbench.action.quickOpen');
        this.register('superKeys.file.new', 'workbench.action.files.newUntitledFile');
    }

    register(ourCommand: string, vsCommand: string) {
        vscode.commands.registerCommand(ourCommand, () => {
            vscode.commands.executeCommand(vsCommand);
            this.deactivate();
        })
    }

    activate() {
        vscode.commands.executeCommand('setContext', 'superKeys.active', true);
        vscode.window.setStatusBarMessage("SK▸ [ FL]");
    }
    deactivate() {
        vscode.commands.executeCommand('setContext', 'superKeys.active', false);
        vscode.window.setStatusBarMessage("");
    }

    dispose() {
    }
}
