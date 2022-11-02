import type { NextPage } from 'next';
import Head from 'next/head';
import 'dayjs/locale/zh-cn';
import { IconArrowsRightLeft, IconCalendarTime, IconLetterU } from '@tabler/icons';
import { Stack, Center, Group, NumberInput, Container, Text, Button, useMantineColorScheme } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useState } from 'react';

// 实际上，这个值还可以更大
const MAX_TIMESTAMP_SECONDS = 3093527951999; // 99999-12-31 23:59:59

type TimeItem = {
  date: Date;
  timestamp: number;
  error?: boolean; // is timestamp invalid
};

const TimePage: NextPage = () => {
  const scheme = useMantineColorScheme();
  const defaultTime = new Date();
  const [items, setItems] = useState<TimeItem[]>([
    { date: defaultTime, timestamp: defaultTime.getTime() / 1000 },
  ]);

  const handleAddNew = () => {
    const now = new Date();
    const newItems = [...items, { date: now, timestamp: now.getTime() / 1000 }];
    setItems(newItems);
  };

  return (
    <>
      <Head>
        <title>Time convertion - AK Tools</title>
      </Head>

      <Container size={'xl'}>
        <Stack>
          <Center>
            <Text>
              <h1>Time convertion</h1>
            </Text>
          </Center>

          <Center>
            <Stack>
              {items.map((item, index) => {
                return (
                  <Group spacing="md" key={index}>
                    <DatePicker
                      icon={<IconCalendarTime color={scheme.colorScheme === 'dark' ? '#ffbf00' : '#009988'} />}
                      locale="zh-cn"
                      placeholder="Pick date"
                      clearable={false}
                      value={item.date}
                      onChange={(v: Date) => {
                        const oldValue = items[index];
                        let newDate = new Date();
                        newDate.setTime(v.getTime());
                        newDate.setHours(oldValue.date.getHours());
                        newDate.setMinutes(oldValue.date.getMinutes());
                        newDate.setSeconds(oldValue.date.getSeconds());
                        const newValue = {
                          date: newDate,
                          timestamp: newDate.getTime() / 1000,
                        };
                        let newItems = [...items];
                        newItems.splice(index, 1, newValue);
                        setItems(newItems);
                      }}
                    />
                    <TimeInput
                      withSeconds
                      ml={-10}
                      value={item.date}
                      onChange={(v: Date) => {
                        const oldValue = items[index];
                        let newDate = new Date();
                        newDate.setTime(v.getTime());
                        newDate.setFullYear(oldValue.date.getFullYear());
                        newDate.setMonth(oldValue.date.getMonth());
                        newDate.setDate(oldValue.date.getDate());
                        const newValue = {
                          date: newDate,
                          timestamp: newDate.getTime() / 1000,
                        };
                        let newItems = [...items];
                        newItems.splice(index, 1, newValue);
                        setItems(newItems);
                      }}
                    />
                    <IconArrowsRightLeft color="gray" />
                    <NumberInput
                      icon={<IconLetterU color={scheme.colorScheme === 'dark' ? '#ffbf00' : '#009988'} />}
                      value={item.timestamp}
                      placeholder="Unix timestamp"
                      error={item.error}
                      hideControls
                      onChange={(v: number) => {
                        const oldValue = items[index];
                        const error = v < 0 || v > MAX_TIMESTAMP_SECONDS;
                        let newDate = new Date();
                        newDate.setTime(v * 1000);
                        const newValue = {
                          date: error ? oldValue.date : newDate,
                          timestamp: error ? oldValue.timestamp : v,
                          error: error,
                        };
                        let newItems = [...items];
                        newItems.splice(index, 1, newValue);
                        setItems(newItems);
                      }}
                    />
                  </Group>
                );
              })}
              <Button onClick={handleAddNew}>+</Button>
            </Stack>
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default TimePage;
