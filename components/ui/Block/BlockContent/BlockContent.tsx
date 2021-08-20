import Image from 'next/image';
import cn from 'classnames';
import s from './BlockContent.module.css';
import type { FC, ReactNode } from 'react';
import type { Maybe } from 'types/schema';

type Props = {
  className?: string;
  image?: { node?: ReactNode } | { src?: Maybe<string>; alt?: Maybe<string> };
  children?: ReactNode;
};

const BlockContent: FC<Props> = ({ className, image, children }) => {
  return (
    <div className={cn(s.root, className)}>
      {image && (
        <div className={cn('aspect-w-1', 'aspect-h-1', s.imageWrapper)}>
          {'node' in image && image.node}
          {'src' in image && image.src && (
            <Image
              src={image.src}
              alt={image.alt ?? ''}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      )}

      {children && <div className={cn(s.description)}>{children}</div>}
    </div>
  );
};

export default BlockContent;
