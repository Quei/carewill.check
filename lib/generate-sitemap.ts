import fs from 'fs';
import { nonNullableFilter } from '@lib/non-nullable-filter';

type Props = {
  ignoreList?: (string | RegExp)[];
  locales: string[] | undefined;
  baseUrl: string;
  dynamicPages?: { url: string; publishedAt: string }[];
};

const getStaticPages = ({
  ignoreList = [],
  locales,
  baseUrl,
}: Pick<Props, 'ignoreList' | 'locales' | 'baseUrl'>) => {
  const manifestPath = '.next/server/pages-manifest.json';
  if (fs.existsSync(manifestPath)) {
    const rawJson = fs.readFileSync(manifestPath);
    const manifestFile = JSON.parse(rawJson.toString());
    const defaultIgnoreList = [
      '^/api',
      'error$',
      '404$',
      '500$',
      'xml$',
      /^\/\[/,
    ];
    if (manifestFile) {
      return Object.keys(manifestFile)
        .filter((path) => {
          // delete internal url eg.)_app, _document etc.
          return !/[^\/]*^.[_]|(?:\[)/.test(path);
        })
        .filter((path) => {
          return ![...defaultIgnoreList, ...ignoreList].some((item) => {
            const regexp = new RegExp(item);
            return regexp.test(path);
          });
        })
        .map((item) => {
          return locales?.map((locale) => {
            if (item === '/') {
              return locale === 'ja' ? baseUrl : `${baseUrl}/${locale}/`;
            } else {
              return locale === 'ja'
                ? `${baseUrl}${item}/`
                : `${baseUrl}/${locale}${item}/`;
            }
          });
        })
        .flatMap((item) => item)
        .filter(nonNullableFilter);
    }
  }
  return [];
};

export const generateSitemap = ({
  ignoreList,
  locales,
  baseUrl,
  dynamicPages,
}: Props) => {
  const staticPages = getStaticPages({ ignoreList, locales, baseUrl });
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${
        staticPages !== undefined
          ? staticPages
              .map((url) => {
                return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
            `;
              })
              .join('')
          : ''
      }
      ${
        dynamicPages !== undefined
          ? dynamicPages
              .map(({ url, publishedAt }) => {
                return `
            <url>
              <loc>${url}</loc>
              <lastmod>${publishedAt}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
            `;
              })
              .join('')
          : ''
      }
    </urlset>
  `;
};
