import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { URLS } from '@config/domains';
import type { VFC } from 'react';
import type { NextSeoProps } from 'next-seo';
import type { Site } from 'types/site';

type Props = Pick<NextSeoProps, 'title' | 'titleTemplate' | 'description'> & {
  image?: {
    url?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

const useLanguageAlternates = () => {
  const { locales, asPath } = useRouter();
  const site = process.env.NEXT_PUBLIC_CURRENT_SITE as Site;
  if (locales && site) {
    const baseUrl = URLS[site];
    return locales.map((locale) => {
      return {
        hrefLang: locale === 'ja' ? 'x-default' : locale,
        href:
          locale === 'ja'
            ? `${baseUrl}${asPath}`
            : `${baseUrl}/${locale}${asPath}`,
      };
    });
  }
  return null;
};

const Seo: VFC<Props> = ({ title, titleTemplate, description, image }) => {
  const openGraph = {
    title,
    description,
    images: image?.url && image?.width && image?.height ? [image] : undefined,
  } as NextSeoProps['openGraph'];
  const languageAlternates = useLanguageAlternates();
  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      openGraph={openGraph}
      languageAlternates={languageAlternates ?? undefined}
    />
  );
};

export default Seo;
