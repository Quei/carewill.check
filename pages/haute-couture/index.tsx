import { useRouter } from 'next/router';
import { fetcher, getAllNavigations } from '@lib/contentful';
import { Layout } from '@components/common';
import {
  HauteCoutureView,
  hauteCoutureViewFragment,
} from '@components/haute-couture';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import type { GetHauteCoutureQuery } from 'types/schema';

const getHauteCoutureQuery = /* GraphQL */ `
  query GetHauteCouture(
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
        ...hauteCoutureView
      }
    }
  }

  ${hauteCoutureViewFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const SLUG = 'haute-couture';
  const dataPromise = fetcher<GetHauteCoutureQuery>({
    query: getHauteCoutureQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
  });

  const allNavigationsPromise = getAllNavigations({ locale, preview });

  const [data, allNavigations] = await Promise.all([
    dataPromise,
    allNavigationsPromise,
  ]);

  const entry = data?.hauteCoutureCollection?.items?.[0];

  if (!entry) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      allNavigations,
    },
    revalidate: 60 * 60,
  };
}

export default function CustomOrder({
  entry,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!entry) {
    return null;
  }

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <HauteCoutureView {...entry} />
  );
}

CustomOrder.Layout = Layout;
