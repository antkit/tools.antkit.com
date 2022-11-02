import { Box, Collapse, Text, createStyles, Group, UnstyledButton, ThemeIcon } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  links?: { icon: TablerIcon; label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, links }: LinksGroupProps) {
  const route = useRouter();
  const { classes, } = useStyles();

  const hasLinks = Array.isArray(links);

  const items = (hasLinks ? links : []).map((link) => (
    <UnstyledButton onClick={() => {route.push(link.link)}} className={classes.control} key={link.label}>
      <Group position="apart" spacing={0}>
        <Box sx={{ display: 'flex', alignItems: 'center' }} ml={20}>
          <link.icon size={18} />
          <Box ml="xs">{link.label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }} className={classes.control}>
        <Box>{label}</Box>
      </Box>
      {hasLinks && <Collapse in>{items}</Collapse>}
    </>
  );
}
