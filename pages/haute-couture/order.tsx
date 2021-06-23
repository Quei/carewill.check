import { useRouter } from 'next/router';
import commerce from '@lib/api/commerce';
import { fetcher as contentfulFetcher } from '@lib/contentful';
import { Layout } from '@components/common';
import {
  OrderView,
  hauteCoutureOrderViewFragment,
} from '@components/haute-couture';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import type { GetHauteCoutureOrderQuery } from 'types/schema';

const getHauteCoutureOrderQuery = /* GraphQL */ `
  query GetHauteCoutureOrder(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    hauteCoutureCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        ...hauteCoutureOrderView
      }
    }
  }

  ${hauteCoutureOrderViewFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const SLUG = 'haute-couture';
  const data = await contentfulFetcher<GetHauteCoutureOrderQuery>({
    query: getHauteCoutureOrderQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
  });

  const entry = data?.hauteCoutureCollection?.items?.[0];

  if (!entry || !entry?.slug) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      // NOTE:
      // pagesは_app→Layout経由で、footerにページリンクとして渡される。
      // pages,
    },
    revalidate: 60 * 60,
  };
}

export default function Order({
  entry,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <OrderView {...entry} />
  );
}

Order.Layout = Layout;
