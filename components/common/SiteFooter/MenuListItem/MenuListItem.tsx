import cn from 'classnames';
import s from './MenuListItem.module.css';
import { Link } from '@components/ui';
import type { Repeater } from 'types/all-navigations';
import type { Site } from 'types/site';

type Props = {
  className?: string;
  site: Site;
  title: string;
  menu: Repeater[];
};

const MenuListItem: React.VFC<Props> = ({ className, site, title, menu }) => {
  return (
    <li className={cn(s.root, className)}>
      <Link className={cn(s.title)} href="/" site={site} hasBorderEffect={true}>
        {title}
      </Link>
      <span className="ml-8">+</span>
      <ul className={cn(s.children)}>
        {menu.map(({ id, key, value }) => (
          <li key={id}>
            <Link href={value} site={site} hasBorderEffect={true}>
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuListItem;
