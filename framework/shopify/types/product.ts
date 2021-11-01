import * as Core from '@commerce/types/product';
export * from '@commerce/types/product';

export type ProductImage = Core.ProductImage & {
  id?: string;
};

export type Product = Core.Product & {
  images: ProductImage[];
};
