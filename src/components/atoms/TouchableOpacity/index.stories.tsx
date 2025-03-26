import { Meta, StoryObj } from '@storybook/react';

import { TouchableOpacity as Component } from 'src/components/atoms/TouchableOpacity';
import { decorators } from 'src/components/providers/StorybookProvider';

type ComponentType = typeof Component;

const meta: Meta<ComponentType> = {
  title: 'Atoms/TouchableOpacity',
  component: Component,
  decorators,
};

export default meta;

export const TouchableOpacity: StoryObj<ComponentType> = {
  args: {
    onClick: () => console.log(),
    disabled: false,
  },
};
