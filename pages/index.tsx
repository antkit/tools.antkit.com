import { Container, Space, Stack } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { ToolsActionGrid } from '../components/ToolsActionGrid';
import { categories } from '../utils/category-data';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homepage - AK Tools</title>
      </Head>

      <Container size={'xl'}>
        <Stack spacing={'lg'}>
          <ToolsActionGrid
            label="Encode and Decode"
            items={categories}
            moreText="+ 21 other tools"
            moreHref=""
          />
          <ToolsActionGrid
            label="Encrypt and Decrypt"
            items={categories}
            moreText="+ 10 other tools"
            moreHref=""
          />
          <Space h={40} />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
