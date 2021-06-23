import React, { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { Checkbox } from '@components/ui';
import type { FC, ChangeEventHandler, ChangeEvent } from 'react';
import type { Maybe, CheckboxesWithImagesImageFragment } from 'types/schema';
import type { UseFormRegister } from 'react-hook-form';

type Props = {
  images: Maybe<CheckboxesWithImagesImageFragment>[];
  options: Maybe<string>[];
  optionName: string;
  register?: UseFormRegister<any>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const checkboxesWithImagesImageFragment = /* GraphQL */ `
  fragment checkboxesWithImagesImage on Asset {
    sys {
      id
    }
    url
    title
  }
`;

const CheckboxesWithImages: FC<Props> = ({
  images,
  options,
  optionName,
  register,
  onChange,
}) => {
  const [current, setCurrent] = useState(0);
  const nonNullableImages = useMemo(() => images.filter(nonNullableFilter), [
    images,
  ]);
  const nonNullableOptions = useMemo(() => options.filter(nonNullableFilter), [
    options,
  ]);

  const handleClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      console.log('change');
      setCurrent(index);
      onChange && onChange(event);
    },
    [onChange]
  );

  if (nonNullableImages.length !== nonNullableOptions.length) {
    console.error('images length and options length are not equal');
    return null;
  }

  const ids = nonNullableImages.map((image) => image?.sys.id);

  return (
    <div>
      <div>
        {nonNullableImages.map((image, index) => (
          <div
            key={`image-${ids[index]}`}
            className={current !== index ? 'sr-only' : ''}
          >
            <Image
              width={400}
              height={300}
              src={image?.url ?? ''}
              alt={image?.title ?? ''}
            />
          </div>
        ))}
      </div>
      <div>
        {nonNullableOptions.map((option, index) => (
          <Checkbox
            key={`checkbox-${ids[index]}`}
            type="radio"
            id={`${optionName}-option-${index}`}
            value={option}
            label={option}
            name={optionName}
            register={register}
            onChange={(event) => handleClick(event, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxesWithImages;
