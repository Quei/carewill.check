import { useCallback } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import s from './Checkbox.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type {
  FC,
  InputHTMLAttributes,
  ChangeEventHandler,
  ReactNode,
} from 'react';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

type InputHTMLType = InputHTMLAttributes<HTMLInputElement>;

type Props = InputHTMLType & {
  className?: string;
  type?: 'radio' | 'checkbox';
  name: keyof HauteCoutureInputs;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  hasNoLabel?: boolean;
  image?: string | ReactNode;
  children: ReactNode;
};

const Checkbox: FC<Props> = ({
  className,
  type = 'radio',
  name,
  required = false,
  onChange,
  hasNoLabel = false,
  image,
  children,
  ...rest
}) => {
  const f = useIntlMessage();
  const { register } = useFormContext<HauteCoutureInputs>();
  const registerd = register(name, {
    required: required && f('form.error.required'),
  });
  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange && onChange(event);
      registerd.onChange(event);
    },
    [registerd, onChange]
  );
  const RootElement = hasNoLabel ? 'div' : 'label';
  return (
    <RootElement className={cn(s.root, { [s.hasImage]: image }, className)}>
      <input
        className={cn(s.input)}
        type={type}
        name={name}
        onChange={handleOnChange}
        onBlur={registerd?.onBlur}
        ref={registerd?.ref}
        {...rest}
      />
      {!image && (
        <>
          <span className={cn(s.dummyCheckbox)} aria-hidden={true} />
          {children}
        </>
      )}
      {image && (
        <div className={cn('h-full')}>
          <div className={cn(s.imageWrapper)}>
            {typeof image === 'string' && (
              <Image src={image} layout="fill" alt="" />
            )}
            {typeof image !== 'string' && image}
          </div>
          <p className={cn(s.imageLabel)}>{children}</p>
        </div>
      )}
    </RootElement>
  );
};

export default Checkbox;
