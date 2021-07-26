import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './OrderFormView.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrice from '@framework/product/use-price';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useProductChoices } from '@lib/hooks/useProductChoices';
import { useAddToCart } from '@lib/hooks/useAddToCart';
import {
  renderRichText,
  renderRichTextReact,
  // hyperlinkEntry,
} from '@lib/contentful/utils/rich-text';
import { Button, Checkbox, TextArea, ErrorText } from '@components/ui';
import { FormSection } from './FormSection';
import {
  CheckboxesWithImages,
  checkboxesWithImagesImageFragment,
} from './CheckboxesWithImages';
import type { VFC } from 'react';
import type { Product } from '@commerce/types/product';
import type { CustomOrderOptions } from 'types/custom-order-options';
import type { CustomOrderOrderFormViewFragment } from 'types/schema';

type Props = CustomOrderOrderFormViewFragment & {
  className?: string;
  product: Product;
};

export const customOrderOrderFormViewFragment = /* GraphQL */ `
  fragment customOrderOrderFormView on CustomOrder {
    title
    description {
      json
    }
    slug
  }
`;

// export const customOrderOrderFormViewFragment = /* GraphQL */ `
//   fragment customOrderOrderFormView on CustomOrder {
//     title
//     description {
//       json
//     }
//     slug
//     customizedPartTitle
//     customizedPartDescription
//     customizedPartPickupImagesCollection {
//       items {
//         sys {
//           id
//         }
//       }
//     }
//     customizedPartImagesCollection {
//       items {
//         ...checkboxesWithImagesImage
//       }
//     }
//     customizedPartOptions
//     customizedPartNotes {
//       json
//       links {
//         entries {
//           hyperlink {
//             __typename
//             sys {
//               id
//             }
//             ... on HauteCouture {
//               slug
//             }
//           }
//         }
//       }
//     }
//     specTitle
//     colorTitle
//     colorDescription
//     colorOptions
//     colorPickupImagesCollection {
//       items {
//         ...checkboxesWithImagesImage
//       }
//     }
//     sizeTitle
//     sizeDescription
//     sizeOptions
//   }
//   ${checkboxesWithImagesImageFragment}
// `;

const OrderView: VFC<Props> = ({
  product,
  title,
  description,
  slug,
  // customizedPartTitle,
  // customizedPartDescription,
  // customizedPartPickupImagesCollection,
  // customizedPartImagesCollection,
  // customizedPartOptions,
  // customizedPartNotes,
  // specTitle,
  // colorTitle,
  // colorDescription,
  // colorOptions,
  // colorPickupImagesCollection,
  // sizeTitle,
  // sizeDescription,
  // sizeOptions,
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
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CustomOrderOptions>();

  const onSubmit: SubmitHandler<CustomOrderOptions> = (data) => {
    addToCart({ product, choices: productChoices, customOrderOptions: data });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <OrderFormSection
            title={customizedPartTitle ?? undefined}
            description={customizedPartDescription ?? undefined}
          >
            {customizedPartImagesCollection?.items && customizedPartOptions && (
              <CheckboxesWithImages
                images={customizedPartImagesCollection.items}
                options={customizedPartOptions}
                optionName={'customizedPart'}
                required={true}
                register={register}
              />
            )}
            {errors.customizedPart?.type === 'required' && (
              <ErrorText>{f('errorRequiredCheckbox')}</ErrorText>
            )}
            {customizedPartNotes && (
              <p>{renderRichTextReact(customizedPartNotes)}</p>
            )}
          </OrderFormSection>
          <OrderFormSection
            title={specTitle ?? undefined}
            description="オープンは何にしますか？"
          >
            test
          </OrderFormSection>
          <OrderFormSection
            title={colorTitle ?? undefined}
            description={colorDescription ?? undefined}
          >
            {colorOptions?.map((option, index) => (
              <React.Fragment key={`color-option-${index}`}>
                {option && (
                  <Checkbox
                    type="radio"
                    id={`color-option-${index}`}
                    value={option}
                    label={option}
                    name={'color'}
                    required={true}
                    register={register}
                  />
                )}
              </React.Fragment>
            ))}
            {errors.color?.type === 'required' && (
              <ErrorText>{f('errorRequiredCheckbox')}</ErrorText>
            )}
          </OrderFormSection>
          <OrderFormSection
            title={sizeTitle ?? undefined}
            description={sizeDescription ?? undefined}
          >
            {sizeOptions?.map((option, index) => (
              <React.Fragment key={`size-option-${index}`}>
                {option && (
                  <Checkbox
                    type="radio"
                    id={`size-option-${index}`}
                    value={option}
                    label={option}
                    name={'size'}
                    required={true}
                    register={register}
                  />
                )}
              </React.Fragment>
            ))}
            {errors.size?.type === 'required' && (
              <ErrorText>{f('errorRequiredCheckbox')}</ErrorText>
            )}
          </OrderFormSection>
          <OrderFormSection
            title={'枚数'}
            description={'ご購入する枚数をお聞かせください。'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'ギフト包装'}
            description={'ギフト包装・メッセージは行いますか？'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'メッセージ'}
            description={'メッセージの文章をご記入ください。'}
          >
            <TextArea id="message" name="message" register={register} />
          </OrderFormSection>
          <p>accept</p>
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
      </form> */}
    </div>
  );
};

export default OrderView;
