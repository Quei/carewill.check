import * as Core from '@commerce/types/cart';
import type { CheckoutLineItem } from '../schema';

export * from '@commerce/types/cart';

export type ShopifyCart = {};

/**
 * Extend core cart types
 */

export type Cart = Core.Cart & {
  lineItems: Core.LineItem[];
  url?: string;
};

type ShopifyCartItemBody = Core.CartItemBody & {
  customAttributes?: CheckoutLineItem['customAttributes'];
};

export type CartTypes = Core.CartTypes & {
  itemBody: ShopifyCartItemBody;
};

export type CartHooks = Core.CartHooks<CartTypes>;

export type GetCartHook = CartHooks['getCart'];
export type AddItemHook = CartHooks['addItem'];
export type UpdateItemHook = CartHooks['updateItem'];
export type RemoveItemHook = CartHooks['removeItem'];
// NOTE:
// custom
export type CustomOrderAddDiscountCodeHook<T extends CartTypes = CartTypes> = {
  data: T['cart'];
  input: {};
  fetcherInput: { quantity: number };
  body: { item: T['itemBody'] };
  actionInput: { quantity: number };
};
export type CustomOrderRemoveDiscountCodeHook<
  T extends CartTypes = CartTypes
> = {
  data: T['cart'];
  input: {};
  fetcherInput: {};
  body: { item: T['itemBody'] };
  actionInput: {};
};

export type CartSchema = Core.CartSchema<CartTypes>;

export type CartHandlers = Core.CartHandlers<CartTypes>;

export type GetCartHandler = CartHandlers['getCart'];
export type AddItemHandler = CartHandlers['addItem'];
export type UpdateItemHandler = CartHandlers['updateItem'];
export type RemoveItemHandler = CartHandlers['removeItem'];
