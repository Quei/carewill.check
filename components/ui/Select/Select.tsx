import { useCallback } from 'react';
import cn from 'classnames';
import s from './Select.module.css';
import type {
  FC,
  SelectHTMLAttributes,
  ChangeEventHandler,
  ReactElement,
} from 'react';

export type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  onChange?: (...args: any[]) => any;
  children: ReactElement<HTMLOptionElement>[];
};

const Select: FC<Props> = ({ className, onChange, children, ...rest }) => {
  const handleOnChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      if (onChange) {
        onChange(e.target.value);
      }
      return null;
    },
    [onChange]
  );

  return (
    <label className={cn(s.root, className)}>
      <select
        className={cn(s.select)}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      >
        {children}
      </select>
    </label>
  );
};

export default Select;
