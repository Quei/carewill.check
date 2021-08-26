import { useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';
import s from './SiteHeader.module.css';
import { SiteHeaderNavigation } from '@components/common';
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

const SiteHeader: VFC<Props> = ({ isSiteRoot, allNavigations }) => {
  const { ref, inView } = useInView();
  const SmallLogo = isSiteRoot ? 'p' : 'h1';

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
          <SiteHeaderNavigation allNavigations={allNavigations} />
        )}
        {/* {shownSmallLogo && <div>search</div>} */}
      </div>

      {/* <div className="flex justify-end flex-1 space-x-8"> */}

      {/* <UserNav /> */}
      {/* </div> */}
    </SiteHeaderRoot>
  );
};

export default SiteHeader;
