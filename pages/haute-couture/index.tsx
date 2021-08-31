import {
  fetcher,
  getAllNavigations,
  getFooter,
  getLaboRelatedPosts,
} from '@lib/contentful';
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

  const relatedPostsPromise = getLaboRelatedPosts({
    locale,
    preview,
    slug: SLUG,
  });
  const allNavigationsPromise = getAllNavigations({ locale, preview });
  const footerPromise = getFooter({ locale, preview });

  const [data, relatedPosts, allNavigations, footerData] = await Promise.all([
    dataPromise,
    relatedPostsPromise,
    allNavigationsPromise,
    footerPromise,
  ]);

  const entry = data?.hauteCoutureCollection?.items?.[0];

  if (!entry) {
    throw new Error(`Contentful Data with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      entry,
      relatedPosts,
      allNavigations,
      footer: footerData.footer,
    },
    revalidate: 60 * 60,
  };
}

export default function HauteCouture({
  entry,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!entry) {
    return null;
  }
  return <HauteCoutureView {...entry} relatedPosts={relatedPosts} />;
}

HauteCouture.Layout = Layout;
