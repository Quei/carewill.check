import Image from 'next/image';
import cn from 'classnames';
import s from './Checkboxes.module.css';
import { Checkbox } from '@components/ui';
import type { VFC } from 'react';
import type { CheckboxesInput } from '../data';

type Props = CheckboxesInput & {
  className?: string;
  localeLang: 'ja' | 'en';
  isRadio?: boolean;
  // isWithImages?: boolean;
  // colNumber?: 3 | 4;
};

const Checkboxes: VFC<Props> = ({
  className,
  localeLang,
  isRadio = true,
  // isWithImages = false,
  // colNumber,
  name,
  columnNumber,
  values,
}) => {
  return (
    <div className={cn(s.root, className)}>
      {values.map((value, index) => {
        const currentValue = value[localeLang];
        if (!currentValue) return null;
        return (
          <div key={`${name}-${index}`}>
            <Checkbox
              className={cn(s.checkbox)}
              type={isRadio ? 'radio' : 'checkbox'}
              name={name}
              value={currentValue}
            >
              {value.image && (
                <>
                  <span className={cn(s.imageIndex)} aria-hidden={true} />
                  <div className={cn(s.imageWrapper)}>
                    <Image
                      src={value.image.path}
                      width={value.image.width}
                      height={value.image.height}
                      aria-hidden={true}
                      alt=""
                    />
                    <p className={cn(s.imageValue)}>{currentValue}</p>
                  </div>
                </>
              )}
              {!value.image && <span>{currentValue}</span>}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
};

export default Checkboxes;
