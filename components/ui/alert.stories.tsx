import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Terminal } from '../../lib/icons/Terminal';
import { AlertTriangle } from '../../lib/icons/AlertTriangle';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a callout for user attention.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
      description: 'The visual style variant of the alert',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Terminal,
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can use a terminal to run commands on your computer.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    icon: AlertTriangle,
    variant: 'destructive',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Danger!</AlertTitle>
      <AlertDescription>
        High voltage. Do not touch. Risk of electric shock. Keep away from children.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This is an alert without an icon.
      </AlertDescription>
    </Alert>
  ),
};

export const CustomContent: Story = {
  args: {
    icon: Terminal,
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>System Update Available</AlertTitle>
      <AlertDescription>
        A new system update is available. Please restart your device to install the latest security patches and improvements.
      </AlertDescription>
    </Alert>
  ),
};