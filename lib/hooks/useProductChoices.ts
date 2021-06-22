import type { Product } from '@commerce/types/product';
import { useState, useEffect } from 'react';
type SelectedOptions = Record<string, string | null>;

export const useProductChoices = ({ product }: { product: Product }) => {
  const [productChoices, setProductChoices] = useState<SelectedOptions>({});

  useEffect(() => {
    // Selects the default option
    product.variants[0].options?.forEach((v) => {
      setProductChoices((choices) => ({
        ...choices,
        [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
      }));
    });
  }, []);

  return { productChoices, setProductChoices };
};
