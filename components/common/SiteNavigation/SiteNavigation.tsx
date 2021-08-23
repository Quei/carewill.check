import cn from 'classnames';
import s from './SiteNavigation.module.css';
import { MenuListItem } from './MenuListItem';
import type { VFC } from 'react';
import type { AllNavigations } from 'types/all-navigations';

type Props = {
  className?: string;
  id?: string;
  allNavigations: AllNavigations;
  type: 'header' | 'footer';
};

const SiteNavigation: VFC<Props> = ({
  className,
  id,
  allNavigations,
  type,
}) => {
  return (
    <ul
      className={cn(
        s.root,
        { [s.header]: type === 'header' },
        { [s.footer]: type === 'footer' },
        className
      )}
      id={id}
    >
      {allNavigations.store && (
        <MenuListItem
          site="store"
          title="Store"
          menu={allNavigations.store.menu}
          type={type}
        />
      )}
      {allNavigations.labo && (
        <MenuListItem
          site="labo"
          title="Labo"
          menu={allNavigations.labo.menu}
          type={type}
        />
      )}
      {allNavigations.about && (
        <MenuListItem
          site="about"
          title="About us"
          menu={allNavigations.about.menu}
          type={type}
        />
      )}
      {type === 'header' && (
        <li className={cn(s.contact)}>
          <a href="mailto:">Contact</a>
        </li>
      )}
    </ul>
  );
};

export default SiteNavigation;
