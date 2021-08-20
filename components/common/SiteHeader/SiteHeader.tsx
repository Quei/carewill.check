import { useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';
import s from './SiteHeader.module.css';
import { I18nWidget } from '@components/common';
import { Logo, Link } from '@components/ui';
import { SiteHeaderRoot } from './SiteHeaderRoot';
import { MenuListItem } from './MenuListItem';
import { MenuButton } from './MenuButton';
import type { VFC } from 'react';
import type { AllNavigations } from 'types/all-navigations';

type Props = {
  className?: string;
  isSiteRoot?: boolean;
  allNavigations?: AllNavigations;
};

const useMenu = () => {
  const [hasShownMenu, setHasShowMenu] = useState(false);
  const toggleMenu = useCallback(() => {
    setHasShowMenu((value) => !value);
  }, []);
  return { hasShownMenu, toggleMenu };
};

const SiteHeader: VFC<Props> = ({ isSiteRoot, allNavigations }) => {
  const { ref, inView } = useInView();
  const SmallLogo = isSiteRoot ? 'p' : 'h1';
  const { hasShownMenu, toggleMenu } = useMenu();
  return (
    <SiteHeaderRoot>
      <div className={cn(s.innerRoot)}>
        <div ref={ref} className={cn(s.stickySentinel)} />
        <SmallLogo
          className={cn(s.smallLogo, { [s.hasShownSmallLogo]: !inView })}
        >
          <Link href="/" site="store">
            <Logo />
          </Link>
        </SmallLogo>
        {allNavigations && (
          <nav className={cn(s.nav)}>
            <MenuButton
              className={cn(s.menuButton)}
              hasPressed={hasShownMenu}
              targetId={'site-menu'}
              onClick={toggleMenu}
            />
            <ul
              id="site-menu"
              className={cn(s.menuList, {
                [s.hasShownMenuForMobile]: hasShownMenu,
              })}
            >
              {allNavigations.store && (
                <MenuListItem
                  site="store"
                  title="Store"
                  menu={allNavigations.store.menu}
                />
              )}
              {allNavigations.labo && (
                <MenuListItem
                  site="labo"
                  title="Labo"
                  menu={allNavigations.labo.menu}
                />
              )}
              {allNavigations.about && (
                <MenuListItem
                  site="about"
                  title="About us"
                  menu={allNavigations.about.menu}
                />
              )}
              <li className={cn(s.contactItem)}>
                <a href="mailto:">Contact</a>
              </li>
            </ul>

            {/* <Link href="/search">
                  <a className={s.link}>All</a>
                </Link> */}
            {/* <Link href="/search?q=clothes">
                  <a className={s.link}>Clothes</a>
                </Link> */}
          </nav>
        )}
        {/* {shownSmallLogo && <div>search</div>} */}
      </div>

      {/* <div className="flex justify-end flex-1 space-x-8"> */}
      {/* <I18nWidget /> */}
      {/* <UserNav /> */}
      {/* </div> */}
    </SiteHeaderRoot>
  );
};

export default SiteHeader;
