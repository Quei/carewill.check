import { FC } from 'react';
import cn from 'classnames';
import s from './Hero.module.css';
import type { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

const Hero: FC<Props> = ({ className, children }) => {
  return <div className={cn(className, s.root)}>{children && children}</div>;
};

export default Hero;
