import cn from 'classnames';
import s from './DefaultImage.module.css';
import { CrossBlock } from '@components/icons';
import type { VFC } from 'react';

type Props = {
  className?: string;
  strokeWidth?: 1;
};

const DefaultImage: VFC<Props> = ({ className, strokeWidth }) => {
  return (
    <div
      className={cn(s.root, className, {
        [s.borderThin]: strokeWidth === 1,
      })}
    >
      <CrossBlock strokeWidth={strokeWidth} />
    </div>
  );
};

export default DefaultImage;
