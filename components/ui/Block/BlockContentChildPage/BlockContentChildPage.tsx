import cn from 'classnames';
import s from './BlockContentChildPage.module.css';
import { Container } from '@components/ui';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

const BlockContentChildPage: FC<Props> = ({ className, children }) => {
  return (
    <div className={cn('py-24', className)}>
      <Container>{children}</Container>
    </div>
  );
};

export default BlockContentChildPage;
