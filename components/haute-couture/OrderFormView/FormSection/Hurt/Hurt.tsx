import { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import s from './Hurt.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '@components/ui';
import { Input } from '@components/ui/react-hook-form';
import { Body } from '../Body';
import { BodyWrapper } from './BodyWrapper';
import { bodyCirclePositionData } from './bodyCirclePositionData';
import type { VFC } from 'react';
import type { Lang } from 'types/site';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';
import type { CheckboxesInput, InputType, TextInput } from '../../data';

type Props = {
  className?: string;
  localeLang: Lang;
  inputs: InputType[];
  onFocus?: () => void;
};

const Hurt: VFC<Props> = ({ className, localeLang, inputs, onFocus }) => {
  const checkboxes = inputs[0] as CheckboxesInput;
  const text = inputs[1] as TextInput;
  const bodyCircles = useMemo(() => {
    return checkboxes.values.map((value, index) => {
      return { value, ...bodyCirclePositionData[index] };
    });
  }, [checkboxes]);

  const {
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext<HauteCoutureInputs>();
  const watchOtherText = watch(text.name);

  useEffect(() => {
    // NOTE:
    // ここでwatchCheckboxesを使用すると、
    // 無限ループしてしまうので、getValues経由で取得する。
    const values = getValues(checkboxes.name);
    const valueSet = Array.isArray(values)
      ? new Set<string>(values)
      : new Set<string>();
    if (watchOtherText) {
      valueSet.add('other');
      setValue(checkboxes.name, Array.from(valueSet), {
        shouldValidate: isSubmitted ? true : false,
      });
    } else {
      if (valueSet.has('other')) {
        valueSet.delete('other');
        const valueArray = Array.from(valueSet);
        setValue(checkboxes.name, valueArray.length ? valueArray : null, {
          shouldValidate: isSubmitted ? true : false,
        });
      }
    }
  }, [checkboxes.name, watchOtherText, isSubmitted, getValues, setValue]);

  const description = checkboxes.description?.[localeLang];

  return (
    <div className={cn(s.root, className)}>
      {description && (
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      )}
      <Body
        wrapper={BodyWrapper}
        className={cn(s.body)}
        bodyCircles={bodyCircles}
        localeLang={localeLang}
        name={checkboxes.name}
        values={checkboxes.values}
        required={checkboxes.required}
        onClick={onFocus}
        hasOther={true}
      />
      <Input
        className={cn('mt-5', 'md:mt-10')}
        name={text.name}
        type={text.type}
        required={text.required}
        placeholder={text?.placeholder?.[localeLang]}
        onFocus={onFocus}
      />
      {errors?.[checkboxes.name] && (
        <ErrorText className="mt-3">
          <ErrorMessage errors={errors} name={checkboxes.name} />
        </ErrorText>
      )}
    </div>
  );
};

export default Hurt;
