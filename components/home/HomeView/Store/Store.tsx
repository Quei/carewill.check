import cn from 'classnames';
import s from './Store.module.css';
import Image from 'next/image';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderTextToDom,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Grid, Block, BlockContent } from '@components/ui';
import { Section } from '../Section';
import type { VFC } from 'react';
import type { HomeStoreViewFragment } from 'types/schema';

const SITE = 'store';

type Props = HomeStoreViewFragment & {
  className?: string;
};

export const homeStoreViewFragment = /* GraphQL */ `
  fragment homeStoreView on Home {
    description {
      json
    }
    product {
      url
      description
    }
    customOrder {
      url
      description
    }
    hauteCouture {
      url
      description
    }
    collaboration {
      url
      description
    }
  }
`;

const Store: VFC<Props> = ({
  className,
  description,
  product,
  customOrder,
  hauteCouture,
  collaboration,
}) => {
  const f = useIntlMessage();
  return (
    <Section title={'Store'} description={renderRichTextReact(description)}>
      <Grid>
        {product && (
          <Block title={f('product')} titleTag="h3" href="/product" site={SITE}>
            <BlockContent imageSrc={product.url} imageAlt={f('product')}>
              {product.description}
            </BlockContent>
          </Block>
        )}
        {customOrder && (
          <Block
            title={f('customOrder')}
            titleTag="h3"
            href="/custom-order"
            site={SITE}
          >
            <BlockContent
              imageSrc={customOrder.url}
              imageAlt={f('customOrder')}
            >
              {customOrder.description}
            </BlockContent>
          </Block>
        )}
        {hauteCouture && (
          <Block
            title={f('hauteCouture')}
            titleTag="h3"
            href="/haute-couture"
            site={SITE}
          >
            <BlockContent
              imageSrc={hauteCouture.url}
              imageAlt={f('hauteCouture')}
            >
              {hauteCouture.description}
            </BlockContent>
          </Block>
        )}
        {collaboration && (
          <Block
            title={f('collaboration')}
            titleTag="h3"
            href="/collaboration"
            site={SITE}
          >
            <BlockContent
              imageSrc={collaboration.url}
              imageAlt={f('collaboration')}
            >
              {collaboration.description}
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
