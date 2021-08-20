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
    <div className={cn(s.root, className)}>
      <TitleTag className={cn(s.title)}>{title}</TitleTag>
      {children && (
        <Container className={cn(s.description)}>{children}</Container>
      )}
    </div>
  );
};

export default PageHeader;
