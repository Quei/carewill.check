import cn from 'classnames';
import s from './Sns.module.css';
import { Twitter, Facebook, Youtube, Note } from '@components/icons';
import type { VFC } from 'react';
import type { Repeater } from 'types/all-navigations';

type Props = {
  className?: string;
  items: Repeater[];
};

const Sns: VFC<Props> = ({ className, items }) => {
  return (
    <ul className={cn('flex', className)}>
      {items.map((item) => (
        <li className={cn(s.item)} key={`footer-link-item-${item.id}`}>
          <a href={item.value} target="_blank" rel="noopener noreferrer">
            {item.key === 'twitter' && <Twitter />}
            {item.key === 'facebook' && <Facebook />}
            {item.key === 'youtube' && <Youtube />}
            {item.key === 'note' && <Note />}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Sns;
