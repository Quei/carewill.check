import Image from 'next/image';
import cn from 'classnames';
import s from './BlockContent.module.css';
import { renderTextToDom } from '@lib/contentful/utils/rich-text';
import type { FC, ReactNode } from 'react';
import type { Maybe } from 'types/schema';

type Props = {
  className?: string;
  imageSrc?: Maybe<string>;
  imageAlt?: Maybe<string>;
  children?: ReactNode;
};

const BlockContent: FC<Props> = ({
  className,
  imageSrc,
  imageAlt,
  children,
}) => {
  return (
    <div className={cn(s.root, className)}>
      {imageSrc && (
        <div className={cn('aspect-w-1', 'aspect-h-1', s.imageWrapper)}>
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {children && <div className={cn(s.description)}>{children}</div>}
    </div>
  );
};

export default BlockContent;
