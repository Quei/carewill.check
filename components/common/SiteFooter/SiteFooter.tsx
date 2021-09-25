import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './SiteFooter.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderTextToDom } from '@lib/contentful/utils/rich-text';
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
  fragment FooterItem on Footer {
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
  // { name: 'tokushoho', url: '/tokushoho' },
  { name: 'privacyPolicy', url: '/privacy-policy' },
];

const SiteFooter: FC<Props> = ({
  className,
  allNavigations,
  content,
  logoCollection,
}) => {
  const { locale } = useRouter();
  const f = useIntlMessage();
  const nonNullableLogoItems = useMemo(() => {
    return logoCollection?.items?.filter(nonNullableFilter);
  }, [logoCollection]);
  return (
    <footer
      className={cn(
        'px-site-vertical',
        'pt-24',
        'pb-16',
        'border-t',
        'border-green',
        'md:px-0',
        'md:pt-32',
        s.root,
        className
      )}
    >
      <Container>
        {/* <div className="bg-red">breadcrumbs</div> */}
        {allNavigations && (
          <nav className={cn('mt-5', 'md:mt-16')}>
            <SiteMenuList allNavigations={allNavigations} type="footer" />
          </nav>
        )}
        <I18nWidget className={cn('text-2xl', 'mt-10')} />
        <div className={cn('text-2xs', 'mt-6', s.texts)}>
          {content && <p>{renderTextToDom(content)}</p>}
          {nonNullableLogoItems && (
            <ul className={cn('flex', s.logoList)}>
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
            <ul className={cn('flex', s.legalPageList)}>
              {LEGAL_PAGES.map((page) => (
                <li key={`legal-page-${page.name}`}>
                  <Link
                    className={cn('hover:underline')}
                    href={page.url}
                    site="about"
                  >
                    {f(`about.${page.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className={cn('mt-1')}>
            copyright&copy; {f('carewill')}, {dayjs().format('YYYY')} All Rights
            Reserved.
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
