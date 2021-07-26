import cn from 'classnames';
import s from './SiteHeaderRoot.module.css';
import type { FC } from 'react';

const SiteHeaderRoot: FC = ({ children }) => {
  return <header className={cn(s.root)}>{children}</header>;
};

export default SiteHeaderRoot;
