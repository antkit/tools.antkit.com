import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import CryptoJS from 'crypto-js';
import { IconBinary } from '@tabler/icons';
import { Button, Textarea, Stack, Center, Group, Container } from '@mantine/core';

const Md5Page: NextPage = () => {
  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');

  useEffect(() => {
    setOutputContent('');
  }, [inputContent]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputContent(value);
  };

  const handleEncrypt = () => {
    setOutputContent(CryptoJS.MD5(inputContent).toString());
  };

  return (
    <>
      <Head>
        <title>MD5 - AK Tools</title>
      </Head>

      <Container size={'xl'}>
        <Stack>
          <Center>
            <h1>MD5 Encrypt</h1>
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
              onClick={handleEncrypt}
            >
              Encrypt
            </Button>
          </Group>

          <Textarea placeholder="Output Content" minRows={5} defaultValue={outputContent} disabled />
        </Stack>
      </Container>
    </>
  );
};

export default Md5Page;
