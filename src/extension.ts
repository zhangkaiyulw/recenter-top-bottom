import { commands, ExtensionContext, TextEditor, TextEditorEdit } from 'vscode';

enum PositionState {
	Top,
	Center,
	Bottom
}

let nextPosition = PositionState.Center;

let resetClearable: NodeJS.Timeout | undefined;

function rescheduleResetNextPosition() {
	if (resetClearable) clearTimeout(resetClearable);
	resetClearable = setTimeout(() => {
		nextPosition = PositionState.Center;
	}, 1400);
}

export function activate(context: ExtensionContext) {

	let disposable = commands.registerTextEditorCommand(
		'recenterTopBottom',
		(editor: TextEditor, edit: TextEditorEdit) => {
			switch (nextPosition) {
				case PositionState.Top: {
					const topMostLine = Math.min(...editor.selections.map((sel) => {
						return sel.start.line;
					}));
					commands.executeCommand("revealLine", {
						lineNumber: topMostLine,
						at: "top"
					});
					nextPosition = PositionState.Bottom;
					rescheduleResetNextPosition();
					break;
				}
				case PositionState.Center: {
					const topMostLine = Math.min(...editor.selections.map((sel) => {
						return sel.start.line;
					}));
					const bottomMostLine = Math.max(...editor.selections.map((sel) => {
						return sel.end.line;
					}));
					const centerLine = Math.floor((topMostLine + bottomMostLine) / 2);
					commands.executeCommand("revealLine", {
						lineNumber: centerLine,
						at: "center"
					});
					nextPosition = PositionState.Top;
					rescheduleResetNextPosition();
					break;
				}
				case PositionState.Bottom: {
					const bottomMostLine = Math.max(...editor.selections.map((sel) => {
						return sel.end.line;
					}));
					commands.executeCommand("revealLine", {
						lineNumber: bottomMostLine,
						at: "bottom"
					});
					nextPosition = PositionState.Center;
					rescheduleResetNextPosition();
					break;
				}
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
