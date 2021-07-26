import { useCallback } from 'react';
import cn from 'classnames';
import s from './Input.module.css';
import type { VFC, InputHTMLAttributes, ChangeEventHandler } from 'react';

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  className?: string;
  onChange?: (...args: any[]) => any;
};

const Input: VFC<Props> = ({ className, onChange, ...rest }) => {
  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (onChange) {
        onChange(e.target.value);
      }
      return null;
    },
    [onChange]
  );

  return (
    <label>
      <input
        className={cn(s.root, className)}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
};

export default Input;
