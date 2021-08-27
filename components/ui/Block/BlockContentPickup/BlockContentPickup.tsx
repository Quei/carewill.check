import Image from 'next/image';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './BlockContentPickup.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { DefaultImage } from '@components/ui';
import type { FC, ReactNode } from 'react';
import type { Maybe } from 'types/schema';
import { useMemo } from 'react';

type Props = {
  className?: string;
  imageSrc?: Maybe<string>;
  imageAlt?: Maybe<string>;
  title?: Maybe<string>;
  titleTag?: 'h2' | 'h3' | 'h4';
  date?: string;
  hasImage: boolean;
  contentType?: string;
  children?: ReactNode;
};

const useContentTypeTag = (contentType?: string) => {
  const f = useIntlMessage();
  return useMemo(() => {
    if (!contentType) {
      return null;
    }
    if (contentType === 'StaffNote') {
      return f('labo.staffNotes');
    } else if (contentType === 'Interview') {
      return f('labo.interviews');
    }
  }, [contentType, f]);
};

const BlockContentPickup: FC<Props> = ({
  className,
  imageSrc,
  imageAlt,
  title,
  titleTag: TitleTag = 'h2',
  date,
  hasImage,
  contentType,
  children,
}) => {
  const contentTypeTag = useContentTypeTag(contentType);
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
      {contentTypeTag && (
        <span
          className={cn(
            'inline-block',
            'text-sm',
            'border-1',
            'border-green',
            'leading-none',
            'px-1',
            'py-0.5',
            'mt-4'
          )}
        >
          {contentTypeTag}
        </span>
      )}
      {date && (
        <time
          className={cn('block', 'mt-2.5', 'md:mt-2')}
          dateTime={dayjs(date).format('YYYY.MM.DD')}
        >
          {dayjs(date).format('YYYY.MM.DD')}
        </time>
      )}
      {title && (
        <TitleTag
          className={cn('line-clamp-5', s.title, {
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
