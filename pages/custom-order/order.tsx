import { useRouter } from 'next/router';
import commerce from '@lib/api/commerce';
import { fetcher as contentfulFetcher } from '@lib/contentful';
import { Layout } from '@components/common';
import {
  OrderView,
  customOrderOrderViewFragment,
} from '@components/custom-order';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import type { GetCustomOrderOrderQuery } from 'types/schema';

const getCustomOrderOrderQuery = /* GraphQL */ `
  query GetCustomOrderOrder(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    customOrderCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        ...customOrderOrderView
      }
    }
  }

  ${customOrderOrderViewFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const SLUG = 'custom-order';
  const data = await contentfulFetcher<GetCustomOrderOrderQuery>({
    query: getCustomOrderOrderQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
  });

  const entry = data?.customOrderCollection?.items?.[0];

  if (!entry || !entry?.slug) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  const config = { locale, locales };
  const { product } = await commerce.getProduct({
    variables: { slug: entry.slug },
    config,
    preview,
  });

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      product,
      // NOTE:
      // pagesは_app→Layout経由で、footerにページリンクとして渡される。
      // pages,
    },
    revalidate: 200,
  };
}

export default function Order({
  entry,
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <OrderView {...entry} product={product} />
  );
}

Order.Layout = Layout;
