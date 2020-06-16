// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { Disposable, ExtensionContext, commands, window, languages, workspace, DocumentSelector } from 'vscode';
import { SassCodelensProvider } from './SassCodeLensProvider';
import { CommandName, helloWorld } from './commands';


let disposables: Array<Disposable> = [];

/**
 * this method is called when your extension is activated
 * your extension is activated the very first time the command is executed
 * @param context the context of the extension
 */
export function activate(context: ExtensionContext): void {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sass-diviner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json


	// Display a message box to the user
	const codelensProvider = new SassCodelensProvider(window.activeTextEditor);
	const selector: DocumentSelector = {
		language: 'scss',
		scheme: 'file',
	};
	const codeLensProviderDisposable = languages.registerCodeLensProvider(selector, codelensProvider);

	commands.registerCommand("sass-diviner.codelensAction", (args: any) => {
		window.showInformationMessage(`CodeLens action clicked with args=${args}`);
	});

	// to start the plugin
	commands.registerCommand("sass-diviner.start", () => {
		workspace.getConfiguration("codelens-sample").update("enableCodeLens", true, true);
	});
	// to stop the plugin
	commands.registerCommand("sass-diviner.stop", () => {
		workspace.getConfiguration("codelens-sample").update("enableCodeLens", false, true);
	});

	context.subscriptions.push(commands.registerCommand(CommandName.helloWorld, helloWorld));

	context.subscriptions.push(codeLensProviderDisposable);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate(): void {
	if (disposables) {
		disposables.forEach(item => item.dispose());
	}
	disposables = [];
}
