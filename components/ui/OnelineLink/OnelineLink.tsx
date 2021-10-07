import cn from 'classnames';
import s from './OnelineLink.module.css';
import { Link } from '@components/ui';
import type { FC, ReactNode } from 'react';
import type { Props as BlockProps } from '@components/ui/Block';

type Props = Pick<BlockProps, 'href' | 'site'> & {
  className?: string;
  isSmall?: boolean;
  children?: ReactNode;
};

const OnelineLink: FC<Props> = ({
  className,
  isSmall,
  href,
  site,
  children,
}) => {
  return (
    <Link
      className={cn(
        'text-2xl',
        'text-center',
        'block',
        'hover:bg-green',
        'hover:text-white',
        { 'py-8 md:py-20': !isSmall },
        { 'py-5 md:py-8': isSmall },
        s.root,
        className
      )}
      href={href ?? ''}
      site={site}
    >
      {children}
    </Link>
  );
};

export default OnelineLink;
