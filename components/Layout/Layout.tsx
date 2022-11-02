import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/router';
import ToolsLayout from './ToolsLayout';
import { SpotlightAction } from '@mantine/spotlight';

interface LayoutProps {
  children: React.ReactNode;
  data: SpotlightAction[];
}

const THEME_KEY = 'mantine-color-scheme';

export function Layout({ children, data }: LayoutProps) {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
  ]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <ToolsLayout data={data}>{children}</ToolsLayout>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
