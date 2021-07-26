import { useRouter } from 'next/router';
import { fetcher } from '@lib/contentful';
import { getAllNavigations } from '@lib/contentful/get-all-navigations';
import { Layout } from '@components/common';
import {
  OrderFormView,
  hauteCoutureOrderFormViewFragment,
} from '@components/haute-couture';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
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
        ...hauteCoutureOrderFormView
      }
    }
  }

  ${hauteCoutureOrderFormViewFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const SLUG = 'haute-couture';
  const dataPromise = fetcher<GetHauteCoutureOrderQuery>({
    query: getHauteCoutureOrderQuery,
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

  if (!entry || !entry?.slug) {
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

export default function OrderForm({
  entry,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <OrderFormView {...entry} />
  );
}

OrderForm.Layout = Layout;
