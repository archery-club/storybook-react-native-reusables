import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Text } from '../../components/ui/text';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View className="p-4 w-full max-w-md">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Yes. It adheres to the WAI-ARIA design pattern.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text>Is it styled?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Yes. It comes with default styles that matches the other components' aesthetic.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text>Is it animated?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Yes. It's animated by default, but you can disable it if you prefer.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Can I open multiple items?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Yes! This accordion allows multiple items to be open at the same time.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text>How does it work?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Set the type prop to "multiple" to enable this behavior.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text>Is it customizable?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Absolutely! You can customize the styling using NativeWind classes.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Single accordion item</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            This is a single accordion item. Perfect for FAQ sections or simple expandable content.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>What about longer content?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{"\n\n"}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{"\n\n"}
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};