import React, { useCallback } from 'react';
import cn from 'classnames';
import s from './Checkbox.module.css';
import type {
  FC,
  InputHTMLAttributes,
  ChangeEventHandler,
  ReactNode,
} from 'react';
import type { UseFormRegister } from 'react-hook-form';

type InputHTMLType = InputHTMLAttributes<HTMLInputElement>;

type Props = InputHTMLType & {
  className?: string;
  type?: 'radio' | 'checkbox';
  name: string;
  register?: UseFormRegister<any>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  hasNoLabel?: boolean;
  children: ReactNode;
};

const Checkbox: FC<Props> = ({
  className,
  type = 'radio',
  name,
  required = false,
  register,
  onChange,
  hasNoLabel = false,
  children,
  ...rest
}) => {
  const registerd = register ? register(name, { required }) : null;
  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      registerd?.onChange && registerd.onChange(event);
      onChange && onChange(event);
    },
    [registerd, onChange]
  );
  const RootElement = hasNoLabel ? 'div' : 'label';
  return (
    <RootElement className={cn(s.root, className)}>
      <input
        className={cn(s.input)}
        type={type}
        name={name}
        onChange={handleOnChange}
        onBlur={registerd?.onBlur}
        ref={registerd?.ref}
        {...rest}
      />
      <span className={cn(s.dummyCheckbox)} aria-hidden={true} />
      {children}
    </RootElement>
  );
};

export default Checkbox;
