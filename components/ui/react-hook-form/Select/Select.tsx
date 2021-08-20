import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { components } from 'react-select';
import cn from 'classnames';
import s from './Select.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { Input } from '@components/ui/react-hook-form';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { OptionsType, OptionTypeBase, NamedProps } from 'react-select';
import type { Components } from 'react-select/src/components';
import type {
  HauteCoutureInputs,
  SelectInputs,
} from 'types/haute-couture-inputs';

export type Props = {
  className?: string;
  required?: boolean;
  name: keyof HauteCoutureInputs;
  id: string;
  options: OptionsType<{ value?: string; label?: string }>;
  hasOtherText?: boolean;
  onFocus?: () => void;
  onChange?: () => void;
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
    border: '1px solid currentColor',
    // borderRadius: 0,
    minHeight: 'initial',
    lineHeight: 1,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'var(--green)',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'currentcolor',
    // position: 'relative',
    // top: 'initial',
  }),
  input: (provided, state) => ({
    ...provided,
    width: 0,
    height: '20px',
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
  }),
};

const CustomDropdownIndicator: Components['DropdownIndicator'] = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className={cn(s.dropdownIndicator)} />
    </components.DropdownIndicator>
  );
};

const typeGuardForOtherTextinputName = (
  name: string | null
): name is Props['name'] => {
  if (!name) {
    return false;
  }
  return (
    name === 'frequency_in_use_other' || name === 'alternative_button_other'
  );
};

const useHasShownOtherText = ({
  name,
  hasOtherText,
}: Pick<Props, 'name' | 'hasOtherText'>) => {
  const f = useIntlMessage();
  const [hasShownOtherText, setHasShownOtherText] = useState(false);
  const { watch } = useFormContext<HauteCoutureInputs>();
  const watchValue = watch(name);
  useEffect(() => {
    if (hasOtherText && watchValue) {
      if (
        typeof watchValue === 'object' &&
        !Array.isArray(watchValue) &&
        watchValue?.value === f('form.other')
      ) {
        setHasShownOtherText(true);
      } else {
        setHasShownOtherText(false);
      }
    }
  }, [hasOtherText, watchValue, f]);
  const otherTextInputName = hasOtherText ? `${name}_other` : null;
  return {
    otherTextInputName: typeGuardForOtherTextinputName(otherTextInputName)
      ? otherTextInputName
      : null,
    hasShownOtherText,
  };
};

const Select: FC<Props> = ({
  className,
  required,
  name,
  id,
  options,
  hasOtherText,
  onFocus,
  onChange,
}) => {
  const { control } = useFormContext<HauteCoutureInputs>();
  const f = useIntlMessage();
  const otherText = f('form.other');
  const customOptions = hasOtherText
    ? [...options, { label: otherText, value: otherText }]
    : options;
  const { otherTextInputName, hasShownOtherText } = useHasShownOtherText({
    name,
    hasOtherText,
  });
  return (
    <>
      <label className={cn('block', className)}>
        <Controller
          control={control as Control<SelectInputs>}
          name={name}
          rules={{
            required: required && f('form.error.required'),
          }}
          render={({ field }) => (
            <ReactSelect
              className={cn(s.select)}
              instanceId={id}
              theme={customTheme}
              styles={customStyles}
              placeholder={f('form.select')}
              components={{
                DropdownIndicator: CustomDropdownIndicator,
              }}
              options={customOptions}
              onFocus={onFocus}
              {...field}
              // NOTE:
              // onChangeを上書きするため、
              // filedの後に挿入
              onChange={(event) => {
                field.onChange(event);
                onChange && onChange();
              }}
            />
          )}
        />
      </label>
      {otherTextInputName && (
        <Input
          className={cn('mt-5', { hidden: !hasShownOtherText })}
          name={otherTextInputName}
          type="text"
          placeholder={f('form.other.placeholder')}
        />
      )}
    </>
  );
};

export default Select;
