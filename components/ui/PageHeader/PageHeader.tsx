import cn from 'classnames';
import s from './PageHeader.module.css';
import { Container } from '@components/ui';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  title: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'p';
  children?: ReactNode;
};

const PageHeader: FC<Props> = ({
  className,
  title,
  titleTag: TitleTag = 'h1',
  children,
}) => {
  return (
    <div
      className={cn(
        'px-site-vertical',
        'md:px-site-vertical-md',
        s.root,
        className
      )}
    >
      <TitleTag className={cn('text-center', 'text-3xl', 'leading-none')}>
        {title}
      </TitleTag>
      {children && (
        <Container className={cn(s.description)}>{children}</Container>
      )}
    </div>
  );
};

export default PageHeader;
