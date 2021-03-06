import cn from 'classnames';
import s from './Store.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Slide, Grid, Block, BlockContent } from '@components/ui';
import { Section } from '../Section';
import { slideItemFragment } from '@components/ui/Slide';
import type { VFC } from 'react';
import type { HomeStoreViewFragment } from 'types/schema';

const SITE = 'store';

export type Props = HomeStoreViewFragment & {
  className?: string;
};

export const homeStoreViewFragment = /* GraphQL */ `
  fragment HomeStoreView on Home {
    topSlideCollection(locale: "ja") {
      items {
        ...SlideItem
      }
    }
    topSlideCollectionEnglish: topSlideCollection(locale: "en") {
      items {
        ...SlideItem
      }
    }
    description {
      json
    }
    productImage {
      url
    }
    productHomeDescription {
      json
    }
    customOrderImage {
      url
    }
    customOrderHomeDescription {
      json
    }
    hauteCoutureImage {
      url
    }
    hauteCoutureHomeDescription {
      json
    }
    collaborationImage {
      url
    }
    collaborationHomeDescription {
      json
    }
    endSlideCollection(locale: "ja") {
      items {
        ...SlideItem
      }
    }
    endSlideCollectionEnglish: endSlideCollection(locale: "en") {
      items {
        ...SlideItem
      }
    }
  }

  ${slideItemFragment}
`;

const Store: VFC<Props> = ({
  className,
  topSlideCollection,
  topSlideCollectionEnglish,
  description,
  productImage,
  productHomeDescription,
  customOrderImage,
  customOrderHomeDescription,
  hauteCoutureImage,
  hauteCoutureHomeDescription,
  collaborationImage,
  collaborationHomeDescription,
  endSlideCollection,
  endSlideCollectionEnglish,
}) => {
  const f = useIntlMessage();
  return (
    <>
      {topSlideCollection?.items && topSlideCollectionEnglish?.items && (
        <Slide
          className={cn('h-screen')}
          items={topSlideCollection.items}
          itemsEnglish={topSlideCollectionEnglish.items}
          hasGoogleAnalyticsEventTracking={true}
        />
      )}
      <Section title={'Store'} description={renderRichTextReact(description)}>
        <Grid>
          {productImage && productHomeDescription && (
            <Block
              title={f('store.product')}
              titleTag="h3"
              href="/product"
              site={SITE}
            >
              <BlockContent
                image={{ src: productImage.url, alt: f('store.product') }}
              >
                {renderRichTextReact(productHomeDescription)}
              </BlockContent>
            </Block>
          )}
          {hauteCoutureImage && hauteCoutureHomeDescription && (
            <Block
              title={f('store.hauteCouture')}
              titleTag="h3"
              href="/haute-couture"
              site={SITE}
            >
              <BlockContent
                image={{
                  src: hauteCoutureImage.url,
                  alt: f('store.hauteCouture'),
                }}
              >
                {renderRichTextReact(hauteCoutureHomeDescription)}
              </BlockContent>
            </Block>
          )}
          {customOrderImage && customOrderHomeDescription && (
            <Block
              title={f('store.customOrder')}
              titleTag="h3"
              // href="/custom-order"
              // site={SITE}
            >
              <BlockContent
                image={{
                  src: customOrderImage.url,
                  alt: f('store.customOrder'),
                }}
              >
                {renderRichTextReact(customOrderHomeDescription)}
              </BlockContent>
            </Block>
          )}
          {collaborationImage && collaborationHomeDescription && (
            <Block
              title={f('store.collaboration')}
              titleTag="h3"
              // href="/collaboration"
              // site={SITE}
            >
              <BlockContent
                image={{
                  src: collaborationImage.url,
                  alt: f('store.collaboration'),
                }}
              >
                {renderRichTextReact(collaborationHomeDescription)}
              </BlockContent>
            </Block>
          )}
        </Grid>
        {endSlideCollection?.items && endSlideCollectionEnglish?.items && (
          <Slide
            className={cn('h-screen')}
            items={endSlideCollection.items}
            itemsEnglish={endSlideCollectionEnglish.items}
          />
        )}
      </Section>
    </>
  );
};

export default Store;
