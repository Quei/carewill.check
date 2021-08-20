import cn from 'classnames';
import s from './SiteFooter.module.css';
import { Container } from '@components/ui';
import { MenuListItem } from './MenuListItem';
import { Sns } from './Sns';
import type { FC } from 'react';
import type { AllNavigations } from 'types/all-navigations';

type Props = {
  className?: string;
  children?: any;
  allNavigations?: AllNavigations;
};

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy'];

const SiteFooter: FC<Props> = ({ className, allNavigations }) => {
  return (
    <footer className={cn(s.root, className)}>
      <Container>
        <div className="bg-red">breadcrumbs</div>
        {allNavigations && (
          <nav className={cn(s.navigation)}>
            <ul>
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
            </ul>
          </nav>
        )}
        <div className="">
          <div>
            <p>
              グッドデザイン賞2021受賞　Tokyo Startup Gateway
              2019/ファイナリスト&オーディエンス賞受賞 TOKYO STARTUP
              DEGAWA/最優秀出川賞受賞
            </p>
            <p className="bg-red">LEGAL PAGES</p>
            <p>
              copyright&copy; 株式会社ケアウィル , 2020 All Rights Reserved.
            </p>
          </div>
          {allNavigations?.store?.sns && (
            <Sns items={allNavigations.store.sns} />
          )}
        </div>
      </Container>
    </footer>
  );
};

export default SiteFooter;
