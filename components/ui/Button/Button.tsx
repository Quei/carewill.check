import cn from 'classnames';
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import s from './Button.module.css';
import { LoadingDots } from '@components/ui';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'flat' | 'slim';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    'relative',
    'bg-white',
    'cursor-pointer',
    'inline-flex',
    'leading-6',
    'text-center',
    'justify-center',
    'uppercase',
    'px-10',
    'py-1',
    'border',
    'border-green',
    'items-center',
    s.root,
    {
      [s.slim]: variant === 'slim',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <i className="flex">
            <LoadingDots />
          </i>
        </div>
      )}
    </Component>
  );
});

export default Button;
