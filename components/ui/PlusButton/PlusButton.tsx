import cn from 'classnames';
import s from './PlusButton.module.css';
import type { VFC } from 'react';

type Props = {
  className?: string;
  targetId?: string;
  hasPressed: boolean;
  onClick: () => void;
  isThin?: boolean;
};

const PlusButton: VFC<Props> = ({
  className,
  targetId,
  hasPressed,
  onClick,
  isThin,
}) => {
  return (
    <button
      className={cn(className)}
      onClick={onClick}
      aria-pressed={hasPressed}
      aria-expanded={hasPressed}
      aria-controls={targetId}
    >
      <div
        className={cn(
          s.plus,
          { [s.isThin]: isThin },
          { [s.hasPressed]: hasPressed }
        )}
      />
    </button>
  );
};

export default PlusButton;
