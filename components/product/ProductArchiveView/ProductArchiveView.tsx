import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './ProductArchiveView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Seo } from '@components/common';
import { PageHeader, MorePostsButton, useUI } from '@components/ui';
import { Post, productArchiveViewPostFragment } from './Post';
import type { VFC } from 'react';
import type {
  ProductArchiveViewDescriptionFragment,
  ProductArchiveViewPostWithIdFragment,
  Maybe,
} from 'types/schema';

type Props = {
  home?: Maybe<ProductArchiveViewDescriptionFragment>;
  posts?: Maybe<ProductArchiveViewPostWithIdFragment>[];
};

export const productArchiveViewDescriptionFragment = /* GraphQL */ `
  fragment ProductArchiveViewDescription on Home {
    productDescription {
      json
    }
  }
`;

export const productArchiveViewPostWithIdFragment = /* GraphQL */ `
  fragment ProductArchiveViewPostWithId on Product {
    sys {
      id
    }
    ...ProductArchiveViewPost
  }

  ${productArchiveViewPostFragment}
`;

const DEFAULT_SHOWN_POSTS_NUMBER = 2;
const ADD_SHOWN_POSTS_NUMBER = 6;

const useCurrentPosts = ({ posts }: Pick<Props, 'posts'>) => {
  const { productArchiveShownPostsNumber } = useUI();
  const shownPostsNumber =
    productArchiveShownPostsNumber ?? DEFAULT_SHOWN_POSTS_NUMBER;

  if (!posts) {
    return {
      currentPosts: [],
      hasMorePosts: false,
    };
  }
  return {
    currentPosts: posts?.slice(0, shownPostsNumber),
    hasMorePosts: shownPostsNumber < posts.length,
  };
};

const useHandleOnClickMorePosts = (total: number = 0) => {
  const {
    productArchiveShownPostsNumber,
    setProductArchiveShownPostsNumber,
  } = useUI();
  const shownPostsNumber =
    productArchiveShownPostsNumber ?? DEFAULT_SHOWN_POSTS_NUMBER;

  const nextShownPostsNumber = shownPostsNumber + ADD_SHOWN_POSTS_NUMBER;
  const number = Math.min(nextShownPostsNumber, total);

  return useCallback(() => {
    if (setProductArchiveShownPostsNumber) {
      setProductArchiveShownPostsNumber(number);
    }
  }, [setProductArchiveShownPostsNumber, number]);
};

const ProductArchiveView: VFC<Props> = ({ home, posts }) => {
  const f = useIntlMessage();
  const { currentPosts, hasMorePosts } = useCurrentPosts({ posts });
  const handleOnClickMorePosts = useHandleOnClickMorePosts(posts?.length);
  const titleText = f('store.product');
  const descriptionText = renderRichText(home?.productDescription);

  return (
    <>
      <Seo title={titleText} description={descriptionText} />
      <PageHeader title={titleText}>{descriptionText}</PageHeader>
      {currentPosts.map((post) => (
        <Post key={post?.sys.id} {...post} />
      ))}
      {hasMorePosts && <MorePostsButton onClick={handleOnClickMorePosts} />}
    </>
  );
};

export default ProductArchiveView;
