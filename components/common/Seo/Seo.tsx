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

const useOpenGraph = ({
  title,
  description,
  image,
  baseUrl,
}: Pick<Props, 'title' | 'description' | 'image'> & { baseUrl: string }) => {
  const { locale, asPath } = useRouter();
  const openGraph = {
    title,
    description,
    images:
      image?.url && image?.width && image?.height
        ? [{ ...image, ...{ alt: title } }]
        : undefined,
    url:
      locale === 'ja' ? `${baseUrl}${asPath}` : `${baseUrl}/${locale}${asPath}`,
  } as NextSeoProps['openGraph'];
  return openGraph;
};

const useLanguageAlternates = ({ baseUrl }: { baseUrl: string }) => {
  const { locales, asPath } = useRouter();
  if (locales) {
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
  const site = process.env.NEXT_PUBLIC_CURRENT_SITE as Site;
  const baseUrl = URLS[site];
  const openGraph = useOpenGraph({ title, description, image, baseUrl });
  const languageAlternates = useLanguageAlternates({ baseUrl });
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
