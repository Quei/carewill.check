import cn from 'classnames';
import s from './MenuButton.module.css';
import type { VFC } from 'react';

type Props = {
  className?: string;
  hasPressed: boolean;
  targetId: string;
  onClick: () => void;
};

const MenuButton: VFC<Props> = ({
  className,
  hasPressed,
  targetId,
  onClick,
}) => {
  return (
    <button
      className={cn(
        'relative',
        'flex',
        'items-center',
        'border-none',
        s.root,
        className
      )}
      aria-pressed={hasPressed}
      aria-expanded={hasPressed}
      aria-controls={targetId}
      onClick={onClick}
    >
      <span className="sr-only">menu</span>
      <i />
      <i />
      <i />
    </button>
  );
};

export default MenuButton;
