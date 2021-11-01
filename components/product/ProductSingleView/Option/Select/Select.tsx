import { useMemo, useCallback } from 'react';
import ReactSelect, { components } from 'react-select';
import cn from 'classnames';
import s from './Select.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type { VFC } from 'react';
import type { OptionTypeBase, NamedProps } from 'react-select';
import type { Components } from 'react-select/src/components';
import type { ProductOptionValues } from '@framework/types/product';

type Props = {
  className?: string;
  values: ProductOptionValues[];
  onClick: (value: ProductOptionValues) => void;
};

const customTheme: NamedProps['theme'] = (theme) => {
  return {
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary: 'var(--green)',
    },
  };
};

const customStyles: NamedProps<OptionTypeBase>['styles'] = {
  container: (provided, state) => ({
    ...provided,
    maxWidth: '260px',
  }),
  control: (provided, state) => ({
    ...provided,
    fontSize: '16px',
    border: '1px solid currentColor',
    minHeight: 'initial',
    height: '28px',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '100%',
    position: 'static',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'var(--green)',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'currentcolor',
  }),
  input: (provided, state) => ({
    ...provided,
    width: 0,
    // height: '20px',
    caretColor: 'transparent',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: 0,
    paddingRight: '3px',
  }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    marginBottom: 0,
    // borderRadius: 0,
    border: '1px solid currentColor',
    borderTopColor: 'transparent',
    boxShadow: 'none',
  }),
  menuList: (provided, state) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 1,
    fontWeight: 'bold',
  }),
};

const CustomDropdownIndicator: Components['DropdownIndicator'] = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className={cn('relative', s.dropdownIndicator)} />
    </components.DropdownIndicator>
  );
};

const useOptions = (values: Props['values']) => {
  return useMemo(() => {
    return values.map((value) => {
      return {
        label: value.label,
        value: value.label,
      };
    });
  }, [values]);
};

const Select: VFC<Props> = ({ className, values, onClick }) => {
  const options = useOptions(values);
  const onChange = useCallback(
    (selected) => {
      onClick({ label: selected.value });
    },
    [onClick]
  );
  const f = useIntlMessage();
  return (
    <div className={cn(className)}>
      <ReactSelect
        options={options}
        onChange={onChange}
        placeholder={f('form.select')}
        theme={customTheme}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    </div>
  );
};

export default Select;
