import Head from 'next/head';
import { AppProps } from 'next/app';
import { SpotlightAction } from '@mantine/spotlight';
import { Layout } from '../components/Layout';
import favicon from '../public/favicon.svg';
import { useRouter } from 'next/router';
import { spotlightItems } from '../utils/category-data';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const actions: SpotlightAction[] = spotlightItems?.map((item) => ({
    title: item.label,
    description: item.description,
    onTrigger: () => router.push(item.link || ''),
    icon: <item.icon size={18} />,
  }));

  return (
    <>
      <Head>
        <title>AK Tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href={favicon.src} />
      </Head>

      <Layout data={actions}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
