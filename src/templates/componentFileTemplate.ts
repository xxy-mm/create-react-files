import * as vscode from "vscode";
export function createComponent(componentName: string): string {
  const config = vscode.workspace.getConfiguration("create-react-files");
  const shouldImportReact = config.get<boolean>("importReact", true);
  const shouldGenerateCss = config.get<boolean>("createCssFile", true);
  const cssFiletype = config.get<string>("cssFileFormat", "css");

  const isCssModule = cssFiletype.startsWith("module");
  let cssImportStat = "";
  if (isCssModule) {
    cssImportStat = `import styles from "./${componentName}.${cssFiletype}";`;
  } else {
    cssImportStat = `import "./${componentName}.${cssFiletype}";`;
  }
  const shouldAddClassName = shouldGenerateCss && isCssModule;
  return `
${shouldImportReact ? `import React from "react";` : ""}
${shouldGenerateCss ? cssImportStat : ""}

type ${componentName}Props = {
    
}

export const ${componentName} = (props: ${componentName}Props) => {
  return <div${
    shouldAddClassName ? ` className={styles.${componentName}}` : ""
  }>${componentName} Component</div>;
};`.trimStart();
}
