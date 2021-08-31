import { fetcher, getAllNavigations, getFooter } from '@lib/contentful';
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

  const footerPromise = getFooter({ locale, preview });

  const [data, allNavigations, footerData] = await Promise.all([
    dataPromise,
    allNavigationsPromise,
    footerPromise,
  ]);

  const entry = data?.hauteCoutureCollection?.items?.[0];

  if (!entry || !entry?.slug) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      allNavigations,
      footer: footerData.footer,
    },
    revalidate: 60 * 60,
  };
}

export default function OrderForm({
  entry,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <OrderFormView {...entry} />;
}

OrderForm.Layout = Layout;
