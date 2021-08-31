import { useMemo } from 'react';
import { useFormState } from 'react-hook-form';
import cn from 'classnames';
import s from './PulloverOfExtraSpace.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '@components/ui';
import { Body } from '../Body';
import { BodyWrapper } from './BodyWrapper';
import { bodyCirclePositionData } from './bodyCirclePositionData';
import type { VFC } from 'react';
import type { Lang } from 'types/site';
import type { CheckboxesInput, InputType } from '../../data';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

type Props = {
  className?: string;
  localeLang: Lang;
  inputs: InputType[];
  onFocus?: () => void;
};

const PulloverOfExtraSpace: VFC<Props> = ({
  className,
  localeLang,
  inputs,
  onFocus,
}) => {
  const checkboxes = inputs[0] as CheckboxesInput;
  const bodyCircles = useMemo(() => {
    return checkboxes.values.map((value, index) => {
      return { value, ...bodyCirclePositionData[index] };
    });
  }, [checkboxes]);

  const { errors } = useFormState<HauteCoutureInputs>();

  const description = checkboxes.description?.[localeLang];

  return (
    <div className={cn(className)}>
      {description && (
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      )}
      <Body
        wrapper={BodyWrapper}
        className={cn('mx-auto', 'mt-5', 'md:mt-10', s.body)}
        bodyCircles={bodyCircles}
        localeLang={localeLang}
        name={checkboxes.name}
        values={checkboxes.values}
        required={checkboxes.required}
        hasOther={false}
        onClick={onFocus}
      />
      {errors?.[checkboxes.name] && (
        <ErrorText className="mt-3">
          <ErrorMessage errors={errors} name={checkboxes.name} />
        </ErrorText>
      )}
    </div>
  );
};

export default PulloverOfExtraSpace;
