import { memo } from 'react';
import cn from 'classnames';
import s from './Control.module.css';
import { ArrowLeft, ArrowRight } from '@components/icons';
import type { VFC, MouseEventHandler } from 'react';

type Props = {
  className?: string;
  onPrev: MouseEventHandler<HTMLButtonElement>;
  onNext: MouseEventHandler<HTMLButtonElement>;
};

const Control: VFC<Props> = ({ className, onPrev, onNext }) => (
  <div className={cn(className)}>
    <button
      className={cn(s.leftControl)}
      onClick={onPrev}
      aria-label="Previous Product Image"
    >
      <ArrowLeft />
    </button>
    <button
      className={cn(s.rightControl)}
      onClick={onNext}
      aria-label="Next Product Image"
    >
      <ArrowRight />
    </button>
  </div>
);

export default memo(Control);
