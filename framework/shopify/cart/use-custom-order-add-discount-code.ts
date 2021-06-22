import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { CommerceError } from '@commerce/utils/errors';
import useCart from './use-cart';
import {
  checkoutLineItemCustomOrderAddDiscountCodeMutation,
  getCheckoutId,
  checkoutToCart,
} from '../utils';
import { useMutationHook } from '@commerce/utils/use-hook';
import { mutationFetcher } from '@commerce/utils/default-fetcher';
import type {
  Mutation,
  MutationCheckoutDiscountCodeApplyV2Args,
} from '../schema';
import type { CustomOrderAddDiscountCodeHook } from '../types/cart';
import type { HookFetcherFn, MutationHook } from '@commerce/utils/types';

const DISCOUNT_CODE_3 = 'custom_order_quantity_3';
const DISCOUNT_CODE_4 = 'custom_order_quantity_4';
const DISCOUNT_CODE_5 = 'custom_order_quantity_5';

type UseCustomOrderAddDiscountCode<
  H extends MutationHook<
    CustomOrderAddDiscountCodeHook<any>
  > = MutationHook<CustomOrderAddDiscountCodeHook>
> = ReturnType<H['useHook']>;

const handler: MutationHook<CustomOrderAddDiscountCodeHook> = {
  fetchOptions: {
    query: checkoutLineItemCustomOrderAddDiscountCodeMutation,
  },
  async fetcher({ input: { quantity }, options, fetch }) {
    if (quantity && (!Number.isInteger(quantity) || quantity! < 1)) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      });
    }

    let discountCode = DISCOUNT_CODE_3;
    if (quantity) {
      if (quantity === 4) {
        discountCode = DISCOUNT_CODE_4;
      } else if (quantity >= 5) {
        discountCode = DISCOUNT_CODE_5;
      }
    } else {
      return;
    }

    const { checkoutDiscountCodeApplyV2 } = await fetch<
      Mutation,
      MutationCheckoutDiscountCodeApplyV2Args
    >({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        discountCode,
      },
    });

    return checkoutToCart(checkoutDiscountCodeApplyV2);
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCart();

    return useCallback(
      debounce(async (input) => {
        const data = await fetch({ input: { quantity: input.quantity } });
        await mutate(data, false);
        return data;
      }, 500),
      [fetch, mutate]
    );
  },
};

const fetcher: HookFetcherFn<CustomOrderAddDiscountCodeHook> = mutationFetcher;

const useCustomOrderAddDiscountCode: UseCustomOrderAddDiscountCode = (
  ...args
) => {
  return useMutationHook({ fetcher, ...handler })(...args);
};

export default useCustomOrderAddDiscountCode;
