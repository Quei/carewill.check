import { useMemo } from 'react';
import { useFormState } from 'react-hook-form';
import { useMediaQuery } from '@react-hook/media-query';
import cn from 'classnames';
import s from './Measurement.module.css';
import { useMounted } from '@lib/hooks/useMounted';
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
  const isScreenMd = useMediaQuery('(min-width: 768px)');
  const mounted = useMounted();
  return isScreenMd && mounted;
};

const Measurement: VFC<Props> = ({ localeLang, inputs, onFocus }) => {
  const text = inputs as TextInput[];
  const { errors } = useFormState<HauteCoutureInputs>();
  const hasError = useMemo(
    () => inputs.map((input) => input.name).some((name) => name in errors),
    [inputs, errors]
  );
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
                required={input.required}
                placeholder={
                  isScreenMd
                    ? input.placeholder?.[localeLang]
                    : input.label?.[localeLang]
                }
                onFocus={onFocus}
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
      {hasError && (
        <ErrorText className="mt-3">
          {/*　共通なので、ErrorMessageは使用しない */}
          {f('form.error.required')}
        </ErrorText>
      )}
    </div>
  );
};

export default Measurement;
