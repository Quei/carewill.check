import cn from 'classnames';
import s from './ItemName.module.css';
import { Link } from '@components/ui';
import { ArrowLink } from '@components/icons';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  description?: string | null;
  children?: ReactNode;
};

const ItemName: FC<Props> = ({ className, description, children }) => {
  const hasLink =
    description?.startsWith('/') || description?.startsWith('http');
  return (
    <p
      className={cn(
        'border',
        'border-green',
        'text-xl',
        'leading-none',
        'md:text-2xl',
        'md:leading-none',
        className
      )}
    >
      {description && hasLink && (
        <Link href={description} className={cn(s.text, s.link)}>
          <ArrowLink className={cn(s.arrowLink)} />
          <span>{children}</span>
        </Link>
      )}
      {(!description || !hasLink) && (
        <span className={cn(s.text)}>{children}</span>
      )}
    </p>
  );
};

export default ItemName;
