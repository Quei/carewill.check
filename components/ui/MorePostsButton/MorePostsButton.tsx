import cn from 'classnames';
import s from './MorePostsButton.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type { VFC } from 'react';

type Props = {
  className?: string;
  onClick: () => void;
};

const MorePostsButton: VFC<Props> = ({ className, onClick }) => {
  const f = useIntlMessage();
  return (
    <button className={cn(s.root, className)} onClick={onClick}>
      {f('morePosts')}
    </button>
  );
};

export default MorePostsButton;
