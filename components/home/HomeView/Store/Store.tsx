import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Grid, Block, BlockContent } from '@components/ui';
import { Section } from '../Section';
import type { VFC } from 'react';
import type { HomeStoreViewFragment } from 'types/schema';

const SITE = 'store';

export type Props = HomeStoreViewFragment & {
  className?: string;
};

export const homeStoreViewFragment = /* GraphQL */ `
  fragment homeStoreView on Home {
    description {
      json
    }
    productImage {
      url
    }
    productDescription {
      json
    }
    customOrderImage {
      url
    }
    customOrderDescription {
      json
    }
    hauteCoutureImage {
      url
    }
    hauteCoutureDescription {
      json
    }
    collaborationImage {
      url
    }
    collaborationDescription {
      json
    }
  }
`;

const Store: VFC<Props> = ({
  className,
  description,
  productImage,
  productDescription,
  customOrderImage,
  customOrderDescription,
  hauteCoutureImage,
  hauteCoutureDescription,
  collaborationImage,
  collaborationDescription,
}) => {
  const f = useIntlMessage();
  return (
    <Section title={'Store'} description={renderRichTextReact(description)}>
      <Grid>
        {productImage && productDescription && (
          <Block title={f('product')} titleTag="h3" href="/product" site={SITE}>
            <BlockContent image={{ src: productImage.url, alt: f('product') }}>
              {renderRichTextReact(productDescription)}
            </BlockContent>
          </Block>
        )}
        {customOrderImage && customOrderDescription && (
          <Block
            title={f('customOrder')}
            titleTag="h3"
            href="/custom-order"
            site={SITE}
          >
            <BlockContent
              image={{ src: customOrderImage.url, alt: f('customOrder') }}
            >
              {renderRichTextReact(customOrderDescription)}
            </BlockContent>
          </Block>
        )}
        {hauteCoutureImage && hauteCoutureDescription && (
          <Block
            title={f('hauteCouture')}
            titleTag="h3"
            href="/haute-couture"
            site={SITE}
          >
            <BlockContent
              image={{ src: hauteCoutureImage.url, alt: f('hauteCouture') }}
            >
              {renderRichTextReact(hauteCoutureDescription)}
            </BlockContent>
          </Block>
        )}
        {collaborationImage && collaborationDescription && (
          <Block
            title={f('collaboration')}
            titleTag="h3"
            href="/collaboration"
            site={SITE}
          >
            <BlockContent
              image={{ src: collaborationImage.url, alt: f('collaboration') }}
            >
              {renderRichTextReact(collaborationDescription)}
            </BlockContent>
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
      <div className="h-60">movie</div>
    </Section>
  );
};

export default Store;
