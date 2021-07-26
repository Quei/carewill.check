import React, { useCallback } from 'react';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import cn from 'classnames';
import s from './TextArea.module.css';
import type { VFC, TextareaHTMLAttributes, ChangeEventHandler } from 'react';
import type { UseFormRegister } from 'react-hook-form';

type TextAreaHTMLType = TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = TextAreaHTMLType & {
  className?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

const TextArea: VFC<Props> = ({
  className,
  name,
  placeholder,
  required = false,
  register,
  onChange,
  ...rest
}) => {
  const rootClassName = cn(s.root, className);
  const registerd = register ? register(name, { required }) : null;
  const handleOnChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      registerd?.onChange && registerd.onChange(event);
      onChange && onChange(event);
    },
    [registerd, onChange]
  );
  const f = useIntlMessage();
  return (
    <textarea
      className={rootClassName}
      name={name}
      placeholder={placeholder ?? f('placeholderTextArea')}
      onChange={handleOnChange}
      onBlur={registerd?.onBlur}
      ref={registerd?.ref}
      {...rest}
    />
  );
};

export default TextArea;
