import { useRouter } from 'next/router';
import {
  fetcher,
  getAllNavigations,
  getAllProducts,
  getFooter,
} from '@lib/contentful';
import { Layout } from '@components/common';
import {
  ProductArchiveView,
  productArchiveViewDescriptionFragment,
} from '@components/product';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import type { GetProductArchiveQuery } from 'types/schema';

const getProductArchiveQuery = /* GraphQL */ `
  query GetProductArchive($locale: String!, $preview: Boolean = false) {
    homeCollection(
      locale: $locale
      where: { slug: "home" }
      preview: $preview
      limit: 1
    ) {
      items {
        ...productArchiveViewDescription
      }
    }
  }

  ${productArchiveViewDescriptionFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext) {
  const promise = fetcher<GetProductArchiveQuery>({
    query: getProductArchiveQuery,
    variables: {
      locale,
      preview,
    },
    site: 'store',
  });

  const allProductsPromise = getAllProducts({
    locale,
    preview,
  });

  const allNavigationsPromise = getAllNavigations({ locale, preview });

  const footerPromise = getFooter({ locale, preview });

  const [data, allProducts, allNavigations, footerData] = await Promise.all([
    promise,
    allProductsPromise,
    allNavigationsPromise,
    footerPromise,
  ]);

  const home = data?.homeCollection?.items?.[0];
  const { posts } = allProducts;

  return {
    props: {
      home,
      posts: posts,
      allNavigations,
      footer: footerData.footer,
    },
    revalidate: 200,
  };
}

export default function ProductArchive({
  home,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <ProductArchiveView home={home} posts={posts} />
  );
}

ProductArchive.Layout = Layout;