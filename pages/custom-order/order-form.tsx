import commerce from '@lib/api/commerce';
import { fetcher, getAllNavigations, getFooter } from '@lib/contentful';
import { Layout } from '@components/common';
import {
  OrderFormView,
  customOrderOrderFormViewFragment,
} from '@components/custom-order';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
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
        ...CustomOrderOrderFormView
      }
    }
  }

  ${customOrderOrderFormViewFragment}
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const SLUG = 'custom-order';
  const dataPromise = fetcher<GetCustomOrderOrderQuery>({
    query: getCustomOrderOrderQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
  });

  const allNavigationsPromise = getAllNavigations({ locale, preview });

  const footerPromise = getFooter({ locale, preview });

  const config = { locale, locales };
  const productPromise = commerce.getProduct({
    variables: { slug: SLUG },
    config,
    preview,
  });

  const [data, productData, allNavigations, footerData] = await Promise.all([
    dataPromise,
    productPromise,
    allNavigationsPromise,
    footerPromise,
  ]);

  const entry = data?.customOrderCollection?.items?.[0];

  if (!entry || !entry?.slug) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  const { product } = productData;

  if (!product) {
    throw new Error(`Shopify Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      product,
      allNavigations,
      footer: footerData.footer,
    },
    revalidate: 60 * 60,
  };
}

export default function Order({
  entry,
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <OrderFormView {...entry} product={product} />;
}

Order.Layout = Layout;
