import { useState } from 'react';
import { useAddItem } from '@framework/cart';
import { useUI } from '@components/ui';
import type { Product } from '@commerce/types/product';
import type { CustomOrderOptions } from 'types/custom-order-options';

type SelectedOptions = Record<string, string | null>;

function getVariant(product: Product, opts: SelectedOptions) {
  const variant = product.variants.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v) => v.label.toLowerCase() === value);
        }
      })
    );
  });
  return variant;
}

function getCustomAttributes(options: CustomOrderOptions) {
  return Object.entries(options).map(([key, value]) => {
    return { key, value };
  });
}

export const useAddToCart = () => {
  const addItem = useAddItem();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const addToCart = async ({
    product,
    choices,
    customOrderOptions,
  }: {
    product: Product;
    choices: SelectedOptions;
    customOrderOptions?: CustomOrderOptions;
  }) => {
    const variant = getVariant(product, choices);
    const customAttributes = customOrderOptions
      ? getCustomAttributes(customOrderOptions)
      : undefined;
    setLoading(true);
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
        // NOTE:
        // customAttributesを追加
        customAttributes,
      });
      openSidebar();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return {
    addToCart,
    loading,
  };
};
