import cn from 'classnames';
import s from './Quantity.module.css';
import { Plus, Minus } from '@components/icons';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type { VFC } from 'react';

type Props = {
  className?: string;
  quantity: number;
  addQuantity: () => void;
  subtractQuantity: () => void;
};

const Quantity: VFC<Props> = ({
  className,
  quantity,
  addQuantity,
  subtractQuantity,
}) => {
  const f = useIntlMessage();
  return (
    <div className={cn(className)}>
      <h2>{f('store.quantity')} :</h2>
      <div className={cn('flex', 'justify-between', 'mt-1', s.row)}>
        <button
          className={s.button}
          onClick={subtractQuantity}
          aria-label="minus"
        >
          <span>
            <Minus />
          </span>
        </button>
        <div>
          <span>{quantity}</span>
        </div>
        <button className={s.button} onClick={addQuantity} aria-label="plus">
          <span>
            <Plus />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Quantity;
