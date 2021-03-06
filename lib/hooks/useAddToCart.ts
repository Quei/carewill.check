import { useState } from 'react';
import { useAddItem } from '@framework/cart';
import { useUI } from '@components/ui';
import type { Product, ProductVariant } from '@commerce/types/product';

export type SelectedOptions = Record<string, string | null>;

type ShopifyProductVariant = ProductVariant & {
  price: number;
  image?: {
    id: string;
  };
};

export const getVariant = (product: Product, opts: SelectedOptions) => {
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
  return variant as ShopifyProductVariant;
};

export const useAddToCart = () => {
  const addItem = useAddItem();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const addToCart = async ({
    product,
    choices,
    quantity,
    customAttributes,
  }: {
    product: Product;
    choices: SelectedOptions;
    quantity?: number;
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
        quantity,
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
