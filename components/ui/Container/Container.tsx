import cn from 'classnames';
import s from './Container.module.css';
import type { FC } from 'react';

interface Props {
  className?: string;
  children?: any;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={cn(s.root, className)}>{children}</div>;
};

export default Container;
