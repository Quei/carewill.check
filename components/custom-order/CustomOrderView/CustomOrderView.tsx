import { useMemo } from 'react';
import cn from 'classnames';
import s from './CustomOrderView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useScreen } from '@lib/hooks/useScreen';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Seo, LaboRelatedPosts } from '@components/common';
import { PageHeader, OnelineLink, Slide } from '@components/ui';
import { slideItemFragment } from '@components/ui/Slide';
import type { VFC } from 'react';
import type { RelatedPosts } from '@components/common/LaboRelatedPosts';
import type { CustomOrderViewFragment } from 'types/schema';

type Props = CustomOrderViewFragment & {
  className?: string;
  relatedPosts?: RelatedPosts;
};

export const customOrderViewFragment = /* GraphQL */ `
  fragment CustomOrderView on CustomOrder {
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

const CustomOrderView: VFC<Props> = ({
  title,
  description,
  imageCollection,
  imageCollectionEnglish,
  mobileImageCollection,
  mobileImageCollectionEnglish,
  relatedPosts,
}) => {
  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();
  const firstImage = imageCollection?.items?.[0];
  const image = useImage({
    imageCollection,
    imageCollectionEnglish,
    mobileImageCollection,
    mobileImageCollectionEnglish,
  });
  console.log(relatedPosts);
  return (
    <>
      <Seo title={titleText} description={descriptionText} image={firstImage} />
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
      <OnelineLink href="https://www.makuake.com/project/carewill/">
        {f('formLink')}
      </OnelineLink>
      <LaboRelatedPosts relatedPosts={relatedPosts} />
    </>
  );
};

export default CustomOrderView;
