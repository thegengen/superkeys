// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let file = new Mode('file', 'SK (File)▸ [NSAUDPRL]');
    file.register('new', 'workbench.action.files.newUntitledFile');
    file.register('save', 'workbench.action.files.save');
    file.register('saveAll', 'workbench.action.files.saveAll');
    file.register('undo', 'workbench.action.files.revert');
    file.register('diff', 'workbench.files.action.compareFileWith');
    file.register('path', 'workbench.action.files.copyPathOfActiveFile');
    file.register('reveal', 'workbench.files.action.showActiveFileInExplorer');
    file.register('language', 'workbench.action.editor.changeLanguageMode');

    let line = new Mode('line', 'SK (Line) [UDCXJAB]');
    line.registerRepeating('moveUp', 'editor.action.moveLinesUpAction');
    line.registerRepeating('moveDown', 'editor.action.moveLinesDownAction');
    line.registerRepeating('copy', 'editor.action.copyLinesDownAction');
    line.registerRepeating('delete', 'editor.action.deleteLines');
    line.registerRepeating('above', 'editor.action.insertLineBefore');
    line.registerRepeating('below', 'editor.action.insertLineAfter');

    let select = new Mode('select', 'SK (Select) [GSNPABH/]');
    select.registerRepeating('grow', 'editor.action.smartSelect.grow');
    select.registerRepeating('shrink', 'editor.action.smartSelect.shrink');
    select.registerRepeating('next', 'editor.action.addSelectionToNextFindMatch');
    select.registerRepeating('previous', 'editor.action.addSelectionToPreviousFindMatch');
    select.registerRepeating('above', 'editor.action.insertCursorAbove');
    select.registerRepeating('below', 'editor.action.insertCursorBelow');
    select.registerRepeating('highlights', 'editor.action.selectHighlights');
    select.registerRepeating('searchMatches', 'editor.action.selectAllMatches');

    let navigate = new Mode('navigate', 'SK (Navigate) [DSPBF]');
    navigate.register('definition', 'editor.action.goToDeclaration');
    navigate.register('splitDefinition', 'editor.action.openDeclarationToTheSide');
    navigate.register('previewDefinition', 'editor.action.previewDeclaration');
    navigate.register('back', 'workbench.action.navigateBack');
    navigate.register('forward', 'workbench.action.navigateForward');

    let editor = new Mode('editor', 'SK (Editor)▸ [SNPWGO=]');
    editor.register('split', 'workbench.action.splitEditor');
    editor.register('next', 'workbench.action.nextEditorInGroup');
    editor.register('previous', 'workbench.action.previousEditorInGroup');
    editor.register('close', 'workbench.action.closeActiveEditor');
    editor.register('closeAllInGroup', 'workbench.action.closeEditorsInGroup');
    editor.register('closeOthers', 'workbench.action.closeOtherEditors');
    editor.register('equalWidths', 'workbench.action.evenEditorWidths');

    let ui = new Mode('ui', 'SK (UI)▸ [E/GDOPTFZLSA]');
    ui.register('explorer', 'workbench.view.explorer');
    ui.register('search', 'workbench.view.search');
    ui.register('git', 'workbench.view.git');
    ui.register('debug', 'workbench.view.debug');
    ui.register('output', 'workbench.action.output.toggleOutput');
    ui.register('problems', 'workbench.actions.view.problems');
    ui.register('terminal', 'workbench.action.terminal.toggleTerminal');
    ui.register('fullScreen', 'workbench.action.toggleFullScreen');
    ui.register('zen', 'workbench.action.toggleZenMode');
    ui.register('toggleLayout', 'workbench.action.toggleEditorGroupLayout');
    ui.register('toggleSidebar', 'workbench.action.toggleSidebarVisibility');
    ui.register('toggleActivityBar', 'workbench.action.toggleActivityBar');

    let toplevel = new Mode('toplevel', 'SK▸ [ CFLSNEU]');
    toplevel.register('quickOpen', 'workbench.action.quickOpen');
    toplevel.register('showCommands', 'workbench.action.showCommands');
    toplevel.registerMode(file);
    toplevel.registerMode(line);
    toplevel.registerMode(select);
    toplevel.registerMode(navigate);
    toplevel.registerMode(editor);
    toplevel.registerMode(ui);

    var activate = vscode.commands.registerCommand('superKeys.activate', () => {
        toplevel.activate();
    });

    var deactivate = vscode.commands.registerCommand('superKeys.deactivate', () => {
        toplevel.deactivate();
    });

    context.subscriptions.push(activate);
    context.subscriptions.push(deactivate);
    context.subscriptions.push(file);
    context.subscriptions.push(line);
    context.subscriptions.push(select);
    context.subscriptions.push(navigate);
    context.subscriptions.push(editor);
    context.subscriptions.push(ui);
    context.subscriptions.push(toplevel);
}

class Mode {
    modeLabel : string;
    prompt : string;

    constructor (modeLabel: string, prompt: string) {
        this.modeLabel = modeLabel;
        this.prompt = prompt;
    }

    register(ourCommand: string, vsCommand: string) {
        vscode.commands.registerCommand(`superKeys.${this.modeLabel}.${ourCommand}`, () => {
            vscode.commands.executeCommand(vsCommand);
            this.deactivate();
        })
    }

    registerRepeating(ourCommand: string, vsCommand: string) {
        vscode.commands.registerCommand(`superKeys.${this.modeLabel}.${ourCommand}`, () => {
            vscode.commands.executeCommand(vsCommand);
        })
    }


    registerMode(submode: Mode) {
        console.log(`superKeys.${this.modeLabel}.${submode.modeLabel}`);
        vscode.commands.registerCommand(`superKeys.${this.modeLabel}.${submode.modeLabel}`, () => {
            submode.activate()
        })
    }

    activate() {
        console.log(this);
        vscode.commands.executeCommand('setContext', 'superKeys.mode', this.modeLabel);
        vscode.window.setStatusBarMessage(this.prompt);
    }

    deactivate() {
        vscode.commands.executeCommand('setContext', 'superKeys.mode', null);
        vscode.window.setStatusBarMessage("");
    }

    dispose() {
    }
}
