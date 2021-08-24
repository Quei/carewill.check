import { useMemo, useState, useEffect, useCallback, Fragment } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import cn from 'classnames';
import s from './Slide.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { YouTube } from '@components/ui';
import { Play, Pause } from '@components/icons';
import { ItemName } from './ItemName';
import type { VFC } from 'react';
import type { Maybe, SlideItemFragment } from 'types/schema';

export const slideItemFragment = /* GraphQL */ `
  fragment SlideItem on Asset {
    sys {
      id
    }
    contentType
    fileName
    url
    title
    description
  }
`;

type Props = {
  className?: string;
  items: Array<Maybe<SlideItemFragment>>;
};

const SLIDE_DURATION = 1000;
const SLIDE_INTERVAL = 5000;

const useSlider = () => {
  const [pause, setPause] = useState(false);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: SLIDE_DURATION,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });
  useEffect(() => {
    const timerId = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, SLIDE_INTERVAL);
    return () => {
      clearInterval(timerId);
    };
  }, [pause, slider]);
  const toggle = useCallback(() => {
    setPause((value) => !value);
  }, []);
  return { sliderRef, pause, toggle };
};

const Slide: VFC<Props> = ({ className, items }) => {
  const { sliderRef, pause, toggle } = useSlider();
  const nonNullableItems = useMemo(() => items.filter(nonNullableFilter), [
    items,
  ]);
  return (
    <div className={cn('relative', className)}>
      <div ref={sliderRef} className={cn('keen-slider')}>
        {nonNullableItems.map((item) => {
          return (
            <div className={cn('keen-slider__slide', s.item)} key={item.sys.id}>
              {item.contentType?.startsWith('image') && item.url && (
                <Image src={item.url} alt="" layout="fill" objectFit="cover" />
              )}
              {!item.contentType?.startsWith('image') && item.fileName && (
                <YouTube
                  className={cn('w-full', 'h-full', 'pointer-events-none')}
                  videoId={item.fileName}
                  isLoop={true}
                  isFit={true}
                  isAuto={true}
                />
              )}
              <ItemName
                className={cn(s.itemName)}
                description={item.description}
              >
                {item.title}
              </ItemName>
            </div>
          );
        })}
      </div>
      <button
        className={cn(s.toggleButton)}
        onClick={toggle}
        aria-pressed={pause}
      >
        {pause && <Play />}
        {!pause && <Pause />}
      </button>
    </div>
  );
};

export default Slide;
