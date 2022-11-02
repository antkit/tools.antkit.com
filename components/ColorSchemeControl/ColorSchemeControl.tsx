import React from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';
import { HeaderControl } from '../HeaderControl/HeaderControl';

const ICON_SIZE = 22;
const STROKE_WIDTH = 1.5;

export function ColorSchemeControl() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <HeaderControl
      onClick={() => toggleColorScheme()}
      tooltip={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      {colorScheme === 'dark' ? (
        <IconSun size={ICON_SIZE} stroke={STROKE_WIDTH} />
      ) : (
        <IconMoon size={ICON_SIZE} stroke={STROKE_WIDTH} />
      )}
    </HeaderControl>
  );
}
