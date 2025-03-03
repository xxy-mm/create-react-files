export function createStorybook(componentName: string): string {
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
