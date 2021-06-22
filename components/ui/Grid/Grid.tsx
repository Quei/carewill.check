import cn from 'classnames';
import { FC, ReactNode, Component } from 'react';
import s from './Grid.module.css';

interface Props {
  className?: string;
  children?: ReactNode[] | Component[] | any[];
  layout?: 'normal';
}

const Grid: FC<Props> = ({ className, layout = 'normal', children }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.layoutNormal]: layout === 'normal',
    },
    className
  );
  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
