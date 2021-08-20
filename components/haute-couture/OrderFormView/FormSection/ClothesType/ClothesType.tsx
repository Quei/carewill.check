import cn from 'classnames';
import s from './ClothesType.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '@components/ui';
import { Checkbox } from '@components/ui/react-hook-form';
import { SVG01, SVG02, SVG03, SVG04 } from './svg';
import type { VFC } from 'react';
import { useFormState } from 'react-hook-form';
import type { Lang } from 'types/site';
import type { InputType, CheckboxesInput } from '../../data';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

type Props = {
  className?: string;
  localeLang: Lang;
  inputs: InputType[];
  onFocus?: () => void;
  onChange?: () => void;
};

const SVGComponents = [SVG01, SVG02, SVG03, SVG04];

const ClothesType: VFC<Props> = ({
  className,
  localeLang,
  inputs,
  onFocus,
  onChange,
}) => {
  const radio = inputs[0] as CheckboxesInput;
  const { errors } = useFormState<HauteCoutureInputs>();

  if (!radio) {
    return null;
  }
  return (
    <div className={cn(className)}>
      <div className={cn(s.checkboxes)}>
        {radio.values.map((value, index) => {
          const SVG = SVGComponents[index];
          return (
            <Checkbox
              className={cn(s.checkbox)}
              key={`${radio.name}-${index}`}
              name={radio.name}
              required={radio.required}
              value={value[localeLang]}
              type={radio.type}
              image={<SVG />}
              onFocus={onFocus}
              onChange={onChange}
            >
              {value[localeLang]}
            </Checkbox>
          );
        })}
      </div>
      {errors?.[radio.name] && (
        <ErrorText className="mt-3">
          <ErrorMessage errors={errors} name={radio.name} />
        </ErrorText>
      )}
    </div>
  );
};

export default ClothesType;
