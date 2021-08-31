import { useMemo, useState, useEffect, useCallback, Fragment } from 'react';
import { useRouter } from 'next/router';
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

// NOTE:
// youtubeの埋め込みのlocalizationが、
// contentfulのmediaだと上手く機能しないので、
// 日英両方取得して、英語の場合でもyoutubeのみは日本語の物を使用する。
type Props = {
  className?: string;
  items: Array<Maybe<SlideItemFragment>>;
  itemsEnglish: Array<Maybe<SlideItemFragment>>;
  disableLink?: boolean;
};

const SLIDE_DURATION = 1000;
const SLIDE_INTERVAL = 5000;

const useSlider = () => {
  const [pause, setPause] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: SLIDE_DURATION,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
    slideChanged: (KeenSlider) => {
      const { relativeSlide } = KeenSlider.details();
      setCurrentIndex(relativeSlide);
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
  return { sliderRef, pause, toggle, currentIndex };
};

const useSlideItems = ({
  items,
  itemsEnglish,
}: Pick<Props, 'items' | 'itemsEnglish'>) => {
  const { locale } = useRouter();
  return useMemo(() => {
    if (locale === 'ja') {
      return items.filter(nonNullableFilter);
    } else {
      return itemsEnglish.filter(nonNullableFilter).map((item, index) => {
        if (!item?.contentType?.startsWith('image')) {
          const itemJapanese = items[index];
          return {
            ...itemJapanese,
            title: item.title,
          } as SlideItemFragment;
        }
        return item;
      });
    }
  }, [items, itemsEnglish, locale]);
};

const Slide: VFC<Props> = ({
  className,
  items,
  itemsEnglish,
  disableLink = false,
}) => {
  const { sliderRef, pause, toggle, currentIndex } = useSlider();
  const slideItems = useSlideItems({ items, itemsEnglish });
  return (
    <div className={cn('relative', s.root, className)}>
      <div ref={sliderRef} className={cn('keen-slider', 'h-full')}>
        {slideItems.map((item, index) => {
          return (
            <Fragment key={item.sys.id}>
              <div className={cn('keen-slider__slide', 'relative', 'h-full')}>
                {item.contentType?.startsWith('image') && item.url && (
                  <Image
                    src={item.url}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
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
              </div>
              {!disableLink && (
                <ItemName
                  className={cn(
                    'opacity-0',
                    'absolute',
                    'z-10',
                    'top-1/2',
                    'left-1/2',
                    s.itemName,
                    {
                      ['sr-only']: currentIndex !== index,
                    }
                  )}
                  description={item.description}
                >
                  {item.title}
                </ItemName>
              )}
            </Fragment>
          );
        })}
      </div>
      <button
        className={cn(
          'opacity-0',
          'absolute',
          'z-10',
          'top-1/2',
          'left-1/2',
          'bg-white',
          'border',
          'border-green',
          'hover:bg-green',
          s.toggleButton,
          { [s.centering]: disableLink }
        )}
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
