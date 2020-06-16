import { Range, window, SnippetString } from 'vscode';

export enum CommandName {
    helloWorld = 'sass-diviner.helloWorld',
    addLens = 'sass-diviner.addLens',
    codeLensAction = 'sass-diviner.codelensAction',
    start = 'sass-diviner.start',
    stop = 'sass-diviner.stop',
}

export async function addLens() {
    const lineNumStr = await window.showInputBox({
        prompt: "Line Number"
    });

    const lineNum = lineNumStr ? +lineNumStr : 0;

    const insertionLocation = new Range(lineNum - 1, 0, lineNum - 1, 0);
    const snippet = new SnippetString("console.log($1);\n");

    if (window) {
        (window as any).activeTextEditor.insertSnippet(snippet, insertionLocation);
    }
}

export function helloWorld(): void {
    let lineNb = 0;
    const editor = window.activeTextEditor;
    if (editor) {
        lineNb = editor.selection.active.line + 1; // line start with 0
    }
    window.showInformationMessage(`current line is ${lineNb}`);
}
