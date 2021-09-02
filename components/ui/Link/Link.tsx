import { useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import s from './Link.module.css';
import { URLS } from '@config/domains';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { Site } from 'types/site';

type Props = NextLinkProps &
  JSX.IntrinsicElements['a'] & {
    className?: string;
    site?: Site;
    hasBorderEffect?: boolean;
    isPartiallyCurrent?: boolean;
  };

const useCustomHref = ({ site, href }: Pick<Props, 'site' | 'href'>) => {
  const { locale } = useRouter();
  return useMemo(() => {
    if (typeof href === 'string') {
      if (!site || !href.startsWith('/')) {
        return href;
      } else {
        if (process.env.NEXT_PUBLIC_CURRENT_SITE === site) {
          return href;
        } else {
          if (locale === 'ja') {
            return `${URLS[site]}${href}`;
          } else {
            return `${URLS[site]}/${locale}${href}`;
          }
        }
      }
    } else {
      return href;
    }
  }, [site, href, locale]);
};

const useIsCurrent = ({
  href,
  isPartiallyCurrent,
}: Pick<Props, 'href' | 'isPartiallyCurrent'>) => {
  const { asPath } = useRouter();
  if (isPartiallyCurrent) {
    const regex = RegExp(`^${href}`);
    return regex.test(asPath);
  } else {
    const regex = RegExp(`^${href}\/?$`);
    return regex.test(asPath);
  }
};

const useIsTargetBlank = (href: string) => {
  return useMemo(() => {
    if (href.startsWith('/')) {
      return false;
    } else {
      const url = new URL(href);
      return !/carewill\.co\.jp/.test(url.hostname);
    }
  }, [href]);
};

const Link: React.FC<Props> = ({
  className,
  site,
  hasBorderEffect = false,
  isPartiallyCurrent = false,
  href,
  children,
  target,
  ...props
}) => {
  const customHref = useCustomHref({ site, href });
  const isCurrent = useIsCurrent({ href: customHref, isPartiallyCurrent });
  const isTargetBlank = useIsTargetBlank(customHref);
  return (
    <NextLink href={customHref}>
      <a
        {...props}
        className={cn(
          s.link,
          {
            [s.hasBorderEffect]: hasBorderEffect,
            [s.current]: isCurrent,
          },
          className
        )}
        target={isTargetBlank ? '_blank' : target ?? undefined}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
