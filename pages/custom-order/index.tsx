import { useRouter } from 'next/router';
import { fetcher, getAllNavigations, getFooter } from '@lib/contentful';
import { Layout } from '@components/common';
import {
  CustomOrderView,
  customOrderViewFragment,
} from '@components/custom-order';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import type { GetCustomOrderQuery } from 'types/schema';

const getCustomOrderQuery = /* GraphQL */ `
  query GetCustomOrder(
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
        ...customOrderView
      }
    }
  }

  ${customOrderViewFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const SLUG = 'custom-order';

  const dataPromise = fetcher<GetCustomOrderQuery>({
    query: getCustomOrderQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
    site: 'store',
  });

  const allNavigationsPromise = getAllNavigations({ locale, preview });

  const footerPromise = getFooter({ locale, preview });

  const [data, allNavigations, footerData] = await Promise.all([
    dataPromise,
    allNavigationsPromise,
    footerPromise,
  ]);

  const entry = data?.customOrderCollection?.items?.[0];

  if (!entry) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      allNavigations,
      footer: footerData.footer,
    },
    revalidate: 200,
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
    <CustomOrderView {...entry} />
  );
}

CustomOrder.Layout = Layout;
