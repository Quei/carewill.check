import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import s from './MenuListItem.module.css';
import { useScreen } from '@lib/hooks/useScreen';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { Link, PlusMark } from '@components/ui';
import type { Repeater } from 'types/all-navigations';
import type { Site } from 'types/site';

type Props = {
  className?: string;
  site: Site;
  title: string;
  menu: Repeater[];
  type: 'header' | 'footer';
};

const useHasShownChildrenForMobile = () => {
  const [hasShownChildrenForMobile, setHasShownChildrenForMobile] = useState(
    false
  );
  const handleOnClickTitleForMobile = useCallback(() => {
    setHasShownChildrenForMobile((value) => !value);
  }, []);
  const { asPath, locale } = useRouter();
  useEffect(() => {
    setHasShownChildrenForMobile(false);
  }, [asPath, locale]);
  return { hasShownChildrenForMobile, handleOnClickTitleForMobile };
};

const MenuListItem: React.VFC<Props> = ({
  className,
  site,
  title,
  menu,
  type,
}) => {
  const childrenTargetId = `${title}-children`;
  const {
    hasShownChildrenForMobile,
    handleOnClickTitleForMobile,
  } = useHasShownChildrenForMobile();
  const { isScreenMd } = useScreen();
  const f = useIntlMessage();
  return (
    <li
      className={cn(
        'relative',
        s.root,
        { [s.header]: type === 'header' },
        { [s.footer]: type === 'footer' },
        className
      )}
    >
      {isScreenMd && (
        <Link
          className={cn(
            {
              ['header-menu-title']: type === 'header',
            },
            {
              ['footer-menu-title']: type === 'footer',
            }
          )}
          href="/"
          site={site}
          hasBorderEffect={true}
          isPartiallyCurrent={true}
        >
          {title}
        </Link>
      )}
      {!isScreenMd && (
        <button
          className={cn(
            'relative',
            'block',
            'text-left',
            'w-full',
            {
              ['header-menu-title']: type === 'header',
            },
            {
              ['footer-menu-title']: type === 'footer',
            }
          )}
          onClick={handleOnClickTitleForMobile}
        >
          {title}
          <PlusMark
            className={cn(
              'absolute',
              'top-1/2',
              'right-2',
              'transform',
              '-translate-y-1/2',
              'md:hidden'
            )}
            hasPressed={hasShownChildrenForMobile}
          />
        </button>
      )}
      <ul
        id={childrenTargetId}
        className={cn(s.children, {
          [s.hasShownChildrenForMobile]: hasShownChildrenForMobile,
        })}
      >
        <li className={cn('md:hidden', s.child)}>
          <Link
            className={cn('block')}
            href={'/'}
            site={site}
            hasBorderEffect={true}
          >
            {f(`${site}.topLink`)}
          </Link>
        </li>
        {menu.map(({ id, key, value }) => {
          if (!key || !value) {
            return null;
          }
          return (
            <li key={id} className={cn(s.child)}>
              <Link
                className={cn('block', 'md:inline-block')}
                href={value}
                site={site}
                hasBorderEffect={true}
              >
                {key}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default MenuListItem;
