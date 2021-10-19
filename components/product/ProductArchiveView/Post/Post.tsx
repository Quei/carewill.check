import Image from 'next/image';
import cn from 'classnames';
import s from './Post.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useScreen } from '@lib/hooks/useScreen';
import { Block, BlockContent, Link } from '@components/ui';
import type { VFC } from 'react';
import type { ProductArchiveViewPostFragment } from 'types/schema';
import { useMemo } from 'react';

type Props = ProductArchiveViewPostFragment & {
  className?: string;
};

export const productArchiveViewPostFragment = /* GraphQL */ `
  fragment ProductArchiveViewPost on Product {
    title
    slug
    description
    imageCollection(limit: 1) {
      items {
        url
      }
    }
  }
`;

const useTextBlockChildElement = () => {
  const { isScreenLg } = useScreen();
  return useMemo(() => {
    if (isScreenLg) {
      return 'div';
    } else {
      return BlockContent;
    }
  }, [isScreenLg]);
};

const Post: VFC<Props> = ({
  className,
  title,
  slug,
  description,
  imageCollection,
}) => {
  const f = useIntlMessage();
  const image = imageCollection?.items?.[0];
  const href = `/product/${slug}`;
  const TextBlockChildElement = useTextBlockChildElement();

  return (
    <article className={cn(s.root, className)}>
      <Block
        title={title ?? ''}
        titleTag="h2"
        isCentering={true}
        className={cn(s.textBlock)}
        href={href}
      >
        <TextBlockChildElement>
          {description}
          <p>
            <span className={cn('underline')}>{f('makuakeLink')}</span>
          </p>
        </TextBlockChildElement>
      </Block>
      <div className={cn('relative', 'aspect-w-1', 'aspect-h-1')}>
        <Link href={href}>
          {image?.url && (
            <Image
              src={image.url}
              layout="fill"
              objectFit="cover"
              alt={title ?? ''}
            />
          )}
        </Link>
      </div>
    </article>
  );
};

export default Post;
