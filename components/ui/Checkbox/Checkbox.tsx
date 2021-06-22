import React, { useCallback } from 'react';
import cn from 'classnames';
import s from './Checkbox.module.css';
import type { FC, InputHTMLAttributes, ChangeEventHandler } from 'react';
import type { UseFormRegister } from 'react-hook-form';

type InputHTMLType = InputHTMLAttributes<HTMLInputElement>;

type Props = InputHTMLType & {
  className?: string;
  type?: 'radio' | 'checkbox';
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  onChange?: () => void;
};

const Checkbox: FC<Props> = ({
  className,
  type = 'radio',
  label,
  name,
  register,
  onChange,
  ...rest
}) => {
  const rootClassName = cn(s.root, {}, className);
  const registerd = register ? register(name) : null;
  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      registerd?.onChange && registerd.onChange(event);
      onChange && onChange(event);
    },
    [registerd, onChange]
  );
  return (
    <label className={rootClassName}>
      <input
        className={cn(s.input)}
        type={type}
        name={name}
        onChange={handleOnChange}
        onBlur={registerd?.onBlur}
        ref={registerd?.ref}
        {...rest}
      />
      {label}
    </label>
  );
};

export default Checkbox;
