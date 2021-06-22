import React, { FC, useState } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './OrderView.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrice from '@framework/product/use-price';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useProductChoices } from '@lib/hooks/useProductChoices';
import { useAddToCart } from '@lib/hooks/useAddToCart';
import { renderRichText } from '@lib/contentful/utils/rich-text';
import { Button, Checkbox } from '@components/ui';
import {
  CheckboxesWithImages,
  checkboxesWithImagesImageFragment,
} from '@components/common';
import type { Product } from '@commerce/types/product';
import type { CustomOrderOptions } from 'types/custom-order-options';
import type { OrderViewFragment } from 'types/schema';

type Props = OrderViewFragment & {
  className?: string;
  product: Product;
};

export const orderViewFragment = /* GraphQL */ `
  fragment orderView on CustomOrder {
    title
    description {
      json
    }
    slug
    colorTitle
    colorDescription
    colorOptions
    colorImagesCollection {
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

const dummy = {
  wearFromBelowTitle: '下から着る',
  wearFromBelowDescription:
    '下から着ることを予定されますか?<br>(※)傷病によっては下から着ることが楽な場合があります。下からの着方は動画 を参照してください。',
  wearFromBelowMovie: 'https://www.youtube.com/watch?v=trD0hUqyDM8',
};

const OrderView: FC<Props> = ({
  product,
  title,
  description,
  slug,
  colorTitle,
  colorDescription,
  colorOptions,
  colorImagesCollection,
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

  const { wearFromBelowTitle, wearFromBelowDescription } = dummy;

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
          <section className={cn(s.section)}>
            {colorTitle && <h2>{colorTitle}</h2>}
            {colorDescription && <p>{colorDescription}</p>}
            {colorImagesCollection?.items && colorOptions && (
              <CheckboxesWithImages
                images={colorImagesCollection.items}
                options={colorOptions}
                optionName={'color'}
                register={register}
              />
            )}
          </section>
          <section className={cn(s.section)}>
            {sizeTitle && <h2>{sizeTitle}</h2>}
            {sizeDescription && <p>{sizeDescription}</p>}
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
          </section>
          <section className={cn(s.section)}>
            {wearFromBelowTitle && <h2>{wearFromBelowTitle}</h2>}
            {wearFromBelowDescription && <p>{wearFromBelowDescription}</p>}
            <p>動画ここに入る</p>
            {/* <Checkbox
              type="radio"
              id={`wear-from-below-option-0`}
              value={option}
              label={option}
              name={'size'}
              register={register}
            />
            <Checkbox
              type="radio"
              id={`wear-from-below-option-1`}
              value={option}
              label={option}
              name={'size'}
              register={register}
            /> */}
          </section>
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
