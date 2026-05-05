import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HourglassLoader } from './HourglassLoader';

const meta: Meta<typeof HourglassLoader> = {
  title: 'HourglassLoader',
  component: HourglassLoader,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 50, max: 400, step: 10 },
    },
    sandColor: { control: 'color' },
    glassColor: { control: 'color' },
    frameColor: { control: 'color' },
    speed: {
      control: { type: 'range', min: 0.1, max: 4, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HourglassLoader>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: { size: 80 },
};

export const Large: Story = {
  args: { size: 200 },
};

export const OrangeSand: Story = {
  args: { sandColor: '#e74c3c' },
};

export const GoldSand: Story = {
  args: { sandColor: '#f1c40f' },
};

export const GreenSand: Story = {
  args: { sandColor: '#2ecc71' },
};

export const PurpleSand: Story = {
  args: { sandColor: '#9b59b6' },
};

export const CyanSand: Story = {
  args: { sandColor: '#00bcd4' },
};

export const DarkFrame: Story = {
  args: { frameColor: '#1a1a2e', sandColor: '#e94560', glassColor: '#e0e0e0' },
};

export const GoldFrame: Story = {
  args: { frameColor: '#d4af37', sandColor: '#c0392b', glassColor: '#f5f5dc' },
};

export const HalfSpeed: Story = {
  args: { speed: 0.5 },
};

export const DoubleSpeed: Story = {
  args: { speed: 2 },
};

export const TripleSpeed: Story = {
  args: { speed: 3 },
};

export const Combined: Story = {
  args: { size: 160, sandColor: '#e74c3c', speed: 0.7 },
};
