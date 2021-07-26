import { useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import s from './Link.module.css';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { Site } from 'types/site';

const URLS = {
  store: 'https://carewill.co.jp',
  labo: 'https://labo.carewill.co.jp',
  about: 'https://about.carewill.co.jp',
};

type Props = NextLinkProps & {
  className?: string;
  site?: Site;
  hasBorderEffect?: boolean;
};

type UseCustomHrefArgs = Pick<Props, 'site' | 'href'>;
const useCustomHref = ({ site, href }: UseCustomHrefArgs) => {
  return useMemo(() => {
    if (typeof href === 'string') {
      if (!site || !href.startsWith('/')) {
        return href;
      } else {
        if (process.env.NEXT_PUBLIC_CURRENT_SITE === site) {
          return href;
        } else {
          return `${URLS[site]}${href}`;
        }
      }
    } else {
      return href;
    }
  }, [site, href]);
};

const useIsCurrent = (href: Props['href']) => {
  const router = useRouter();
  return router.pathname === href;
};

const Link: React.FC<Props> = ({
  className,
  site,
  hasBorderEffect = false,
  href,
  children,
  ...props
}) => {
  const customHref = useCustomHref({ site, href });
  const isCurrent = useIsCurrent(customHref);
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
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
