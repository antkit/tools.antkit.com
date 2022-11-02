import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { IconLetterCase, IconBinary } from '@tabler/icons';
import { Button, Textarea, Stack, Center, Group, Container } from '@mantine/core';

const Base64Page: NextPage = () => {
  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');

  useEffect(() => {
    setOutputContent('');
  }, [inputContent]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputContent(value);
  };

  const handleEncode = () => {
    const buffer = Buffer.from(inputContent);
    setOutputContent(buffer.toString('base64'));
  };

  const handleDecode = () => {
    const decoded = Buffer.from(inputContent, 'base64');
    setOutputContent(decoded.toString());
  };

  return (
    <>
      <Head>
        <title>Base64 - AK Tools</title>
      </Head>

      <Container size={'xl'}>
        <Stack>
          <Center>
            <h1>Base64 Encode and Decode</h1>
          </Center>

          <Textarea
            placeholder="Input Content"
            minRows={5}
            defaultValue={inputContent}
            onChange={handleChangeInput}
          />

          <Group noWrap position="center" spacing="md">
            <Button
              leftIcon={<IconBinary color="#00b341" />}
              variant="outline"
              onClick={handleEncode}
            >
              Encode
            </Button>
            <Button
              leftIcon={<IconLetterCase color="#00b341" />}
              variant="outline"
              onClick={handleDecode}
            >
              Decode
            </Button>
          </Group>

          <Textarea placeholder="Output Content" minRows={5} defaultValue={outputContent} disabled />
        </Stack>
      </Container>
    </>
  );
};

export default Base64Page;
