import { FC } from 'react';
import cn from 'classnames';
import s from './Page.module.css';
import type { ReactNode } from 'react';

interface Props {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
}

const Page: FC<Props> = ({ className, header, children }) => {
  return (
    <div className={cn(className, s.root)}>
      {header && header}
      <div className={cn(s.content)}>{children}</div>
    </div>
  );
};

export default Page;
