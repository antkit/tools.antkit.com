import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IconLetterCase, IconBinary } from '@tabler/icons';
import { Button, Textarea, Stack, Center, Group, Container } from '@mantine/core';

const URLEncoderPage: NextPage = () => {
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
    try {
      const encoded = encodeURIComponent(inputContent);
      setOutputContent(encoded);
    } catch (e) {
      console.log('encodeURIComponent error:', e);
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(inputContent);
      setOutputContent(decoded);
    } catch (e) {
      console.log('decodeURIComponent error:', e);
    }
  };

  return (
    <>
      <Head>
        <title>URL Encoder - AK Tools</title>
      </Head>

      <Container size={'xl'}>
        <Stack>
          <Center>
            <h1>URL Encode and Decode</h1>
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

export default URLEncoderPage;
