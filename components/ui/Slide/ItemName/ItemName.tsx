import cn from 'classnames';
import s from './ItemName.module.css';
import { Link } from '@components/ui';
import { ArrowLink } from '@components/icons';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  description?: string | null;
  children?: ReactNode;
  onClick?: () => void;
};

const ItemName: FC<Props> = ({ className, description, children, onClick }) => {
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
        <Link
          href={description}
          className={cn(s.text, s.link)}
          onClick={onClick}
        >
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
