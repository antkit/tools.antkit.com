import {
  ActionIcon,
  Card,
  Center,
  Checkbox,
  Container,
  CopyButton,
  Group,
  NumberInput,
  Progress,
  Radio,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconCopy, IconRefresh } from '@tabler/icons';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '1234567890';
const SYMBOLS = "$&+,:;=?@#|'<>.^*()%!-"; // '~!@#$%^&*';

const requirements = [
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

const randomString = (len: number, sources: string[]) => {
  let str = '';
  for (let i = 0; i < len; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    str += source[Math.floor(Math.random() * source.length)];
  }
  return str;
};

export default function Password() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [passwordStrength, setPasswordStrength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const calculatePasswordStrength = (pwd: string) => {
    // TODO 完善强度计算规则
    return Math.min(pwd.length * 10, 100);
    // let multiplier = pwd.length > 7 ? 0 : 1;

    // requirements.forEach((requirement) => {
    //   if (!requirement.re.test(pwd)) {
    //     multiplier += 1;
    //   }
    // });

    // return Math.max(100 - (100 / (pwd.length + 1)) * multiplier, 10);
  };

  const refreshPassword = () => {
    let strs: string[] = [];
    if (uppercase) {
      strs = strs.concat(UPPERCASE_CHARACTERS);
    }
    if (lowercase) {
      strs = strs.concat(LOWERCASE_CHARACTERS);
    }
    if (numbers) {
      strs = strs.concat(NUMBERS);
    }
    if (symbols) {
      strs = strs.concat(SYMBOLS);
    }
    if (strs.length === 0) {
      strs = [UPPERCASE_CHARACTERS, LOWERCASE_CHARACTERS, NUMBERS, SYMBOLS];
    }
    const pwd = randomString(passwordLength, strs);
    setPassword(pwd);
    setPasswordStrength(calculatePasswordStrength(pwd));
  };

  useEffect(() => {
    refreshPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLength, uppercase, lowercase, numbers, symbols]);

  return (
    <>
      <Head>
        <title>Password generator - AK Tools</title>
      </Head>

      <Container size={'xl'}>
        <Center>
          <Text>
            <h1>Password generate</h1>
          </Text>
        </Center>
        <Card shadow="sm">
          <Card.Section>
            <Group
              noWrap
              sx={(theme) => ({
                border: theme.colorScheme === 'dark' ? '1px solid #444' : '1px solid #ccc',
                borderRadius: '5px',
              })}
              position="apart"
              p={15}
            >
              <Text
                size="xl"
                sx={(theme) => ({
                  fontFamily: theme.fontFamilyMonospace,
                })}
              >
                {password}
              </Text>
              <Group noWrap spacing={0}>
                <CopyButton value={password} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? 'Copied' : 'Copy'}
                      withArrow
                      color="blue"
                      position="top"
                    >
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={24} /> : <IconCopy size={24} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                <Tooltip label="Refresh" withArrow color="blue" position="top">
                  <ActionIcon onClick={refreshPassword}>
                    <IconRefresh size={24} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            <Progress
              value={passwordStrength}
              color={passwordStrength >= 100 ? 'teal' : passwordStrength > 50 ? 'yellow' : 'red'}
            />
          </Card.Section>

          <Stack>
            <Center>
              <Text weight={500} size="xl" mt="md">
                Customize your password
              </Text>
            </Center>
            <SimpleGrid cols={2}>
              <Stack>
                <NumberInput
                  min={1}
                  max={50}
                  value={passwordLength}
                  onChange={(event) => setPasswordLength(event || 1)}
                  size="sm"
                  label="Password Length"
                />
                <Slider
                  mt={10}
                  min={1}
                  max={50}
                  sx={{ width: '100%' }}
                  value={passwordLength}
                  onChange={setPasswordLength}
                  marks={[
                    { value: 1, label: '1' },
                    { value: 12, label: '12' },
                    { value: 24, label: '24' },
                    { value: 36, label: '36' },
                    { value: 50, label: '50' },
                  ]}
                />
              </Stack>
              <Group ml={10}>
                <Stack>
                  <Radio.Group
                    orientation="vertical"
                    name="passwordTemplate"
                    label="Password template"
                  >
                    <Radio value="say" label="Easy to say" />
                    <Radio value="read" label="Easy to read" />
                    <Radio value="all" label="All characters" />
                  </Radio.Group>
                </Stack>
                <Stack>
                  <Checkbox
                    checked={uppercase}
                    label="Include uppercase letters"
                    onChange={(event) => {
                      if (lowercase || numbers || symbols) {
                        setUppercase(event.currentTarget.checked);
                      } else {
                        refreshPassword();
                      }
                    }}
                  />
                  <Checkbox
                    checked={lowercase}
                    label="Include lowercase letters"
                    onChange={(event) => {
                      if (uppercase || numbers || symbols) {
                        setLowercase(event.currentTarget.checked);
                      } else {
                        refreshPassword();
                      }
                    }}
                  />
                  <Checkbox
                    checked={numbers}
                    label="Include numbers"
                    onChange={(event) => {
                      if (uppercase || lowercase || symbols) {
                        setNumbers(event.currentTarget.checked);
                      } else {
                        refreshPassword();
                      }
                    }}
                  />
                  <Checkbox
                    checked={symbols}
                    label="Include symbols"
                    onChange={(event) => {
                      if (uppercase || lowercase || numbers) {
                        setSymbols(event.currentTarget.checked);
                      } else {
                        refreshPassword();
                      }
                    }}
                  />
                </Stack>
              </Group>
            </SimpleGrid>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
