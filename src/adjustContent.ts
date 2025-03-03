import * as vscode from "vscode";
export function adjustContent(content: string) {
  const config = vscode.workspace.getConfiguration("create-react-files");
  const shouldUseSingleQuote = config.get<boolean>("singleQuote", true);
  const shouldAddSemi = config.get<boolean>("semi", true);
  if (!shouldAddSemi) {
    content = content.replaceAll(";", "");
  }
  if (shouldUseSingleQuote) {
    content = content.replaceAll('"', "'");
  }
  return content;
}
