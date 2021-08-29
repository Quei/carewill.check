import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import s from './Input.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type { VFC, InputHTMLAttributes, ChangeEventHandler } from 'react';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  className?: string;
  name: keyof HauteCoutureInputs;
  errorMessage?: string;
  onChange?: (...args: any[]) => any;
};

const Input: VFC<Props> = ({
  className,
  name,
  required = false,
  type,
  onChange,
  ...rest
}) => {
  const f = useIntlMessage();
  const { register } = useFormContext<HauteCoutureInputs>();
  const registerd = register(name, {
    required:
      required &&
      (type === 'email'
        ? f('form.error.required.email')
        : f('form.error.required')),
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
