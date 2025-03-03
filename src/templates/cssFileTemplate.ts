export function createCssFile(componentName: string) {
  return `
.${componentName} {
    
}
`.trimStart();
}
