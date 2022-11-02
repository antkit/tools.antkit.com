import { MantineColor, useMantineTheme } from '@mantine/core';

export type AntkitLogoVariant = 'antkit.com' | 'tools.antkit.com';

export interface LogoProps extends React.ComponentPropsWithoutRef<'svg'> {
  color?: MantineColor;
  variant?: AntkitLogoVariant;
  size?: number;
  inverted?: boolean;
}

export function useAntkitLogoColors(
  color: MantineColor | undefined,
  variant: AntkitLogoVariant = 'antkit.com',
  inverted: boolean = false
) {
  const theme = useMantineTheme();

  if (variant === 'antkit.com') {
    return {
      background: inverted ? theme.white : theme.fn.themeColor(color || theme.primaryColor, 5),
      color: inverted ? theme.fn.themeColor(color || theme.primaryColor, 5) : theme.white,
    };
  }

  return {
    background: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.cyan[6],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
  };
}
