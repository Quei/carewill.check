import Image from 'next/image';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './BlockContentPickupLarge.module.css';
import { Container, DefaultImage } from '@components/ui';
import type { FC, ReactNode } from 'react';
import type { Maybe } from 'types/schema';

type Props = {
  className?: string;
  imageSrc?: Maybe<string>;
  imageAlt?: Maybe<string>;
  isImageLayoutCenter?: boolean;
  title?: string;
  titleTag?: 'h2' | 'h3' | 'h4';
  date?: string;
  children?: ReactNode;
};

const BlockContentPickupLarge: FC<Props> = ({
  className,
  imageSrc,
  imageAlt,
  isImageLayoutCenter = false,
  title,
  titleTag: TitleTag = 'h2',
  date,
  children,
}) => {
  const imageAspectClassNames = cn({
    ['md:aspect-w-16']: !isImageLayoutCenter,
    ['md:aspect-h-9']: !isImageLayoutCenter,
    ['aspect-w-1']: isImageLayoutCenter,
    ['aspect-h-1']: isImageLayoutCenter,
  });
  return (
    <div className={cn(s.root, className)}>
      <div
        className={cn(s.imageWrapper, {
          [s.isImageLayoutCenter]: isImageLayoutCenter,
        })}
      >
        <div className={imageAspectClassNames}>
          {!imageSrc && <DefaultImage />}
          {imageSrc && (
            <Image src={imageSrc} alt={imageAlt ?? ''} layout="fill" />
          )}
        </div>
      </div>
      <Container>
        {title && (
          <div className={cn(s.header)}>
            {date && (
              <time dateTime={dayjs(date).format('YYYY.MM.DD')}>
                {dayjs(date).format('YYYY.MM.DD')}
              </time>
            )}
            <TitleTag>{title}</TitleTag>
          </div>
        )}
        {children && <div className={cn(s.description)}>{children}</div>}
      </Container>
    </div>
  );
};

export default BlockContentPickupLarge;
