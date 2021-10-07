import { productConnectionFragment } from './get-all-products-query';

const getCollectionProductsQuery = /* GraphQL */ `
  query GetProductsFromCollection(
    $categoryId: ID!
    $first: Int = 250
    $sortKey: ProductCollectionSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    node(id: $categoryId) {
      id
      ... on Collection {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          ...ProductConnection
        }
      }
    }
  }
  ${productConnectionFragment}
`;
export default getCollectionProductsQuery;
