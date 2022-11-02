import React from 'react';
import { DefaultProps, Group, Tooltip } from '@mantine/core';
import { ColorSchemeControl } from '../ColorSchemeControl';
import { GithubControl } from './GithubControl';
import { SearchControl } from '../SearchControl';

interface HeaderControlsProps extends DefaultProps {
  onSearch(): void;
  githubLink: string;
}

export function HeaderControls({ onSearch, githubLink, ...others }: HeaderControlsProps) {
  return (
    <Tooltip.Group openDelay={600} closeDelay={100}>
      <Group spacing="xs" {...others}>
        <SearchControl onClick={onSearch} />
        <GithubControl link={githubLink} />
        <ColorSchemeControl />
      </Group>
    </Tooltip.Group>
  );
}
