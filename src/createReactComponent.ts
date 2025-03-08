import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createComponent } from "./templates/componentFileTemplate";
import { createTest } from "./templates/testFileTemplate";
import { createStoryBook } from "./templates/storybookFileTemplate";
import { createIndex } from "./templates/indexFileTemplate";
import { createCssFile } from "./templates/cssFileTemplate";
import { adjustContent } from "./adjustContent";

export async function createReactComponent(uri: vscode.Uri) {
  // Get component name from user
  const componentName = await vscode.window.showInputBox({
    prompt: "Enter component name",
    validateInput: (value) => {
      if (!value) {
        return "Component name is required";
      }
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return "Component name must start with uppercase and contain only letters and numbers";
      }
      return null;
    },
  });

  if (!componentName) {
    return;
  }
  let targetUri: vscode.Uri;
  if (!uri) {
    const folderResult = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      title: "Select folder for new React component",
    });

    if (!folderResult || folderResult.length === 0) {
      vscode.window.showErrorMessage("No folder selected");
      return;
    }

    targetUri = folderResult[0];
  } else {
    // Command was triggered from context menu
    targetUri = uri;
  }

  // Create component directory
  const componentDir = path.join(targetUri.fsPath, componentName);
  fs.mkdirSync(componentDir);

  // Configurations
  const config = vscode.workspace.getConfiguration("create-react-files");

  const shouldGenerateCss = config.get<boolean>("createCssFile", true);
  const shouldGenerateTest = config.get<boolean>("createTestFile", true);
  const shouldGenerateStorybook = config.get<boolean>(
    "createStorybookFile",
    true
  );
  const cssFiletype = config.get<string>("cssFileFormat", "css");

  fs.writeFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    adjustContent(createComponent(componentName))
  );
  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    adjustContent(createIndex(componentName))
  );
  if (shouldGenerateCss) {
    fs.writeFileSync(
      path.join(componentDir, `${componentName}.${cssFiletype}`),
      createCssFile(componentName)
    );
  }
  if (shouldGenerateTest) {
    fs.writeFileSync(
      path.join(componentDir, `${componentName}.test.tsx`),
      adjustContent(createTest(componentName))
    );
  }
  if (shouldGenerateStorybook) {
    fs.writeFileSync(
      path.join(componentDir, `${componentName}.stories.tsx`),
      adjustContent(createStoryBook(componentName))
    );
  }

  vscode.window.showInformationMessage(
    `React component ${componentName} created successfully!`
  );
}
