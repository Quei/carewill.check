import cn from 'classnames';
import s from './Store.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Slide, Grid, Block, BlockContent } from '@components/ui';
import { Section } from '../Section';
import { slideItemFragment } from '@components/ui/Slide';
import { CrossBlock } from '@components/icons';
import type { VFC } from 'react';
import type { HomeStoreViewFragment } from 'types/schema';

const SITE = 'store';

export type Props = HomeStoreViewFragment & {
  className?: string;
};

export const homeStoreViewFragment = /* GraphQL */ `
  fragment homeStoreView on Home {
    topSlideCollection(locale: "ja") {
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
  }

  ${slideItemFragment}
`;

const Store: VFC<Props> = ({
  className,
  topSlideCollection,
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
}) => {
  const f = useIntlMessage();
  return (
    <>
      {topSlideCollection?.items && (
        <Slide className={cn('h-screen')} items={topSlideCollection.items} />
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
          {customOrderImage && customOrderHomeDescription && (
            <Block
              title={f('store.customOrder')}
              titleTag="h3"
              href="/custom-order"
              site={SITE}
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
          {collaborationImage && collaborationHomeDescription && (
            <Block
              title={f('store.collaboration')}
              titleTag="h3"
              // href="/collaboration"
              site={SITE}
            >
              <BlockContent
                image={{
                  src: collaborationImage.url,
                  alt: f('store.collaboration'),
                }}
              >
                {renderRichTextReact(collaborationHomeDescription)}
              </BlockContent>
              <CrossBlock className="absolute top-0 left-0" />
            </Block>
          )}
          {/* {products.slice(0, 3).map((product, i) => (
      <ProductCard
        key={product.id}
        product={product}
        imgProps={{
          width: i === 0 ? 1080 : 540,
          height: i === 0 ? 1080 : 540,
        }}
      />
    ))} */}
        </Grid>
        {endSlideCollection?.items && (
          <Slide className={cn('h-screen')} items={endSlideCollection.items} />
        )}
      </Section>
    </>
  );
};

export default Store;
