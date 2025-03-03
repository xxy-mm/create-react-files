export function createIndex(componentName: string) {
  return `export * from "./${componentName}";`;
}
