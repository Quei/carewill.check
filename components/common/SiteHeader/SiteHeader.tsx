import { useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';
import s from './SiteHeader.module.css';
import { I18nWidget, SiteNavigation } from '@components/common';
import { Logo, Link } from '@components/ui';
import { SiteHeaderRoot } from './SiteHeaderRoot';
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
              targetId={'site-menu-list'}
              onClick={toggleMenu}
            />
            <div
              className={cn(s.navigation, {
                [s.hasShownMenuForMobile]: hasShownMenu,
              })}
            >
              <SiteNavigation
                id="site-menu-list"
                allNavigations={allNavigations}
                type="header"
              />
            </div>
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
