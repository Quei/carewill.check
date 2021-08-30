import { useState, useCallback } from 'react';
import cn from 'classnames';
import s from './MenuListItem.module.css';
import { Link, PlusButton } from '@components/ui';
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
  const handleOnClickPlusButton = useCallback(() => {
    setHasShownChildrenForMobile((value) => !value);
  }, []);
  return { hasShownChildrenForMobile, handleOnClickPlusButton };
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
    handleOnClickPlusButton,
  } = useHasShownChildrenForMobile();
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
      <Link className={cn(s.title)} href="/" site={site} hasBorderEffect={true}>
        {title}
      </Link>
      <PlusButton
        className={cn(
          'absolute',
          'top-2',
          'right-4',
          'focus:outline-none',
          'md:hidden'
        )}
        targetId={childrenTargetId}
        hasPressed={hasShownChildrenForMobile}
        onClick={handleOnClickPlusButton}
        isThin={type === 'footer'}
      />
      <ul
        id={childrenTargetId}
        className={cn(s.children, {
          [s.hasShownChildrenForMobile]: hasShownChildrenForMobile,
        })}
      >
        {menu.map(({ id, key, value }) => {
          if (!key || !value) {
            return null;
          }
          return (
            <li key={id} className={cn(s.child)}>
              <Link href={value} site={site} hasBorderEffect={true}>
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
