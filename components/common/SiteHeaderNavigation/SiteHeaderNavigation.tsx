import { useState, useCallback, useRef, useEffect } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import cn from 'classnames';
import s from './SiteHeaderNavigation.module.css';
import { I18nWidget, SiteMenuList } from '@components/common';
import { MenuButton } from './MenuButton';
import type { VFC } from 'react';
import type { AllNavigations } from 'types/all-navigations';

type Props = {
  className?: string;
  allNavigations: AllNavigations;
};

const useMenu = () => {
  const [hasShownMenu, setHasShowMenu] = useState(false);
  const toggleMenu = useCallback(() => {
    setHasShowMenu((value) => !value);
  }, []);

  const menuListWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuListWrapperRef.current) {
      if (hasShownMenu) {
        disableBodyScroll(menuListWrapperRef.current);
      } else {
        enableBodyScroll(menuListWrapperRef.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [hasShownMenu]);
  return { hasShownMenu, toggleMenu, menuListWrapperRef };
};

const SiteHeaderNavigation: VFC<Props> = ({ className, allNavigations }) => {
  const { hasShownMenu, toggleMenu, menuListWrapperRef } = useMenu();
  return (
    <nav className={cn(s.root, className)}>
      <MenuButton
        className={cn(s.menuButton)}
        hasPressed={hasShownMenu}
        targetId={'site-menu-list'}
        onClick={toggleMenu}
      />
      <div
        className={cn(s.menuListWrapper, {
          [s.hasShownMenuForMobile]: hasShownMenu,
        })}
        ref={menuListWrapperRef}
      >
        <SiteMenuList
          className={cn(s.menuList)}
          id="site-menu-list"
          allNavigations={allNavigations}
          type="header"
        />
        <I18nWidget className={cn(s.i18n)} type="header" />
      </div>
    </nav>
  );
};

export default SiteHeaderNavigation;
