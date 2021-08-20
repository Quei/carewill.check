import { useState, useEffect } from 'react';
import cn from 'classnames';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '@components/ui';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { Input } from '@components/ui/react-hook-form';
import type { VFC } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';
import type { Lang } from 'types/site';
import type { InputType, TextInput } from '../../data';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

type Props = {
  className?: string;
  localeLang: Lang;
  inputs: InputType[];
  hasRequired: boolean;
  setHasRequired: Dispatch<SetStateAction<boolean>>;
  onFocus?: () => void;
};

const useEffectCheckRequired = (setHasRequired: Props['setHasRequired']) => {
  const f = useIntlMessage();
  const { watch } = useFormContext<HauteCoutureInputs>();
  const clothesTypeRadioValue = watch('clothes_type_radio');
  useEffect(() => {
    if (clothesTypeRadioValue === f('form.other')) {
      setHasRequired(true);
    } else {
      setHasRequired(false);
    }
  }, [clothesTypeRadioValue, setHasRequired, f]);
};

const ClothesTypeOther: VFC<Props> = ({
  className,
  localeLang,
  inputs,
  hasRequired,
  setHasRequired,
  onFocus,
}) => {
  const text = inputs[0] as TextInput;
  const { errors } = useFormState<HauteCoutureInputs>();
  useEffectCheckRequired(setHasRequired);

  if (!text) {
    return null;
  }
  return (
    <div className={cn(className)}>
      <Input
        name={text.name}
        type={text.type}
        placeholder={text?.placeholder?.[localeLang]}
        required={hasRequired}
        onFocus={onFocus}
      />
      {errors?.[text.name] && hasRequired && (
        <ErrorText className="mt-3">
          <ErrorMessage errors={errors} name={text.name} />
        </ErrorText>
      )}
    </div>
  );
};

export default ClothesTypeOther;
