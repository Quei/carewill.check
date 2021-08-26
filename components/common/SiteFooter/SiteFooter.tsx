import { useMemo } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './SiteFooter.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { SiteMenuList, I18nWidget } from '@components/common';
import { Container, Link, ScrollerToTop } from '@components/ui';
import { Sns } from './Sns';
import type { FC } from 'react';
import type { AllNavigations } from 'types/all-navigations';
import type { FooterFragment } from 'types/schema';

type Props = FooterFragment & {
  className?: string;
  children?: any;
  allNavigations?: AllNavigations;
};

export const footerFragment = /* GraphQL */ `
  fragment footer on Footer {
    content
    logoCollection {
      items {
        sys {
          id
        }
        url
        title
      }
    }
  }
`;

const LEGAL_PAGES = [
  { name: 'tokushoho', url: '/tokushoho' },
  { name: 'privacyPolicy', url: '/privacy-policy' },
];

const SiteFooter: FC<Props> = ({
  className,
  allNavigations,
  content,
  logoCollection,
}) => {
  const f = useIntlMessage();
  const nonNullableLogoItems = useMemo(() => {
    return logoCollection?.items?.filter(nonNullableFilter);
  }, [logoCollection]);
  return (
    <footer className={cn(s.root, className)}>
      <Container>
        {/* <div className="bg-red">breadcrumbs</div> */}
        {allNavigations && (
          <nav className={cn('mt-5', 'md:mt-16')}>
            <SiteMenuList allNavigations={allNavigations} type="footer" />
          </nav>
        )}
        <div className={cn(s.texts)}>
          {content && <p>{content}</p>}
          {nonNullableLogoItems && (
            <ul className={cn(s.logoList)}>
              {nonNullableLogoItems.map((logo) => (
                <li key={logo.sys.id}>
                  <Image
                    src={logo.url ?? ''}
                    alt={logo.title ?? ''}
                    width="50"
                    height="50"
                  />
                </li>
              ))}
            </ul>
          )}
          {LEGAL_PAGES.length > 0 && (
            <ul className={cn(s.legalPageList)}>
              {LEGAL_PAGES.map((page) => (
                <li key={`legal-page-${page.name}`}>
                  <Link href={page.url} site="about">
                    {f(`about.${page.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <I18nWidget type="footer" />
          <p className={cn(s.copyRight)}>
            copyright&copy; {f('carewill')} , {dayjs().format('YYYY')} All
            Rights Reserved.
          </p>
        </div>
        {allNavigations?.store?.sns && (
          <Sns className={cn('mt-12')} items={allNavigations.store.sns} />
        )}
        <ScrollerToTop
          className={cn(
            'fixed',
            'bottom-3',
            'right-5',
            'md:bottom-3',
            'md:right-site-vertical-md'
          )}
        />
      </Container>
    </footer>
  );
};

export default SiteFooter;
