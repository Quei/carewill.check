import Image from 'next/image';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './BlockContentPickup.module.css';
import { DefaultImage } from '@components/ui';
import type { FC, ReactNode } from 'react';
import type { Maybe } from 'types/schema';

type Props = {
  className?: string;
  imageSrc?: Maybe<string>;
  imageAlt?: Maybe<string>;
  title?: Maybe<string>;
  titleTag?: 'h2' | 'h3' | 'h4';
  date?: string;
  hasImage: boolean;
  children?: ReactNode;
};

const BlockContentPickup: FC<Props> = ({
  className,
  imageSrc,
  imageAlt,
  title,
  titleTag: TitleTag = 'h2',
  date,
  hasImage,
  children,
}) => {
  return (
    <div className={cn(s.root, className)}>
      {hasImage && (
        <div className={cn('aspect-w-1', 'aspect-h-1')}>
          {!imageSrc && <DefaultImage />}
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ''}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      )}
      {date && (
        <time
          className={cn('block', 'mt-2.5', 'md:mt-4')}
          dateTime={dayjs(date).format('YYYY.MM.DD')}
        >
          {dayjs(date).format('YYYY.MM.DD')}
        </time>
      )}
      {title && (
        <TitleTag
          className={cn('mt-6', 'line-clamp-5', s.title, {
            [s.hasImageTitle]: hasImage,
          })}
        >
          {title}
        </TitleTag>
      )}
      {children && (
        <div
          className={cn(
            'text-sm',
            'mt-6',
            'line-clamp-5',
            'md:line-clamp-11',
            s.description,
            { [s.hasImageDescription]: hasImage }
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default BlockContentPickup;
