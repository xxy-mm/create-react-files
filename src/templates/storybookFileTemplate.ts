import { getStoryBookConfig } from "../configUtils";

export function createStoryBook(componentName: string) {
  const storybookConfig = getStoryBookConfig();
  if (storybookConfig === "ladle") {
    return createLadleStory(componentName);
  } else {
    return createStorybookStory(componentName);
  }
}

function createStorybookStory(componentName: string): string {
  return `
import type { Meta, StoryObj } from "@storybook/react";

import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
  component: ${componentName},
  parameters: {
    layout: "centered",
  },
  args: {}
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Basic: Story = {args: {}};
`.trimStart();
}

function createLadleStory(componentName: string): string {
  return `
import type { Story } from "@ladle/react";
import { ${componentName} } from "./${componentName}";

export const normal: Story = () => {
  return <${componentName} />;
};`.trimStart();
}
