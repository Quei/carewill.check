import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import cn from 'classnames';
import s from './SiteHeaderNavigation.module.css';
import { useScreen } from '@lib/hooks/useScreen';
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

  const menuListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuListRef.current) {
      if (hasShownMenu) {
        disableBodyScroll(menuListRef.current);
      } else {
        enableBodyScroll(menuListRef.current);
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

  const { isScreenMd } = useScreen();
  useEffect(() => {
    setHasShowMenu(false);
    if (menuListRef.current && isScreenMd) {
      enableBodyScroll(menuListRef.current);
    }
  }, [isScreenMd]);
  return { hasShownMenu, toggleMenu, menuListRef };
};

const SiteHeaderNavigation: VFC<Props> = ({ className, allNavigations }) => {
  const { hasShownMenu, toggleMenu, menuListRef } = useMenu();
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
      >
        <div
          ref={menuListRef}
          className={cn(
            'h-full',
            'overflow-auto',
            'md:h-auto',
            'md:overflow-visible'
          )}
        >
          <SiteMenuList
            className={cn(s.menuList)}
            id="site-menu-list"
            allNavigations={allNavigations}
            type="header"
          />
        </div>
      </div>
    </nav>
  );
};

export default SiteHeaderNavigation;
