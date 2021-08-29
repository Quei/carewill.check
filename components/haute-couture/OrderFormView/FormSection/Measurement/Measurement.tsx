import { useState, useEffect, useCallback } from 'react';
import { useFormState, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import s from './Measurement.module.css';
import { useMounted } from '@lib/hooks/useMounted';
import { useScreen } from '@lib/hooks/useScreen';
import { ErrorText } from '@components/ui';
import { Input } from '@components/ui/react-hook-form';
import { BodyPC, BodySP } from './svg';
import type { VFC } from 'react';
import type { Lang } from 'types/site';
import type { InputType, TextInput } from '../../data';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';

type Props = {
  localeLang: Lang;
  inputs: InputType[];
  onFocus?: () => void;
};

const useIsScreenMd = () => {
  const { isScreenMd } = useScreen();
  const mounted = useMounted();
  return isScreenMd && mounted;
};

const useRequired = ({ inputs }: Pick<Props, 'inputs'>) => {
  const [hasRequired, setHasRequired] = useState(true);
  const { watch } = useFormContext<HauteCoutureInputs>();
  const names = inputs.map((input) => input.name);
  const values = watch(names);
  useEffect(() => {
    if (values.some((value) => value)) {
      setHasRequired(false);
    } else {
      setHasRequired(true);
    }
  }, [values, setHasRequired]);
  return { hasRequired };
};

const Measurement: VFC<Props> = ({ localeLang, inputs, onFocus }) => {
  const text = inputs as TextInput[];
  const { errors } = useFormState<HauteCoutureInputs>();
  // NOTE:
  // hasErrorをuseMemoしても何故か更新されないので、
  // useMemoを使わずそのまま書く
  const hasError = inputs
    .map((input) => input.name)
    .some((name) => name in errors);
  const { hasRequired } = useRequired({ inputs });
  const isScreenMd = useIsScreenMd();
  const f = useIntlMessage();
  return (
    <div>
      <div className="flex items-end">
        <div className={cn(s.inputs)}>
          {text.map((input) => (
            <div key={input.name} className={cn(s.row)}>
              <label className={cn(s.label)} htmlFor={input.name}>
                <span>{input.label?.[localeLang]}</span>
              </label>
              <Input
                id={input.name}
                name={input.name}
                required={hasRequired}
                placeholder={
                  isScreenMd
                    ? input.placeholder?.[localeLang]
                    : input.label?.[localeLang]
                }
                type="number"
                step="0.1"
                onFocus={onFocus}
                // onChange={onChange}
              />
            </div>
          ))}
          <p className={cn(s.attention)}>{f('form.measurement.attention')}</p>
        </div>
        <div className={cn(s.svg)}>
          {isScreenMd && <BodyPC />}
          {!isScreenMd && <BodySP />}
        </div>
      </div>
      {hasError && hasRequired && (
        <ErrorText className="mt-3">
          {/*　共通なので、ErrorMessageは使用しない */}
          {f('form.error.required')}
        </ErrorText>
      )}
    </div>
  );
};

export default Measurement;
