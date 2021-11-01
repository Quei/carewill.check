import cn from 'classnames';
import s from './Size.module.css';
import { Swatch } from '../Swatch';
import type { VFC } from 'react';
import type { ProductOptionValues } from '@framework/types/product';

type Props = {
  className?: string;
  id: string;
  values: ProductOptionValues[];
  active?: string | null;
  onClick: (value: ProductOptionValues) => void;
};

const Size: VFC<Props> = ({ className, id, values, active, onClick }) => {
  return (
    <div className={cn('flex', 'flex-row', 'justify-between', className)}>
      {values.map((value, i: number) => {
        return (
          <Swatch
            key={`${id}-${i}`}
            active={value.label.toLowerCase() === active}
            variant={'size'}
            label={value.label}
            onClick={() => onClick(value)}
          />
        );
      })}
    </div>
  );
};

export default Size;
