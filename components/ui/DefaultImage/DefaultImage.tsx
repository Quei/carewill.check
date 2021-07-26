import cn from 'classnames';
import s from './DefaultImage.module.css';
import { CrossBlock } from '@components/icons';
import type { VFC } from 'react';

type Props = {
  className?: string;
};

const DefaultImage: VFC<Props> = ({ className }) => {
  return (
    <div className={cn(s.root, className)}>
      <CrossBlock />
    </div>
  );
};

export default DefaultImage;
