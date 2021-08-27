import cn from 'classnames';
import s from './Block.module.css';
import { Link } from '@components/ui';
import { CrossBlock } from '@components/icons';
import type { FC, ReactNode, PointerEventHandler } from 'react';
import type { Site } from 'types/site';

export type Props = {
  className?: string;
  title?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  href?: string;
  site?: Site;
  isCentering?: boolean;
  hasNoPaddingMobile?: boolean;
  onPointerEnter?: PointerEventHandler;
  onPointerLeave?: PointerEventHandler;
  isClose?: boolean;
  children?: ReactNode;
};

type LinkWrapperProps = Pick<Props, 'href' | 'site' | 'children'>;
const LinkWrapper: FC<LinkWrapperProps> = ({ href, site, children }) => {
  if (!href) {
    return <>{children}</>;
  } else {
    return (
      <Link
        href={href}
        site={site}
        className={cn('block', 'h-full', 'hover:bg-green', 'hover:text-white')}
      >
        {children}
      </Link>
    );
  }
};

const Block: FC<Props> = ({
  className,
  title,
  titleTag: TitleTag = 'h1',
  href,
  site,
  isCentering = false,
  hasNoPaddingMobile = false,
  onPointerEnter,
  onPointerLeave,
  isClose,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative',
        s.root,
        { [s.hasNoChildren]: !children },
        { ['pointer-events-none']: isClose },
        className
      )}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <LinkWrapper href={href} site={site}>
        {title && (
          <TitleTag
            className={cn('block-title')}
            aria-hidden={TitleTag === 'p'}
          >
            {title}
          </TitleTag>
        )}
        {children && (
          <div
            className={cn(s.content, {
              [s.isCentering]: isCentering,
              [s.hasNoPaddingMobile]: hasNoPaddingMobile,
            })}
          >
            {children}
          </div>
        )}
      </LinkWrapper>
      {isClose && <CrossBlock className="absolute top-0 left-0" />}
    </div>
  );
};

export default Block;
