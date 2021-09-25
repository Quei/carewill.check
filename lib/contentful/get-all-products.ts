import { fetchAll } from '@lib/contentful/utils/fetch-all';
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
        ...ProductArchiveViewPostWithId
      }
    }
  }

  ${productArchiveViewPostWithIdFragment}
`;

const pickCollection = <C>(response: GetAllProductsQuery) => {
  if ('productCollection' in response) {
    return response.productCollection as C | undefined;
  }
  return null;
};

export const getAllProducts = async ({
  locale,
  preview,
}: Pick<GetStaticPropsContext, 'locale' | 'preview'>) => {
  const posts = await fetchAll<
    GetAllProductsQuery,
    NonNullable<GetAllProductsQuery['productCollection']>
  >({
    site: 'store',
    query: getAllProductsQuery,
    locale,
    preview,
    pickCollection,
  });

  return {
    posts,
  };
};
