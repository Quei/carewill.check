import { FC } from 'react';
import cn from 'classnames';
import s from './Header.module.css';

interface Props {
  title?: string;
  description?: string;
}

const Header: FC<Props> = ({ title, description }) => {
  if (!title && !description) {
    return null;
  }
  return (
    <div className={cn(s.root)}>
      {title && <h1 className={cn(s.title)}>{title}</h1>}
      {description && <p className={cn(s.description)}>{description}</p>}
    </div>
  );
};

export default Header;
