import cn from 'classnames';
import s from './ErrorText.module.css';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

const ErrorText: FC<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, className);
  return <p className={rootClassName}>{children}</p>;
};

export default ErrorText;
