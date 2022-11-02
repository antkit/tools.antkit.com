import { useState } from 'react';
import Head from 'next/head';
import { IconSearch } from '@tabler/icons';
import {
  Anchor,
  AppShell,
  Box,
  Center,
  createStyles,
  Group,
  Header,
  Navbar,
  ScrollArea,
} from '@mantine/core';
import { SpotlightAction, SpotlightProvider, openSpotlight } from '@mantine/spotlight';
import { ColorSchemeControl, HeaderControls } from '../HeaderControl';
import { AntkitLogo } from '../AntkitLogo';
import { LinksGroup } from '../NavbarLinksGroup';
import { sampleMenuData } from '../../utils/category-data';

interface ToolsLayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withNavbar?: boolean;
  data: SpotlightAction[];
}

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function ToolsLayout({ children, data }: ToolsLayoutProps) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(true);

  const links = sampleMenuData.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <SpotlightProvider
      actions={data || []}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search tools"
      shortcut={['mod + K', 'mod + P', '/']}
      highlightQuery
      transition={{
        in: { transform: 'translateY(0)', opacity: 1 },
        out: { transform: 'translateY(-20px)', opacity: 0 },
        transitionProperty: 'transform, opacity',
      }}
    >
      <AppShell
        header={
          <Header height={70} p="md">
            <Group noWrap sx={{ justifyContent: 'space-between' }}>
              <Anchor href="/" sx={{ paddingTop: 3 }}>
                <AntkitLogo variant="tools.antkit.com" size={32} />
              </Anchor>
              <HeaderControls
                sx={(theme) => ({
                  [theme.fn.smallerThan('sm')]: { display: 'none' },
                })}
                onSearch={openSpotlight}
                githubLink="https://github.com/antkit/tools.antkit.com"
              />
              <Center
                sx={(theme) => ({
                  [theme.fn.largerThan('sm')]: { display: 'none' },
                })}
              >
                <ColorSchemeControl />
              </Center>
            </Group>
          </Header>
        }
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
            withBorder={false}
          >
            <Navbar.Section grow className={classes.links} component={ScrollArea}>
              <Box className={classes.linksInner}>{links}</Box>
            </Navbar.Section>
          </Navbar>
        }
      >
        <Head>
          <meta name="description" content="AK tools, engineer tools, encode and decode" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        {children}
      </AppShell>
    </SpotlightProvider>
  );
}
