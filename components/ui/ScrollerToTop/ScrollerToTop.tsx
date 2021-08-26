import { useCallback, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cn from 'classnames';
import s from './ScrollerToTop.module.css';
import type { VFC } from 'react';

type Props = {
  className?: string;
};

const useHasShown = () => {
  const [hasShown, setHasShown] = useState(false);
  useScrollPosition(({ currPos }) => {
    if (currPos.y < -400) {
      setHasShown(true);
    } else {
      setHasShown(false);
    }
  });
  return { hasShown };
};

const ScrollerToTop: VFC<Props> = ({ className }) => {
  const { hasShown } = useHasShown();
  const onClick = useCallback(() => {
    animateScroll.scrollToTop({ duration: 500 });
  }, []);
  return (
    <button
      className={cn(s.root, { [s.hasShown]: hasShown }, className)}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

export default ScrollerToTop;
