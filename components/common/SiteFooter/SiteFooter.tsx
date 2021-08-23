import dayjs from 'dayjs';
import cn from 'classnames';
import s from './SiteFooter.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { SiteNavigation } from '@components/common';
import { Container } from '@components/ui';
import { Sns } from './Sns';
import type { FC } from 'react';
import type { AllNavigations } from 'types/all-navigations';
import type { FooterFragment } from 'types/schema';

type Props = {
  className?: string;
  children?: any;
  allNavigations?: AllNavigations;
  footer?: FooterFragment;
};

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy'];

const SiteFooter: FC<Props> = ({ className, allNavigations, footer }) => {
  const f = useIntlMessage();
  return (
    <footer className={cn(s.root, className)}>
      <Container>
        <div className="bg-red">breadcrumbs</div>
        {allNavigations && (
          <nav className={cn('mt-5', 'md:mt-16')}>
            <SiteNavigation allNavigations={allNavigations} type="footer" />
          </nav>
        )}
        <div className={cn(s.texts)}>
          {footer?.content && <p>{footer.content}</p>}
          <p className="bg-red">LEGAL PAGES</p>
          <p>
            copyright&copy; {f('carewill')} , {dayjs().format('YYYY')} All
            Rights Reserved.
          </p>
        </div>
        {allNavigations?.store?.sns && (
          <Sns className={cn('mt-12')} items={allNavigations.store.sns} />
        )}
      </Container>
    </footer>
  );
};

export default SiteFooter;
