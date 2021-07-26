import cn from 'classnames';
import s from './Grid.module.css';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  layout?: 'normal' | 'col-3';
  hasBorder?: boolean;
  isSlide?: boolean;
  children?: ReactNode;
};

const Grid: FC<Props> = ({
  className,
  layout = 'normal',
  hasBorder = true,
  isSlide = false,
  children,
}) => {
  const rootClassName = cn(s.root, { [s.isSlide]: isSlide }, className);
  const gridClassName = cn(s.gridWrapper, {
    [s.layoutNormal]: layout === 'normal',
    [s.layoutCol3]: layout === 'col-3',
    [s.hasBorder]: hasBorder,
    [s.isSlide]: isSlide,
  });
  return (
    <div className={rootClassName}>
      <div className={gridClassName}>{children}</div>
    </div>
  );
};

export default Grid;
