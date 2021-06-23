import React, { FC, useState } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './OrderView.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrice from '@framework/product/use-price';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useProductChoices } from '@lib/hooks/useProductChoices';
import { useAddToCart } from '@lib/hooks/useAddToCart';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Button, Checkbox, OrderFormSection } from '@components/ui';
import {
  CheckboxesWithImages,
  checkboxesWithImagesImageFragment,
} from '@components/common';
import type { Product } from '@commerce/types/product';
import type { CustomOrderOptions } from 'types/custom-order-options';
import type { CustomOrderOrderViewFragment } from 'types/schema';

type Props = CustomOrderOrderViewFragment & {
  className?: string;
  product: Product;
};

export const customOrderOrderViewFragment = /* GraphQL */ `
  fragment customOrderOrderView on CustomOrder {
    title
    description {
      json
    }
    slug
    customizedPartTitle
    customizedPartDescription
    customizedPartPickupImagesCollection {
      items {
        sys {
          id
        }
      }
    }
    customizedPartImagesCollection {
      items {
        ...checkboxesWithImagesImage
      }
    }
    customizedPartOptions
    customizedPartNotes {
      json
    }
    specTitle
    colorTitle
    colorDescription
    colorOptions
    colorPickupImagesCollection {
      items {
        ...checkboxesWithImagesImage
      }
    }
    sizeTitle
    sizeDescription
    sizeOptions
  }
  ${checkboxesWithImagesImageFragment}
`;

const OrderView: FC<Props> = ({
  product,
  title,
  description,
  slug,
  customizedPartTitle,
  customizedPartDescription,
  customizedPartPickupImagesCollection,
  customizedPartImagesCollection,
  customizedPartOptions,
  customizedPartNotes,
  specTitle,
  colorTitle,
  colorDescription,
  colorOptions,
  colorPickupImagesCollection,
  sizeTitle,
  sizeDescription,
  sizeOptions,
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });
  const { productChoices, setProductChoices } = useProductChoices({ product });
  const { addToCart, loading } = useAddToCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomOrderOptions>();

  const onSubmit: SubmitHandler<CustomOrderOptions> = (data) => {
    console.log(data);
    addToCart({ product, choices: productChoices, customOrderOptions: data });
  };

  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();

  return (
    <div className={cn(s.root, 'fit')}>
      <NextSeo
        title={titleText}
        description={descriptionText}
        openGraph={{
          type: 'website',
          title: titleText,
          description: descriptionText,
          // images: [
          //   {
          //     url: product.images[0]?.url!,
          //     width: 800,
          //     height: 600,
          //     alt: product.name,
          //   },
          // ],
        }}
      />
      <div>
        <h1>{titleText}</h1>
        <div className={s.price}>
          {price}
          {` `}
          {product.price?.currencyCode}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <OrderFormSection
            title={customizedPartTitle ?? undefined}
            description={customizedPartDescription ?? undefined}
          >
            {customizedPartImagesCollection?.items && customizedPartOptions && (
              <CheckboxesWithImages
                images={customizedPartImagesCollection.items}
                options={customizedPartOptions}
                optionName={'customized-part'}
                register={register}
              />
            )}
            {customizedPartNotes && (
              <p>{renderRichTextReact(customizedPartNotes)}</p>
            )}
          </OrderFormSection>
          <OrderFormSection title={specTitle ?? undefined}>
            test
          </OrderFormSection>
          <OrderFormSection
            title={colorTitle ?? undefined}
            description={colorDescription ?? undefined}
          >
            {colorOptions &&
              colorOptions.map((option, index) => (
                <React.Fragment key={`color-option-${index}`}>
                  {option && (
                    <Checkbox
                      type="radio"
                      id={`color-option-${index}`}
                      value={option}
                      label={option}
                      name={'color'}
                      register={register}
                    />
                  )}
                </React.Fragment>
              ))}
          </OrderFormSection>
          <OrderFormSection
            title={sizeTitle ?? undefined}
            description={sizeDescription ?? undefined}
          >
            {sizeOptions &&
              sizeOptions.map((option, index) => (
                <React.Fragment key={`size-option-${index}`}>
                  {option && (
                    <Checkbox
                      type="radio"
                      id={`size-option-${index}`}
                      value={option}
                      label={option}
                      name={'size'}
                      register={register}
                    />
                  )}
                </React.Fragment>
              ))}
          </OrderFormSection>
          <OrderFormSection title={'枚数'}>test</OrderFormSection>
          <OrderFormSection title={'ギフト包装'}>test</OrderFormSection>
          <OrderFormSection title={'メッセージ'}>test</OrderFormSection>
        </div>
        <div>
          <Button
            aria-label="Add to Cart"
            type="submit"
            className={s.button}
            loading={loading}
          >
            {f('addToCart')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderView;
