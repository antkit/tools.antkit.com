import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 120,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

export type GridItem = {
  label: string;
  description?: string;
  icon: TablerIcon;
  color: string;
  link?: string;
};

type ActionsGridProps = {
  label: string;
  items: GridItem[];
  moreText?: string;
  moreHref?: string;
};

export function ToolsActionGrid({ label, items, moreText, moreHref }: ActionsGridProps) {
  const { classes, theme } = useStyles();

  const gridItems = items.map((item) => (
    <UnstyledButton key={item.label} className={classes.item} component="a" href={item.link}>
      <item.icon color={theme.colors[item.color][6]} size={48} />
      <Text size="xs" mt={15}>
        {item.label}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>{label}</Text>
        <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }} href={moreHref}>
          {moreText}
        </Anchor>
      </Group>
      <SimpleGrid
        cols={8}
        mt="md"
        breakpoints={[
          { maxWidth: 1200, cols: 6, spacing: 'md' },
          { maxWidth: 1000, cols: 4, spacing: 'sm' },
          { maxWidth: 800, cols: 3, spacing: 'sm' },
          { maxWidth: 600, cols: 2, spacing: 'sm' },
          { maxWidth: 400, cols: 1, spacing: 'sm' },
        ]}
      >
        {gridItems}
      </SimpleGrid>
    </Card>
  );
}
