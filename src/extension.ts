// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cj from 'comment-json';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "theme-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('theme-generator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Theme generator!');
	});
	context.subscriptions.push(disposable);


	function getRandomColorHex(): string {
		const random = Math.floor(Math.random() * 16777215).toString(16);
		return "#" + random.padStart(6, '0');
	}

	async function getScopes(): Promise<string[]> {
		// read resources/scopes.txt and each line will be a value of the array
		const scopesUri = vscode.Uri.joinPath(context.extensionUri, 'resources', 'scopes.txt');
		const fileContent = await vscode.workspace.fs.readFile(scopesUri);
		const lines = fileContent.toString().split('\n').map(line => line.replace('\r', ''));
		return lines;
	}
	
	async function generateSettingsToken(): Promise<string> {
		const args: string[] = await getScopes();
		let str = "{\n   \"editor.tokenColorCustomizations\": { \n";
		str += "\"textMateRules\": \["; 
		const fontStyles = ["italic", "bold", "underline"];
		for (let i = 1; i < args.length; i++) {
			// const randomFontStyles = fontStyles.filter(() => Math.random() < 0.2);
			// // Join the subset into a string
			// const fontStyleString = cj.stringify(randomFontStyles);
			// console.log(fontStyleString);
			str+= `{
                "scope": [
                    "`+args[i]+`",
                ],
                "settings": {
                    "foreground": "`+getRandomColorHex()+`",
                }
            },`;
		}
		str += "\n    ]}\n}";
		return str;
	}

	function generateSettingsWorkbench(): string {
		const args: string[] = ["contrastActiveBorder", "contrastBorder", "focusBorder", "foreground", "widget.shadow", "selection.background", "descriptionForeground", "errorForeground", "textBlockQuote.background", "textBlockQuote.border", "textCodeBlock.background", "textLink.activeForeground", "textLink.foreground", "textPreformat.foreground", "textSeparator.foreground", "button.background", "button.foreground", "button.hoverBackground", "dropdown.background", "dropdown.listBackground", "dropdown.border", "dropdown.foreground", "input.background", "input.border", "input.foreground", "input.placeholderForeground", "inputOption.activeBorder", "inputValidation.errorBackground", "inputValidation.errorBorder", "inputValidation.infoBackground", "inputValidation.infoBorder", "inputValidation.warningBackground", "inputValidation.warningBorder", "scrollbar.shadow", "scrollbarSlider.activeBackground", "scrollbarSlider.background", "scrollbarSlider.hoverBackground", "badge.foreground", "badge.background", "progressBar.background", "list.activeSelectionBackground", "list.activeSelectionForeground", "list.dropBackground", "list.focusBackground", "list.focusForeground", "list.highlightForeground", "list.hoverBackground", "list.hoverForeground", "list.inactiveSelectionBackground", "list.inactiveSelectionForeground", "list.inactiveFocusBackground", "list.invalidItemForeground", "activityBar.background", "activityBar.dropBackground", "activityBar.foreground", "activityBar.border", "activityBarBadge.background", "activityBarBadge.foreground", "sideBar.background", "sideBar.foreground", "sideBar.border", "sideBar.dropBackground", "sideBarTitle.foreground", "sideBarSectionHeader.background", "sideBarSectionHeader.foreground", "editorGroup.background", "editorGroup.border", "editorGroup.dropBackground", "editorGroupHeader.noTabsBackground", "editorGroupHeader.tabsBackground", "editorGroupHeader.tabsBorder", "tab.activeBackground", "tab.activeForeground", "tab.border", "tab.activeBorder", "tab.unfocusedActiveBorder", "tab.inactiveBackground", "tab.inactiveForeground", "tab.unfocusedActiveForeground", "tab.unfocusedInactiveForeground", "tab.hoverBackground", "tab.unfocusedHoverBackground", "tab.hoverBorder", "tab.unfocusedHoverBorder", "editor.background", "editor.foreground", "editorLineNumber.foreground", "editorLineNumber.activeForeground", "editorCursor.background", "editorCursor.foreground", "editor.selectionBackground", "editor.selectionForeground", "editor.inactiveSelectionBackground", "editor.selectionHighlightBackground", "editor.selectionHighlightBorder", "editor.wordHighlightBackground", "editor.wordHighlightBorder", "editor.worldHighlightStrongBackground", "editor.wordHighlightStrongBorder", "editor.findMatchBackground", "editor.findMatchHighlightBackground", "editor.findRangeHighlightBackground", "editor.findMatchBorder", "editor.findMatchHighlightBorder", "editor.hoverHighlightBackground", "editor.lineHighlightBackground", "editor.lineHighlightBorder", "editorLink.activeForeground", "editor.rangeHighlightBackground", "editor.rangeHighlightBorder", "editorWhitespace.foreground", "editorIndentGuide.background", "editorRuler.foreground", "editorCodeLens.foreground", "editorBracketMatch.background", "editorBracketMatch.border", "editorOverviewRuler.border", "editorOverviewRuler.findMatchForeground", "editorOverviewRuler.rangeHighlightForeground", "editorOverviewRuler.selectionHighlightForeground", "editorOverviewRuler.wordHighlightForeground", "editorOverviewRuler.wordHighlightStrongForeground", "editorOverviewRuler.modifiedForeground", "editorOverviewRuler.addedForeground", "editorOverviewRuler.deletedForeground", "editorOverviewRuler.errorForeground", "editorOverviewRuler.warningForeground", "editorOverviewRuler.infoForeground", "editorError.foreground", "editorError.border", "editorWarning.foreground", "editorWarning.border", "editorInfo.foreground", "editorInfo.border", "editorHint.foreground", "editorHint.border", "editorGutter.background", "editorGutter.modifiedBackground", "editorGutter.addedBackground", "editorGutter.deletedBackground", "diffEditor.insertedTextBackground", "diffEditor.insertedTextBorder", "diffEditor.removedTextBackground", "diffEditor.removedTextBorder", "editorWidget.background", "editorWidget.border", "editorSuggestWidget.background", "editorSuggestWidget.border", "editorSuggestWidget.foreground", "editorSuggestWidget.highlightForeground", "editorSuggestWidget.selectedBackground", "editorHoverWidget.background", "editorHoverWidget.border", "debugExceptionWidget.background", "debugExceptionWidget.border", "editorMarkerNavigation.background", "editorMarkerNavigationError.background", "editorMarkerNavigationWarning.background", "editorMarkerNavigationInfo.background", "peekView.border", "peekViewEditor.background", "peekViewEditorGutter.background", "peekViewEditor.matchHighlightBackground", "peekViewResult.background", "peekViewResult.fileForeground", "peekViewResult.lineForeground", "peekViewResult.matchHighlightBackground", "peekViewResult.selectionBackground", "peekViewResult.selectionForeground", "peekViewTitle.background", "peekViewTitleDescription.foreground", "peekViewTitleLabel.foreground", "merge.currentHeaderBackground", "merge.currentContentBackground", "merge.incomingHeaderBackground", "merge.incomingContentBackground", "merge.border", "merge.commonContentBackground", "merge.commonHeaderBackground", "editorOverviewRuler.currentContentForeground", "editorOverviewRuler.currentContentForeground", "editorOverviewRuler.commonContentForeground", "panel.background", "panel.border", "panel.dropBackground", "panelTitle.activeBorder", "panelTitle.activeForeground", "panelTitle.inactiveForeground", "statusBar.background", "statusBar.foreground", "statusBar.border", "statusBar.debuggingBackground", "statusBar.debuggingForeground", "statusBar.debuggingBorder", "statusBar.noFolderForeground", "statusBar.noFolderBackground", "statusBar.noFolderBorder", "statusBarItem.activeBackground", "statusBarItem.hoverBackground", "statusBarItem.prominentBackground", "statusBarItem.prominentHoverBackground", "titleBar.activeBackground", "titleBar.activeForeground", "titleBar.inactiveBackground", "titleBar.inactiveForeground", "titleBar.border", "notificationCenter.border", "notificationCenterHeader.foreground", "notificationCenterHeader.background", "notificationToast.border", "notifications.foreground", "notifications.background", "notifications.border", "notificationLink.foreground", "extensionButton.prominentForeground", "extensionButton.prominentBackground", "extensionButton.prominentHoverBackground", "pickerGroup.border", "pickerGroup.foreground", "terminal.background", "terminal.foreground", "terminal.ansiBlack", "terminal.ansiBlue", "terminal.ansiBrightBlack", "terminal.ansiBrightBlue", "terminal.ansiBrightCyan", "terminal.ansiBrightGreen", "terminal.ansiBrightMagenta", "terminal.ansiBrightRed", "terminal.ansiBrightWhite", "terminal.ansiBrightYellow", "terminal.ansiCyan", "terminal.ansiGreen", "terminal.ansiMagenta", "terminal.ansiRed", "terminal.ansiWhite", "terminal.ansiYellow", "terminal.selectionBackground", "terminalCursor.background", "terminalCursor.foreground", "debugToolBar.background", "welcomePage.buttonBackground", "welcomePage.buttonHoverBackground", "walkThrough.embeddedEditorBackground", "gitDecoration.modifiedResourceForeground", "gitDecoration.deletedResourceForeground", "gitDecoration.untrackedResourceForeground", "gitDecoration.ignoredResourceForeground", "gitDecoration.conflictingResourceForeground"];
		let str = "{\n   \"workbench.colorCustomizations\": {"; 
	
		for (let i = 0; i < args.length; i++) {
			str += "\n        \"";
			str += args[i];
			str += "\": \"";
			const randomColor = getRandomColorHex();
			str += randomColor;
			str += "\"";
			if (i !== args.length - 1) {
				str += ",";
			}
		}
		str += "\n    }\n}";
		return str;
	}

	async function checkAndCreateVsCodeFolder(vscodeFolderPath:string){
		try {
			const exists = await vscode.workspace.fs.stat(vscode.Uri.file(vscodeFolderPath));
		} catch (error) {
			vscode.workspace.fs.createDirectory(vscode.Uri.file(vscodeFolderPath));
		}
	}

	async function createSettingsJson(workspacePath:string){
		const newFilePath = vscode.Uri.file(`${workspacePath}/.vscode/settings.json`);
		const data = new TextEncoder().encode("{\n}");
		await vscode.workspace.fs.writeFile(newFilePath, data);
	}

	async function makeSureSettingsExists(){
		const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!workspacePath) {
			vscode.window.showErrorMessage('No workspace found!');
			return null;
		}
		const vscodeFolderPath = `${workspacePath}/.vscode`;

		await checkAndCreateVsCodeFolder(vscodeFolderPath);

		const settingsFilePath = `${vscodeFolderPath}/settings.json`;

		try {
			const settingsFileExists = await vscode.workspace.fs.stat(vscode.Uri.file(settingsFilePath));
			vscode.window.showInformationMessage('settings.json already exists!');
		} catch (error) {
			await createSettingsJson(workspacePath);
		}
		return settingsFilePath;
	}

	async function generateTheme(text:boolean,background:boolean,deleteText:boolean,deleteBackground:boolean){
		const settingsFilePath:string|null = await makeSureSettingsExists();
		
		if(settingsFilePath===null){
			return;
		}

		const fileContent = await vscode.workspace.fs.readFile(vscode.Uri.file(settingsFilePath));
		const settings = cj.parse(fileContent.toString());
		
		if(settings===null){
			return;
		}

		
		if(text){
			const settingsStr = await generateSettingsToken();
			const new_settings = cj.parse(settingsStr);
			(settings as { [key: string]: any })["editor.tokenColorCustomizations"] = (new_settings as { [key: string]: any })["editor.tokenColorCustomizations"];
		}
		if(background){
			const settings_workbench = cj.parse(generateSettingsWorkbench());
			(settings as { [key: string]: any })["workbench.colorCustomizations"] = (settings_workbench as { [key: string]: any })["workbench.colorCustomizations"];
		}
		if(deleteBackground){
			delete (settings as { [key: string]: any })["workbench.colorCustomizations"];
		}
		if(deleteText){
			delete (settings as { [key: string]: any })["editor.tokenColorCustomizations"];
		}

		const updatedContent:string = cj.stringify(settings, null, 2);
		const data:Uint8Array = new TextEncoder().encode(updatedContent);
		await vscode.workspace.fs.writeFile(vscode.Uri.file(settingsFilePath), data);
	}

	let newDisposable = vscode.commands.registerCommand('theme-generator.randomizeAllColors', async () => {
		generateTheme(true,true,false,false);
	});
	context.subscriptions.push(newDisposable);

	let newDisposable2 = vscode.commands.registerCommand('theme-generator.randomizeText', async () => {
		generateTheme(true,false,false,false);
	});
	context.subscriptions.push(newDisposable2);
	let newDisposable3 = vscode.commands.registerCommand('theme-generator.randomizeBackground', async () => {
		generateTheme(false,true,false,false);
	});
	context.subscriptions.push(newDisposable3);
	let newDisposable4 = vscode.commands.registerCommand('theme-generator.resetAllColors', async () => {
		generateTheme(false,false,true,true);

	});
	context.subscriptions.push(newDisposable4);
	let newDisposable5 = vscode.commands.registerCommand('theme-generator.resetText', async () => {
		generateTheme(false,false,true,false);
	});
	context.subscriptions.push(newDisposable5);
	let newDisposable6 = vscode.commands.registerCommand('theme-generator.resetBackground', async () => {
		generateTheme(false,false,false,true);
	});
	context.subscriptions.push(newDisposable6);


}

// This method is called when your extension is deactivated
export function deactivate() {}
