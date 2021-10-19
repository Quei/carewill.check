import { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import s from './ProductSingleView.module.css';
import {
  renderRichTextReact,
  richTextAssetFragment,
} from '@lib/contentful/utils/rich-text';
import { richTextEntryHyperlinkFragment } from '@lib/contentful/utils/store/rich-text-fragment';
import { Seo } from '@components/common';
import { Grid, Block, Button, YouTube, Container } from '@components/ui';
import usePrice from '@framework/product/use-price';
import { useAddToCart, getVariant } from '@lib/hooks/useAddToCart';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useCustomPriceText } from '@lib/hooks/useCustomPriceText';
import { Option } from './Option';
import { ProductSlider } from './ProductSlider';
import type { VFC } from 'react';
import type { Product } from '@commerce/types/product';
import type { SelectedOptions } from '@lib/hooks/useAddToCart';
import type { ProductSingleViewFragment } from 'types/schema';

type Props = {
  children?: any;
  product: Product;
  productContent: ProductSingleViewFragment;
  className?: string;
};

export const productSingleViewFragment = /* GraphQL */ `
  fragment ProductSingleView on Product {
    title
    videoId
    color
    size {
      json
      links {
        assets {
          block {
            ...RichTextAsset
          }
        }
      }
    }
    details {
      json
      links {
        assets {
          block {
            ...RichTextAsset
          }
        }
        entries {
          hyperlink {
            ...RichTextEntryHyperlink
          }
        }
      }
    }
  }
  ${richTextAssetFragment}
  ${richTextEntryHyperlinkFragment}
`;

const useChoices = (product: Props['product']) => {
  const [choices, setChoices] = useState<SelectedOptions>({});

  useEffect(() => {
    // Selects the default option
    product.variants[0].options?.forEach((v) => {
      setChoices((choices) => ({
        ...choices,
        [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
      }));
    });
  }, [product.variants]);

  return { choices, setChoices };
};

const ProductView: VFC<Props> = ({ product, productContent }) => {
  const { choices, setChoices } = useChoices(product);
  const { addToCart, loading } = useAddToCart();
  const handleOnClickAddToCart = () => {
    addToCart({
      product,
      choices,
    });
  };

  const variant = getVariant(product, choices);
  const { price } = usePrice({
    amount: variant ? variant.price : product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });
  const customPriceText = useCustomPriceText(price);

  const f = useIntlMessage();
  const titleText = productContent.title ?? '';
  const descriptionText = '';

  return (
    <>
      <Seo
        title={titleText}
        description={descriptionText}
        image={product.images?.[0]}
      />
      <Grid>
        <ProductSlider key={product.id} images={product.images}>
          {product.images.map((image, i) => (
            <div key={image.url} className={s.imageContainer}>
              <Image
                className={cn('w-full', 'h-auto', 'max-h-full', 'object-cover')}
                src={image.url!}
                alt={image.alt || 'Product Image'}
                width={1050}
                height={1050}
                priority={i === 0}
                quality="85"
              />
            </div>
          ))}
        </ProductSlider>
        <Block title={titleText} isCentering={true}>
          <div>
            <div className={cn('text-2xl')}>
              <span className={cn('align-middle')}>{customPriceText}</span>
              <span className={cn('text-sm', 'align-middle')}>
                {f('store.taxIncluded')}
              </span>
            </div>
            <div className={cn('text-sm')}>
              <div>
                {product.options?.map((option) => {
                  return (
                    <Option
                      key={option.displayName}
                      choices={choices}
                      setChoices={setChoices}
                      {...option}
                    />
                  );
                })}
              </div>
              {/* <div>{f('store.quantity')} :</div> */}
            </div>

            <div className={cn('flex', 'justify-center')}>
              <Button
                aria-label={f('store.addToCart')}
                type="button"
                className={cn('text-center', 'bg-green', s.cartButton)}
                onClick={handleOnClickAddToCart}
                loading={loading}
                disabled={variant?.availableForSale === false}
              >
                {variant?.availableForSale === false
                  ? f('store.notAvailable')
                  : f('store.addToCart')}
              </Button>
            </div>
          </div>
        </Block>
        {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]! as any}
          />
        )} */}
      </Grid>
      {productContent?.videoId && (
        <div className={cn('h-screen')}>
          <YouTube
            className={cn('pointer-events-none')}
            videoId={productContent.videoId}
            isFit={true}
            isAuto={true}
            isLoop={true}
          />
        </div>
      )}
      {productContent?.details && (
        <section className={cn('relative')}>
          <h2 className={cn('block-title')}>{f('store.product.details')}</h2>
          <Container className={cn('pt-24', 'pb-20', s.details)}>
            {renderRichTextReact(productContent.details)}
          </Container>
        </section>
      )}
    </>
  );
};

export default ProductView;
