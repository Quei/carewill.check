import cn from 'classnames';
import s from './Color.module.css';
import { Swatch } from '../Swatch';
import type { VFC } from 'react';
import type { ProductOptionValues } from '@framework/types/product';
import type { Repeater } from 'types/site';

type Props = {
  className?: string;
  id: string;
  values: ProductOptionValues[];
  active?: string | null;
  onClick: (value: ProductOptionValues) => void;
  color?: Repeater[];
};

const Color: VFC<Props> = ({
  className,
  id,
  values,
  active,
  onClick,
  color,
}) => {
  return (
    <div className={cn('flex', 'flex-row', s.root, className)}>
      {values.map((value, i: number) => {
        const customColor = color?.find(
          (item) => item.key.toLowerCase() === value.label.toLowerCase()
        )?.value;
        return (
          <Swatch
            key={`${id}-${i}`}
            active={value.label.toLowerCase() === active}
            variant={'color'}
            color={
              customColor && customColor.startsWith('#')
                ? customColor
                : value.hexColors
                ? value.hexColors[0]
                : ''
            }
            label={value.label}
            onClick={() => onClick(value)}
          />
        );
      })}
    </div>
  );
};

export default Color;
