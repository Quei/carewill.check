import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import CartItem from '../CartItem';
import s from './CartSidebarView.module.css';
import { Button } from '@components/ui';
import { UserNav } from '@components/common';
import { useUI } from '@components/ui/context';
import { Bag, Cross, Check } from '@components/icons';
import usePrice from '@framework/product/use-price';
import useCart from '@framework/cart/use-cart';
import useCustomOrderAddDiscountCode from '@framework/cart/use-custom-order-add-discount-code';
import useCustomOrderRemoveDiscountCode from '@framework/cart/use-custom-order-remove-discount-code';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';

type UseCartReturnType = ReturnType<typeof useCart>;
const useCustomOrderDiscountCode = (data: UseCartReturnType['data']) => {
  const customOrderAddDiscountCode = useCustomOrderAddDiscountCode();
  const customOrderRemoveDiscountCode = useCustomOrderRemoveDiscountCode();
  const customOrderLineItems = data?.lineItems.filter(
    (item) => item.path === 'custom-order'
  );
  const customOrdersQuantity = customOrderLineItems?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  useEffect(() => {
    if (customOrdersQuantity && customOrdersQuantity >= 3) {
      customOrderAddDiscountCode({ quantity: customOrdersQuantity });
    } else {
      customOrderRemoveDiscountCode();
    }
  }, [
    customOrdersQuantity,
    customOrderAddDiscountCode,
    customOrderRemoveDiscountCode,
  ]);
};

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI();
  const { data, isLoading, isEmpty } = useCart();

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  );
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  );

  const handleClose = () => closeSidebar();
  useCustomOrderDiscountCode(data);

  const f = useIntlMessage();

  const error = null;
  const success = null;

  return (
    <div
      className={cn(s.root, {
        [s.empty]: error || success || isLoading || isEmpty,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <button
          onClick={handleClose}
          aria-label="Close panel"
          className="absolute z-10 top-2 right-2"
        >
          <Cross className="h-12 w-12" />
        </button>
      </header>

      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            {f('store.cartEmpty')}
          </h2>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="flex-1">
            {/* <Link href="/cart"> */}
            <h2
              className="pt-1 pb-4 px-4 sm:px-6 text-2xl leading-7 font-bold tracking-wide cursor-pointer inline-block"
              onClick={handleClose}
            >
              My Cart
            </h2>
            {/* </Link> */}
            <ul className="py-6 px-4 sm:px-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-current">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 pt-5 pb-20 md:py-5">
            <div className="border-t border-current px-4 sm:px-6">
              <ul className="py-3">
                {/* <li className="flex justify-between py-1">
                  <span>{f('store.subTotal')}</span>
                  <span>{subTotal}</span>
                </li> */}
                <li className="flex justify-between py-1">
                  <span>{f('store.total')}</span>
                  <span>{total}</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center my-6">
              <Button className={cn(s.button)} href="/checkout" Component="a">
                {f('store.proceedToCheckout')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebarView;
