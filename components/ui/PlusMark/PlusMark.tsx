import cn from 'classnames';
import s from './PlusMark.module.css';
import type { VFC } from 'react';

type Props = {
  className?: string;
  hasPressed: boolean;
};

const PlusMark: VFC<Props> = ({ className, hasPressed }) => {
  return (
    <div className={cn(className)}>
      <div
        className={cn('relative', s.plus, {
          [s.hasPressed]: hasPressed,
        })}
      />
    </div>
  );
};

export default PlusMark;
