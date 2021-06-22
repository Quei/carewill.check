import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import useCart from './use-cart';
import {
  checkoutLineItemCustomOrderRemoveDiscountCodeMutation,
  getCheckoutId,
  checkoutToCart,
} from '../utils';
import { useMutationHook } from '@commerce/utils/use-hook';
import { mutationFetcher } from '@commerce/utils/default-fetcher';
import type {
  Mutation,
  MutationCheckoutDiscountCodeRemoveArgs,
} from '../schema';
import type { CustomOrderRemoveDiscountCodeHook } from '../types/cart';
import type { HookFetcherFn, MutationHook } from '@commerce/utils/types';

type UseCustomOrderRemoveDiscountCode<
  H extends MutationHook<
    CustomOrderRemoveDiscountCodeHook<any>
  > = MutationHook<CustomOrderRemoveDiscountCodeHook>
> = ReturnType<H['useHook']>;

const handler: MutationHook<CustomOrderRemoveDiscountCodeHook> = {
  fetchOptions: {
    query: checkoutLineItemCustomOrderRemoveDiscountCodeMutation,
  },
  async fetcher({ input, options, fetch }) {
    const { checkoutDiscountCodeRemove } = await fetch<
      Mutation,
      MutationCheckoutDiscountCodeRemoveArgs
    >({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
      },
    });

    return checkoutToCart(checkoutDiscountCodeRemove);
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCart();

    return useCallback(
      debounce(async function addItem() {
        const data = await fetch();
        await mutate(data, false);
        return data;
      }, 500),
      [fetch, mutate]
    );
  },
};

const fetcher: HookFetcherFn<CustomOrderRemoveDiscountCodeHook> = mutationFetcher;

const useCustomOrderRemoveDiscountCode: UseCustomOrderRemoveDiscountCode = (
  ...args
) => {
  return useMutationHook({ fetcher, ...handler })(...args);
};

export default useCustomOrderRemoveDiscountCode;
