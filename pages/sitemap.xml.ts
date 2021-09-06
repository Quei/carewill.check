// import fs from 'fs';
import { generateSitemap } from '@lib/generate-sitemap';
import { URLS } from '@config/domains';
import type { GetServerSidePropsContext } from 'next';

// NOTE:
// https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js
// https://zenn.dev/catnose99/articles/c441954a987c24

export const getServerSideProps = ({
  res,
  locales,
}: GetServerSidePropsContext) => {
  const baseUrl = URLS.store;
  const ignoreList = ['/cart', '/orders', '/profile', '/search', '/wishlist'];

  const sitemap = generateSitemap({ ignoreList, locales, baseUrl });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

const Sitemap = () => {};

export default Sitemap;
