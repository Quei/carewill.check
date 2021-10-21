import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import s from './Input.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type { VFC, InputHTMLAttributes, ChangeEventHandler } from 'react';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';
import type { CustomOrderInputs } from 'types/custom-order-inputs';

type FormInputs = HauteCoutureInputs | CustomOrderInputs;
type FormKeyInputs = keyof HauteCoutureInputs | keyof CustomOrderInputs;

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  className?: string;
  name: FormKeyInputs;
  errorMessage?: string;
  onChange?: (...args: any[]) => any;
};

const Input: VFC<Props> = ({
  className,
  name,
  required = false,
  type,
  min,
  max,
  onChange,
  ...rest
}) => {
  const f = useIntlMessage();
  const { register } = useFormContext<FormInputs>();
  const isEmail = type === 'email';
  const registerd = register(name, {
    required:
      required &&
      (isEmail ? f('form.error.required.email') : f('form.error.required')),
    // NOTE:
    // email pattern
    // https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/email
    pattern: isEmail
      ? {
          value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          message: f('form.error.pattern.email'),
        }
      : undefined,
    min: min
      ? { value: min, message: f('form.error.minmax', { min, max }) }
      : undefined,
    max: max
      ? { value: max, message: f('form.error.minmax', { min, max }) }
      : undefined,
  });
  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange && onChange(event);
      registerd.onChange(event);
      return null;
    },
    [registerd, onChange]
  );

  return (
    <input
      className={cn(
        'appearance-none',
        'rounded-none',
        'w-full',
        'pr-2',
        'focus:outline-none',
        s.root,
        className
      )}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      name={name}
      onChange={handleOnChange}
      onBlur={registerd?.onBlur}
      ref={registerd?.ref}
      type={type}
      {...rest}
    />
  );
};

export default Input;
