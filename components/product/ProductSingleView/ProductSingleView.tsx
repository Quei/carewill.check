import { useEffect, useState, useMemo, useCallback, Fragment } from 'react';
import Image from 'next/image';
import { animateScroll } from 'react-scroll';
import cn from 'classnames';
import s from './ProductSingleView.module.css';
import {
  renderRichTextReact,
  richTextAssetFragment,
} from '@lib/contentful/utils/rich-text';
import { richTextEntryHyperlinkFragment } from '@lib/contentful/utils/store/rich-text-fragment';
import usePrice from '@framework/product/use-price';
import { useAddToCart, getVariant } from '@lib/hooks/useAddToCart';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useCustomPriceText } from '@lib/hooks/useCustomPriceText';
import { useScreen } from '@lib/hooks/useScreen';
import { Seo, LaboRelatedPosts } from '@components/common';
import {
  Grid,
  Block,
  BlockContent,
  Button,
  YouTube,
  Container,
} from '@components/ui';
import { ProductSlider } from './ProductSlider';
import { Option } from './Option';
import { SizeContent } from './SizeContent';
import { Quantity } from './Quantity';
import { AboutSizeButton } from './AboutSizeButton';
import type { VFC } from 'react';
import type { Product } from '@commerce/../shopify/types/product';
import type { SelectedOptions } from '@lib/hooks/useAddToCart';
import type { RelatedPosts } from '@components/common/LaboRelatedPosts';
import type { ProductSingleViewFragment } from 'types/schema';

type Props = {
  product: Product;
  productContent: ProductSingleViewFragment;
  relatedPosts?: RelatedPosts;
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
  const [choices, setChoices] = useState<SelectedOptions>(() => {
    // Selects the default option
    return product.variants[0].options?.reduce((prev, current) => {
      return {
        ...prev,
        [current.displayName.toLowerCase()]: current.values[0].label.toLowerCase(),
      };
    }, {});
  });

  // const [choices, setChoices] = useState<SelectedOptions>({});
  // useEffect(() => {
  //   // Selects the default option
  //   product.variants[0].options?.forEach((option, index) => {
  //     setChoices((choices) => ({
  //       ...choices,
  //       [option.displayName.toLowerCase()]: option.values[0].label.toLowerCase(),
  //     }));
  //   });
  // }, [product.variants]);

  return { choices, setChoices };
};

const useIsDirtyChoices = () => {
  const [isDirtyChoices, setIsDirtyChoices] = useState(false);
  const setDirty = useCallback(() => {
    setIsDirtyChoices(true);
  }, []);
  return { isDirtyChoices, setDirty };
};

const useQuantity = () => {
  const [quantity, setQuantity] = useState(1);
  const addQuantity = useCallback(() => {
    setQuantity((value) => value + 1);
  }, []);
  const subtractQuantity = useCallback(() => {
    setQuantity((value) => {
      return value > 1 ? value - 1 : 1;
    });
  }, []);
  return { quantity, addQuantity, subtractQuantity };
};

const useTextBlockChildElement = () => {
  const { isScreenLg } = useScreen();
  return useMemo(() => {
    if (isScreenLg) {
      return 'div';
    } else {
      return BlockContent;
    }
  }, [isScreenLg]);
};

const useShownAboutSize = () => {
  const [hasShownAboutSize, setHasShownAboutSize] = useState(false);
  const showSizeContent = useCallback(() => {
    setHasShownAboutSize(true);
    animateScroll.scrollToTop({ duration: 200 });
  }, []);
  const hideSizeContent = useCallback(() => {
    setHasShownAboutSize(false);
  }, []);
  return { hasShownAboutSize, showSizeContent, hideSizeContent };
};

const ProductView: VFC<Props> = ({ product, productContent, relatedPosts }) => {
  const { choices, setChoices } = useChoices(product);
  const { isDirtyChoices, setDirty } = useIsDirtyChoices();
  const { quantity, addQuantity, subtractQuantity } = useQuantity();
  const { addToCart, loading } = useAddToCart();
  const handleOnClickAddToCart = useCallback(() => {
    addToCart({
      product,
      choices,
      quantity,
    });
  }, [addToCart, product, choices, quantity]);

  const variant = getVariant(product, choices);
  const { price } = usePrice({
    amount: variant ? variant.price : product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });
  const customPriceText = useCustomPriceText(price);

  const {
    hasShownAboutSize,
    showSizeContent,
    hideSizeContent,
  } = useShownAboutSize();

  const f = useIntlMessage();
  const titleText = productContent.title ?? '';
  const descriptionText = '';

  const TextBlockChildElement = useTextBlockChildElement();
  const hasSizeOption = product.options?.some((option) =>
    /^size$/i.test(option.displayName)
  );

  return (
    <>
      <Seo
        title={titleText}
        description={descriptionText}
        image={product.images?.[0]}
      />
      <Grid>
        <div className={cn('relative')}>
          <ProductSlider
            key={product.id}
            images={product.images}
            currentSelectedVariantImageId={
              isDirtyChoices ? variant.image?.id : undefined
            }
          >
            {product.images.map((image, i) => (
              <div key={image.url} className={s.imageContainer}>
                <Image
                  className={cn(
                    'w-full',
                    'h-auto',
                    'max-h-full',
                    'object-cover'
                  )}
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
          {hasShownAboutSize && productContent.size && (
            <SizeContent
              className={cn('absolute', 'z-20', 'inset-0')}
              content={productContent.size}
              onClick={hideSizeContent}
            />
          )}
        </div>
        <Block title={titleText} isCentering={true}>
          <TextBlockChildElement>
            <div>
              <span className={cn('text-2xl', 'align-middle')}>
                {customPriceText}
              </span>
              <span className={cn('text-sm', 'align-middle')}>
                {f('store.taxIncluded')}
              </span>
            </div>
            <div className={cn('text-sm', 'mt-2')}>
              {product.options?.map((option) => {
                return (
                  <Fragment key={option.displayName}>
                    <Option
                      className={s.option}
                      choices={choices}
                      setChoices={setChoices}
                      color={productContent.color}
                      setDirty={setDirty}
                      {...option}
                    />
                    {hasSizeOption &&
                      productContent.size &&
                      option.displayName.toLowerCase() === 'size' && (
                        <AboutSizeButton onClick={showSizeContent} />
                      )}
                  </Fragment>
                );
              })}
              {!hasSizeOption && productContent.size && (
                <AboutSizeButton onClick={showSizeContent} />
              )}
              <Quantity
                className={cn('mt-4')}
                quantity={quantity}
                addQuantity={addQuantity}
                subtractQuantity={subtractQuantity}
              />
            </div>

            <div className={cn('flex', 'justify-center', 'mt-10')}>
              <Button
                aria-label={f('store.addToCart')}
                type="button"
                className={cn(s.cartButton)}
                onClick={handleOnClickAddToCart}
                loading={loading}
                disabled={variant?.availableForSale === false}
              >
                {variant?.availableForSale === false
                  ? f('store.notAvailable')
                  : f('store.addToCart')}
              </Button>
            </div>
          </TextBlockChildElement>
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
        <Block title={f('store.product.details')} titleTag="h2">
          <BlockContent>
            <Container className={cn(s.details)}>
              {renderRichTextReact(productContent.details)}
            </Container>
          </BlockContent>
        </Block>
      )}
      {relatedPosts && relatedPosts.length > 0 && (
        <LaboRelatedPosts relatedPosts={relatedPosts} />
      )}
    </>
  );
};

export default ProductView;
