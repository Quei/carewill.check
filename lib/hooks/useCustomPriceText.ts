import { useMemo } from 'react';
import { useRouter } from 'next/router';

export const useCustomPriceText = (price: string) => {
  const { locale } = useRouter();
  return useMemo(() => {
    return locale === 'ja' ? `${price.replace('￥', '')}円` : price;
  }, [locale, price]);
};
