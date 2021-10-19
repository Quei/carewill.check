import React, {
  Children,
  isValidElement,
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useKeenSlider } from 'keen-slider/react';
import cn from 'classnames';
import s from './Thumbnails.module.css';
import { Control } from '../Control';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  imageCurrentSlide: number;
  children: ReactNode;
};

const PER_VIEW = 6;

const Thumbnails: FC<Props> = ({ className, imageCurrentSlide, children }) => {
  const enableSlide = Children.count(children) > PER_VIEW;
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(enableSlide ? false : true);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: PER_VIEW,
    mounted: () => setIsMounted(true),
    // slideChanged(s) {
    //   const slideNumber = s.details().relativeSlide;
    //   setCurrentSlide(slideNumber);
    // },
  });

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    if (enableSlide) {
      const preventNavigation = (event: TouchEvent) => {
        // Center point of the touch area
        const touchXPosition = event.touches[0].pageX;
        // Size of the touch area
        const touchXRadius = event.touches[0].radiusX || 0;

        // We set a threshold (10px) on both sizes of the screen,
        // if the touch area overlaps with the screen edges
        // it's likely to trigger the navigation. We prevent the
        // touchstart event in that case.
        if (
          touchXPosition - touchXRadius < 10 ||
          touchXPosition + touchXRadius > window.innerWidth - 10
        )
          event.preventDefault();
      };

      const slider = sliderContainerRef.current!;
      slider.addEventListener('touchstart', preventNavigation);

      return () => {
        if (slider) {
          slider.removeEventListener('touchstart', preventNavigation);
        }
      };
    }
  }, [enableSlide]);

  useEffect(() => {
    slider?.moveToSlideRelative(Math.floor(imageCurrentSlide / PER_VIEW));
  }, [imageCurrentSlide, slider]);

  const onPrev = useCallback(() => slider.prev(), [slider]);
  const onNext = useCallback(() => slider.next(), [slider]);

  return (
    <div
      ref={sliderContainerRef}
      className={cn('relative', s.sliderContainer, className)}
    >
      {enableSlide && (
        <Control className={cn(s.control)} onPrev={onPrev} onNext={onNext} />
      )}
      <div
        ref={enableSlide ? sliderRef : undefined}
        className={cn(
          'opacity-0',
          { 'opacity-100': isMounted },
          { ['keen-slider']: enableSlide },
          { [s.enableSlide]: enableSlide },
          s.slider
        )}
      >
        {Children.map(children, (child, i) => {
          // Add the keen-slider__slide className to children
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: cn(child.props.className, {
                  'keen-slider__slide': enableSlide,
                }),
              },
            };
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default Thumbnails;
