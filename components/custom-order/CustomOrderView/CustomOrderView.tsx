import Link from 'next/link';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './CustomOrderView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useScreen } from '@lib/hooks/useScreen';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { getOpenGraph } from '@lib/get-open-graph';
import { PageHeader, OnelineLink, Slide } from '@components/ui';
import { slideItemFragment } from '@components/ui/Slide';
import type { FC } from 'react';
import type { CustomOrderViewFragment } from 'types/schema';
import { useMemo } from 'react';

type Props = CustomOrderViewFragment & {
  className?: string;
  children?: any;
};

export const customOrderViewFragment = /* GraphQL */ `
  fragment customOrderView on CustomOrder {
    title
    description {
      json
    }
    imageCollection(locale: "ja") {
      items {
        ...SlideItem
      }
    }
    imageCollectionEnglish: imageCollection(locale: "en") {
      items {
        ...SlideItem
      }
    }
    mobileImageCollection(locale: "ja") {
      items {
        ...SlideItem
      }
    }
    mobileImageCollectionEnglish: mobileImageCollection(locale: "ja") {
      items {
        ...SlideItem
      }
    }
  }

  ${slideItemFragment}
`;

const useImage = ({
  imageCollection,
  imageCollectionEnglish,
  mobileImageCollection,
  mobileImageCollectionEnglish,
}: Pick<
  Props,
  | 'imageCollection'
  | 'imageCollectionEnglish'
  | 'mobileImageCollection'
  | 'mobileImageCollectionEnglish'
>) => {
  const { isScreenMd } = useScreen();
  return useMemo(() => {
    if (isScreenMd) {
      return { ja: imageCollection, en: imageCollectionEnglish };
    } else {
      return { ja: mobileImageCollection, en: mobileImageCollectionEnglish };
    }
  }, [
    isScreenMd,
    imageCollection,
    imageCollectionEnglish,
    mobileImageCollection,
    mobileImageCollectionEnglish,
  ]);
};

const CustomOrderView: FC<Props> = ({
  title,
  description,
  imageCollection,
  imageCollectionEnglish,
  mobileImageCollection,
  mobileImageCollectionEnglish,
}) => {
  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();
  const firstImage = imageCollection?.items?.[0];
  const openGraph = getOpenGraph({
    title: titleText,
    description: descriptionText,
    image: firstImage,
  });
  const image = useImage({
    imageCollection,
    imageCollectionEnglish,
    mobileImageCollection,
    mobileImageCollectionEnglish,
  });

  return (
    <>
      <NextSeo
        title={titleText}
        description={descriptionText}
        openGraph={openGraph}
      />
      <PageHeader title={f('store.customOrder')}>
        {renderRichTextReact(description)}
      </PageHeader>
      {image?.ja?.items && image?.en?.items && (
        <div
          className={cn('less-than-md:aspect-w-1', 'less-than-md:aspect-h-1')}
        >
          <Slide
            className={cn('h-full', 'md:h-screen')}
            items={image.ja.items}
            itemsEnglish={image.en.items}
            disableLink={true}
          />
        </div>
      )}
      <OnelineLink href="https://google.com">{f('makuakeLink')}</OnelineLink>
    </>
  );
};

export default CustomOrderView;
