import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useMounted } from '@lib/hooks/useMounted';
import type { VFC } from 'react';
import type { NextSeoProps } from 'next-seo';

type Props = Pick<NextSeoProps, 'title' | 'titleTemplate' | 'description'> & {
  image?: {
    url?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

const useLanguageAlternates = () => {
  const { locales, asPath } = useRouter();
  const isMounted = useMounted();
  if (locales && isMounted) {
    return locales.map((locale) => {
      return {
        hrefLang: locale === 'ja' ? 'x-default' : locale,
        href:
          locale === 'ja'
            ? `${location.origin}${asPath}`
            : `${location.origin}/${locale}${asPath}`,
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
      additionalMetaTags={
        openGraph?.images?.[0]?.url
          ? [
              {
                name: 'twitter:image',
                content: openGraph.images[0].url,
              },
            ]
          : undefined
      }
    />
  );
};

export default Seo;
