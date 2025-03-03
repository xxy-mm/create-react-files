import * as vscode from "vscode";
export function createTest(componentName: string) {
  const config = vscode.workspace.getConfiguration("create-react-files");
  const shouldImportReact = config.get<boolean>("importReact", true);
  const testType = config.get<string>("testFileFormat", "vitest");

  return `
${shouldImportReact ? `import React from "react";` : ""}
${testType === "vitest" ? 'import { expect, test } from "vitest"' : ""}
import { ${componentName} } from "./${componentName}";

${
  testType === "jest"
    ? `describe("<${componentName} />", () => {
  it("should render correctly", () => {
    expect(1).toBe(1)
  });
});`
    : `test("<${componentName} />", () => {
  expect(1).toBe(1)
});`
}`.trimStart();
}
