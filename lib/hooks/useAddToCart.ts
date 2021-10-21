import { useState } from 'react';
import { useAddItem } from '@framework/cart';
import { useUI } from '@components/ui';
import type { Product } from '@commerce/types/product';

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

export const useAddToCart = () => {
  const addItem = useAddItem();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const addToCart = async ({
    product,
    choices,
    customAttributes,
  }: {
    product: Product;
    choices: SelectedOptions;
    customAttributes?: { key: string; value?: string }[];
  }) => {
    const variant = getVariant(product, choices);
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
