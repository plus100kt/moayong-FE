
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TestButton, { type TestButtonProps } from './TestButton';

const meta: Meta<TestButtonProps> = {
  title: 'Components/TestButton',
  component: TestButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    label: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof TestButton>;

export default meta;
type Story = StoryObj<typeof TestButton>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button',
  },
};

export const CustomBackground: Story = {
  args: {
    label: 'Custom Background',
    backgroundColor: '#ff5733',
  },
};
