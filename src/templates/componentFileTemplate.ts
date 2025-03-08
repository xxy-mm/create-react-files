import { getCssConfig, getReactConfig } from "../configUtils";
export function createComponent(componentName: string): string {
  const { shouldImportReact, content: importReactContent } = getReactConfig();
  const {
    shouldGenerateCss,
    content: cssContent,
    isCssModule,
  } = getCssConfig(componentName);
  const shouldAddClassName = shouldGenerateCss && isCssModule;
  return `
${shouldImportReact ? importReactContent : ""}
${shouldGenerateCss ? cssContent : ""}

type ${componentName}Props = {
    
}

export const ${componentName} = (props: ${componentName}Props) => {
  return <div${
    shouldAddClassName ? ` className={styles.${componentName}}` : ""
  }>${componentName} Component</div>;
};`.trimStart();
}
