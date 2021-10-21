import { useCallback } from 'react';
import cn from 'classnames';
import s from './ProductOption.module.css';
import { Color } from './Color';
import { Size } from './Size';
import type { VFC, Dispatch, SetStateAction } from 'react';
import type { SelectedOptions } from '@lib/hooks/useAddToCart';
import type {
  ProductOption,
  ProductOptionValues,
} from '@framework/types/product';
import type { Repeater } from 'types/site';

type Props = ProductOption & {
  className?: string;
  choices: SelectedOptions;
  setChoices: Dispatch<SetStateAction<SelectedOptions>>;
  color?: Repeater[];
};

const Option: VFC<Props> = ({
  className,
  id,
  displayName,
  values,
  choices,
  setChoices,
  color,
}) => {
  const displayNameLowerCase = displayName.toLowerCase();
  const onClick = useCallback(
    (value: ProductOptionValues) => {
      setChoices((choices) => {
        return {
          ...choices,
          [displayNameLowerCase]: value.label.toLowerCase(),
        };
      });
    },
    [displayNameLowerCase, setChoices]
  );
  return (
    <div className={cn(className)}>
      <div key={displayName}>
        <h2 className={cn('capitalize', 'font-medium')}>
          {displayName} : {choices[displayNameLowerCase]}
        </h2>
        <div className={cn('mt-1')}>
          {displayNameLowerCase === 'color' && (
            <Color
              id={id}
              values={values}
              active={choices[displayNameLowerCase]}
              onClick={onClick}
              color={color}
            />
          )}
          {displayNameLowerCase === 'size' && (
            <Size
              id={id}
              values={values}
              active={choices[displayNameLowerCase]}
              onClick={onClick}
            />
          )}
          {/* {values.map((value, i: number) => {
            const active = choices[displayNameLowerCase];
            return (
              <Swatch
                key={`${id}-${i}`}
                active={value.label.toLowerCase() === active}
                variant={displayNameLowerCase}
                color={value.hexColors ? value.hexColors[0] : ''}
                label={value.label}
                onClick={() => onClick(value)}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Option;
