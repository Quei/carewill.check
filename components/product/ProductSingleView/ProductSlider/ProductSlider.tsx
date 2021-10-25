import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import cn from 'classnames';
import s from './ProductSlider.module.css';
import { Control } from './Control';
import { Thumbnails } from './Thumbnails';
import type { FC } from 'react';
import type { ProductImage } from '@commerce/../shopify/types/product';

type Props = {
  images: ProductImage[];
  currentSelectedVariantImageId?: string;
};

const ProductSlider: FC<Props> = ({
  images,
  currentSelectedVariantImageId,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.details().relativeSlide;
      setCurrentSlide(slideNumber);
    },
  });

  // Stop the history navigation gesture on touch devices
  // useEffect(() => {
  //   const preventNavigation = (event: TouchEvent) => {
  //     // Center point of the touch area
  //     const touchXPosition = event.touches[0].pageX;
  //     // Size of the touch area
  //     const touchXRadius = event.touches[0].radiusX || 0;

  //     // We set a threshold (10px) on both sizes of the screen,
  //     // if the touch area overlaps with the screen edges
  //     // it's likely to trigger the navigation. We prevent the
  //     // touchstart event in that case.
  //     if (
  //       touchXPosition - touchXRadius < 10 ||
  //       touchXPosition + touchXRadius > window.innerWidth - 10
  //     ) {
  //       event.preventDefault();
  //     }
  //   };

  //   const slider = sliderContainerRef.current!;
  //   slider.addEventListener('touchstart', preventNavigation);

  //   return () => {
  //     if (slider) {
  //       slider.removeEventListener('touchstart', preventNavigation);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const targetImageIndex = images.findIndex((image) => {
      return image.id === currentSelectedVariantImageId;
    });
    if (targetImageIndex >= 0) {
      slider?.moveToSlideRelative(targetImageIndex);
    }
  }, [images, currentSelectedVariantImageId, slider]);

  const onPrev = useCallback(() => slider.prev(), [slider]);
  const onNext = useCallback(() => slider.next(), [slider]);

  return (
    <div>
      <div className={cn('relative', 'w-full', 'overflow-y-hidden')}>
        <div ref={sliderContainerRef} className={cn(s.sliderContainer)}>
          {slider && (
            <Control
              className={cn(s.control)}
              onPrev={onPrev}
              onNext={onNext}
            />
          )}
          <div
            ref={ref}
            className={cn(s.slider, { [s.show]: isMounted }, 'keen-slider')}
          >
            {images.map((image, i) => (
              <div
                key={image.url}
                className={cn('keen-slider__slide', s.imageContainer)}
              >
                <Image
                  className={cn(
                    'w-full',
                    'h-auto',
                    'max-h-full',
                    'object-cover'
                  )}
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  width={1050}
                  height={1050}
                  priority={i === 0}
                  quality="85"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Thumbnails imageCurrentSlide={currentSlide}>
        {images.map((image, i) => (
          <button
            aria-label="Position indicator"
            key={`thumbnail-${i}`}
            id={`thumbnail-${i}`}
            className={cn(s.positionIndicator, {
              [s.positionIndicatorActive]: currentSlide === i,
            })}
            onClick={() => {
              slider.moveToSlideRelative(i);
            }}
          >
            <div className={cn('aspect-w-1', 'aspect-h-1', s.imageContainer)}>
              <div>
                <Image
                  className={cn(
                    'w-full',
                    'h-auto',
                    'max-h-full',
                    'object-cover'
                  )}
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  width={200}
                  height={200}
                  quality="85"
                />
              </div>
            </div>
          </button>
        ))}
      </Thumbnails>
    </div>
  );
};

export default ProductSlider;
