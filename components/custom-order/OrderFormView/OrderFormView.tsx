import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import s from './OrderFormView.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import usePrice from '@framework/product/use-price';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
// import { useProductChoices } from '@lib/hooks/useProductChoices';
import { useAddToCart } from '@lib/hooks/useAddToCart';
import {
  renderRichText,
  renderRichTextReact,
  // hyperlinkEntry,
} from '@lib/contentful/utils/rich-text';
import { Seo } from '@components/common';
// import { Button, Checkbox, TextArea, ErrorText } from '@components/ui';
import { FormSection } from './FormSection';
// import {
//   CheckboxesWithImages,
//   checkboxesWithImagesImageFragment,
// } from './CheckboxesWithImages';
import { data } from './data';
import type { VFC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { SelectedOptions } from './helper';
import type { Product } from '@commerce/types/product';
import type { CustomOrderInputs } from 'types/custom-order-inputs';
import type { CustomOrderOrderFormViewFragment } from 'types/schema';

type Props = CustomOrderOrderFormViewFragment & {
  className?: string;
  product: Product;
};

export const customOrderOrderFormViewFragment = /* GraphQL */ `
  fragment CustomOrderOrderFormView on CustomOrder {
    title
    description {
      json
    }
    slug
  }
`;

function getCustomAttributes(inputs: CustomOrderInputs) {
  return Object.entries(inputs).map(([key, value]) => {
    if (value?.value) {
      return { key, value: value.value };
    } else if (typeof value === 'string') {
      return { key, value };
    }
    return {
      key,
      value: '',
    };
  });
}

const useLocaleLang = () => {
  const { locale } = useRouter();
  return locale ? (locale as 'ja' | 'en') : 'ja';
};

const useCustomOrderVariationChoices = ({ product }: { product: Product }) => {
  const [variationChoices, setVariationChoices] = useState<SelectedOptions>({});

  useEffect(() => {
    // Selects the default option
    product.variants[0].options?.forEach((v) => {
      setVariationChoices((choices) => ({
        ...choices,
        [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
      }));
    });
  }, [product.variants]);

  return { variationChoices, setVariationChoices };
};

const OrderFormView: VFC<Props> = ({ product, title, description, slug }) => {
  const localeLang = useLocaleLang();
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });
  const {
    variationChoices,
    setVariationChoices,
  } = useCustomOrderVariationChoices({
    product,
  });
  const { addToCart, loading } = useAddToCart();

  const formMethod = useForm<CustomOrderInputs>({
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = formMethod;

  const onSubmit: SubmitHandler<CustomOrderInputs> = (data) => {
    const attributes = getCustomAttributes(data);
    addToCart({
      product,
      choices: variationChoices,
      customAttributes: attributes,
    });
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
      <Seo title={titleText} description={descriptionText} />
      <div className={cn('md:flex')}>
        <div className={cn('h-96', 'md:flex-grow', 'md:flex-shrink', 'sticky')}>
          image area
        </div>
        <div className={cn('border-current', 'md:border-l', s.formWrapper)}>
          <FormProvider {...formMethod}>
            <form
              className={cn(s.form)}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {data.map((item, index) => {
                return (
                  <FormSection
                    key={`section-${index}`}
                    localeLang={localeLang}
                    data={item}
                    setVariationChoices={setVariationChoices}
                  />
                );
              })}
            </form>
          </FormProvider>
          <div className={s.price}>
            {price}
            {` `}
            {product.price?.currencyCode}
          </div>
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

export default OrderFormView;
