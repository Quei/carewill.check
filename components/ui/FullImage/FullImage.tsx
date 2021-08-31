import Image from 'next/image';
import cn from 'classnames';
import s from './FullImage.module.css';
import type { VFC } from 'react';

type Props = {
  className?: string;
  src?: string;
  alt?: string;
  isFullHeightMobile?: boolean;
};

const FullImage: VFC<Props> = ({
  className,
  src,
  alt,
  isFullHeightMobile = false,
}) => {
  if (!src) {
    return null;
  }

  const rootClassName = cn(
    'relative',
    'w-full',
    'md:aspect-w-16',
    'md:aspect-h-9',
    {
      ['aspect-w-1']: !isFullHeightMobile,
      ['aspect-h-1']: !isFullHeightMobile,
      ['h-screen']: isFullHeightMobile,
    },
    className
  );

  return (
    <div className={rootClassName}>
      <Image src={src} alt={alt ?? ''} layout="fill" objectFit="cover" />
    </div>
  );
};

export default FullImage;
