import cn from 'classnames';
import s from './OnelineLink.module.css';
import { Block } from '@components/ui';
import type { FC, ReactNode } from 'react';
import type { Props as BlockProps } from '@components/ui/Block';

type Props = Pick<BlockProps, 'href' | 'site'> & {
  className?: string;
  children?: ReactNode;
};

const OnelineLink: FC<Props> = ({ className, href, site, children }) => {
  return (
    <Block
      className={cn('text-2xl', s.root, className)}
      href={href}
      site={site}
      isCentering={true}
    >
      {children}
    </Block>
  );
};

export default OnelineLink;
