import { useState, useCallback, Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import s from './Body.module.css';
import { Checkbox } from '@components/ui/react-hook-form';
import type { FC, VFC, SVGAttributes, ReactNode } from 'react';
import type { Lang } from 'types/site';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';
import type { CheckboxValue } from '../../data';

type BasePosition = {
  text: string;
  isActiveColorWhite?: boolean;
  value?: CheckboxValue;
};
export type PerfectCirclePosition = BasePosition & {
  figure: {
    type: 'circle';
    cx: string;
    cy: string;
    r: string;
  }[];
};

export type EllipsePosition = BasePosition & {
  figure: {
    type: 'ellipse';
    cx: string;
    cy: string;
    rx: string;
    ry: string;
    transform: string;
  }[];
};

export type PathPosition = BasePosition & {
  figure: {
    type: 'path';
    d: string;
  }[];
};

type Props = {
  className?: string;
  wrapper: FC<SVGAttributes<SVGAElement> & { children: ReactNode }>;
  bodyCircles: (PerfectCirclePosition | EllipsePosition | PathPosition)[];
  localeLang: Lang;
  name: keyof HauteCoutureInputs;
  values: CheckboxValue[];
  required?: boolean;
  onClick?: () => void;
  hasOther?: boolean;
};

const Body: VFC<Props> = ({
  className,
  wrapper: SVGWrapper,
  bodyCircles,
  localeLang,
  name,
  values,
  required,
  onClick,
  hasOther = false,
}) => {
  const {
    getValues,
    setValue,
    formState: { isSubmitted },
  } = useFormContext<HauteCoutureInputs>();
  // NOTE:
  // react-hook-formのsetValueではre-renderは起こらないため、
  // re-renderさせるために、stateを持つ必要がある。
  const [currentValues, setCurrentValues] = useState<string[] | null>();

  const handleOnClickCircle = useCallback(
    (index: number) => {
      const target = values?.[index]?.[localeLang];
      if (!target) {
        return;
      }

      const formValues = getValues(name);
      const formValueSet = Array.isArray(formValues)
        ? new Set<string>(formValues)
        : new Set<string>();
      if (formValueSet.has(target)) {
        formValueSet.delete(target);
      } else {
        formValueSet.add(target);
      }
      const formValueArray = Array.from(formValueSet);
      const valueArray = formValueArray.length ? formValueArray : null;
      setValue(name, valueArray, {
        shouldValidate: isSubmitted ? true : false,
        shouldDirty: true,
        shouldTouch: true,
      });
      setCurrentValues(valueArray);
      if (onClick) {
        onClick();
      }
    },
    [localeLang, values, name, isSubmitted, getValues, setValue, onClick]
  );
  return (
    <div className={cn(className)}>
      <SVGWrapper className={cn(s.svg)}>
        {bodyCircles.map((circle, index) => {
          const langValue = circle.value?.[localeLang];
          if (!langValue) {
            return null;
          }
          const isActive = Array.isArray(currentValues)
            ? currentValues?.includes(langValue)
            : false;
          return (
            <g
              key={`body-circle-${index}`}
              className={cn(s.circle)}
              onClick={() => handleOnClickCircle(index)}
            >
              {circle.figure.map((figure, index) => (
                <Fragment key={`circle-${index}`}>
                  {figure.type === 'circle' && (
                    <circle
                      className={cn({ [s.isActive]: isActive })}
                      {...figure}
                    />
                  )}
                  {figure.type === 'ellipse' && (
                    <ellipse
                      className={cn({ [s.isActive]: isActive })}
                      {...figure}
                    />
                  )}
                  {figure.type === 'path' && (
                    <path
                      className={cn({ [s.isActive]: isActive })}
                      {...figure}
                    />
                  )}
                </Fragment>
              ))}
              <text
                className={cn({
                  [s.isActiveColorWhite]: circle.isActiveColorWhite && isActive,
                })}
                transform={circle.text}
              >
                {langValue}
              </text>
            </g>
          );
        })}
      </SVGWrapper>
      <div className="sr-only">
        {values.map((value, index) => {
          const langValue = value[localeLang];
          return (
            <Checkbox
              key={`${name}-${index}`}
              name={name}
              required={required}
              value={langValue}
              type={'checkbox'}
            >
              {langValue}
            </Checkbox>
          );
        })}
        {hasOther && (
          <Checkbox
            name={name}
            required={required}
            value={'other'}
            type={'checkbox'}
          >
            other
          </Checkbox>
        )}
      </div>
    </div>
  );
};

export default Body;
