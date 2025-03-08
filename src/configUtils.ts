import * as vscode from "vscode";

function getConfig() {
  return vscode.workspace.getConfiguration("create-react-files");
}
export function getReactConfig() {
  const importReactContent = `import React from "react";`;
  const config = getConfig();
  const shouldImportReact = config.get<boolean>("importReact", true);
  return { shouldImportReact, content: importReactContent };
}

export function getCssConfig(componentName: string) {
  const config = getConfig();
  const shouldGenerateCss = config.get<boolean>("createCssFile", true);
  const cssFiletype = config.get<string>("cssFileFormat", "css");
  const isCssModule = cssFiletype.startsWith("module");
  let cssImportStat = "";
  if (isCssModule) {
    cssImportStat = `import styles from "./${componentName}.${cssFiletype}";`;
  } else {
    cssImportStat = `import "./${componentName}.${cssFiletype}";`;
  }
  return {
    shouldGenerateCss,
    isCssModule,
    content: cssImportStat,
  };
}

export function getStoryBookConfig() {
  const config = getConfig();
  const storyBookConfig = config.get<"storybook" | "ladle">(
    "storybookFramework",
    "storybook"
  );

  return storyBookConfig;
}
