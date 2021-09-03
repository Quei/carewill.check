import cn from 'classnames';
import s from './SiteMenuList.module.css';
import { I18nWidget } from '@components/common';
import { Link } from '@components/ui';
import { MenuListItem } from './MenuListItem';
import type { VFC } from 'react';
import type { AllNavigations } from 'types/all-navigations';

type Props = {
  className?: string;
  id?: string;
  allNavigations: AllNavigations;
  type: 'header' | 'footer';
};

const SiteMenuList: VFC<Props> = ({ className, id, allNavigations, type }) => {
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
        <>
          <li
            className={cn(
              'border-b',
              'border-green',
              'md:border-none',
              s.headerOtherListItem
            )}
          >
            <Link href="/company/contact" site="about" hasBorderEffect={true}>
              Contact
            </Link>
          </li>
          <li className={cn(s.headerOtherListItem)}>
            <I18nWidget className={cn('md:hidden')} />
          </li>
        </>
      )}
    </ul>
  );
};

export default SiteMenuList;
