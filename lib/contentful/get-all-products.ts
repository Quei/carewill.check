import { sleep } from '@lib/sleep';
import { fetcher } from '@lib/contentful';
import { productArchiveViewPostWithIdFragment } from '@components/product';
import type { GetStaticPropsContext } from 'next';
import type { GetAllProductsQuery } from 'types/schema';

const getAllProductsQuery = /* GraphQL */ `
  query GetAllProducts(
    $locale: String!
    $preview: Boolean = false
    $limit: Int = 100
    $skip: Int = 0
  ) {
    productCollection(
      locale: $locale
      preview: $preview
      limit: $limit
      skip: $skip
      order: date_DESC
    ) {
      total
      items {
        ...productArchiveViewPostWithId
      }
    }
  }

  ${productArchiveViewPostWithIdFragment}
`;

export const getAllProducts = async ({
  locale,
  preview,
}: Pick<GetStaticPropsContext, 'locale' | 'preview'>) => {
  const limit = 100;
  let page = 0;
  let shouldQueryMorePosts = true;
  const posts = [];

  while (shouldQueryMorePosts) {
    const response = await fetcher<GetAllProductsQuery>({
      query: getAllProductsQuery,
      variables: {
        locale,
        preview,
        limit,
        skip: page * limit,
      },
      site: 'store',
    });

    const productCollection = response?.productCollection;

    if (productCollection?.items?.length) {
      posts.push(...productCollection.items);
      shouldQueryMorePosts = posts.length < productCollection.total;
    } else {
      shouldQueryMorePosts = false;
    }

    sleep(300);

    page++;
  }

  return {
    posts,
  };
};
