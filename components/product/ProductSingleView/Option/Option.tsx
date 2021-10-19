import cn from 'classnames';
import s from './ProductOption.module.css';
import { Swatch } from '../Swatch';
import type { VFC, Dispatch, SetStateAction } from 'react';
import type { SelectedOptions } from '@lib/hooks/useAddToCart';
import type { ProductOption } from '@framework/types/product';

type Props = ProductOption & {
  className?: string;
  choices: SelectedOptions;
  setChoices: Dispatch<SetStateAction<SelectedOptions>>;
};

const Option: VFC<Props> = ({
  className,
  id,
  displayName,
  values,
  choices,
  setChoices,
}) => {
  console.log(setChoices);
  return (
    <div className={cn(className)}>
      <div key={displayName}>
        <h2 className={cn('capitalize', 'font-medium')}>
          {displayName} : {choices[displayName]}
        </h2>
        <div className="flex flex-row py-4">
          {values.map((value, i: number) => {
            const active = (choices as any)[displayName.toLowerCase()];
            return (
              <Swatch
                key={`${id}-${i}`}
                active={value.label.toLowerCase() === active}
                variant={displayName}
                color={value.hexColors ? value.hexColors[0] : ''}
                label={value.label}
                onClick={() => {
                  setChoices((choices) => {
                    return {
                      ...choices,
                      [displayName.toLowerCase()]: value.label.toLowerCase(),
                    };
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Option;
