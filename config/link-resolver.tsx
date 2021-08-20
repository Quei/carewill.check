import { Link } from '@components/ui';
import type { FC, ReactNode } from 'react';

type Props = {
  __typename: string;
  slug: string;
  children: ReactNode;
};
export const LinkResolver: FC<Props> = ({ __typename, slug, children }) => {
  if (__typename === 'HauteCouture' || __typename === 'CustomOrder') {
    return <Link href={`/${slug}`}>{children}</Link>;
  } else if (__typename === 'Product') {
    return <Link href={`/product/${slug}`}>{children}</Link>;
  }
  return <Link href={`/${slug}`}>{children}</Link>;
};
