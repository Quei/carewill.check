import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import cn from 'classnames';
import s from './SiteHeaderNavigation.module.css';
import { SiteMenuList } from '@components/common';
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

  const { asPath, locale } = useRouter();
  useEffect(() => {
    setHasShowMenu(false);
  }, [asPath, locale]);
  return { hasShownMenu, toggleMenu, menuListWrapperRef };
};

const SiteHeaderNavigation: VFC<Props> = ({ className, allNavigations }) => {
  const { hasShownMenu, toggleMenu, menuListWrapperRef } = useMenu();
  return (
    <nav className={cn('w-full', className)}>
      <MenuButton
        className={cn(
          'z-20',
          'left-site-vertical',
          'absolute',
          'md:hidden',
          s.menuButton
        )}
        hasPressed={hasShownMenu}
        targetId={'site-menu-list'}
        onClick={toggleMenu}
      />
      <div
        className={cn('hidden', 'md:block', s.menuListWrapper, {
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
      </div>
    </nav>
  );
};

export default SiteHeaderNavigation;
