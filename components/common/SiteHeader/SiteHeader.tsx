import cn from 'classnames';
import s from './SiteHeader.module.css';
import { useInView } from 'react-intersection-observer';
import { I18nWidget, UserNav } from '@components/common';
import { Logo, Link } from '@components/ui';
import { SiteHeaderRoot } from './SiteHeaderRoot';
import { MenuListItem } from './MenuListItem';
import type { VFC } from 'react';
import type { AllNavigations } from 'types/all-navigations';

type Props = {
  className?: string;
  isSiteRoot?: boolean;
  allNavigations?: AllNavigations;
};

const SiteHeader: VFC<Props> = ({ isSiteRoot, allNavigations }) => {
  const { ref, inView } = useInView();
  const shownSmallLogo = !inView;
  const SmallLogo = isSiteRoot ? 'p' : 'h1';
  return (
    <SiteHeaderRoot>
      <div className={cn(s.innerRoot)}>
        <div ref={ref} className={cn(s.stickySentinel)} />
        <SmallLogo
          className={cn(s.smallLogo, { [s.shownSmallLogo]: shownSmallLogo })}
        >
          <Link href="/" site="store">
            <Logo />
          </Link>
        </SmallLogo>
        {allNavigations && (
          <nav className={cn(s.nav, { [s.shownSmallLogo]: shownSmallLogo })}>
            <ul className={cn(s.menuList)}>
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
              <li>
                <a href="mailto:" className="text-3xl leading-none">
                  Contact
                </a>
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
