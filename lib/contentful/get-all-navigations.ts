import { fetcher } from '@lib/contentful';
import type { GetStaticPropsContext } from 'next';
import type {
  GetNavigationStoreQuery,
  GetNavigationLaboQuery,
  GetNavigationAboutQuery,
} from 'types/schema';

const getNavigationStoreQuery = /* GraphQL */ `
  query GetNavigationStore(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    navigationCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        menu
        sns
      }
    }
  }
`;

const getNavigationLaboQuery = /* GraphQL */ `
  query GetNavigationLabo(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    navigationCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        menu
      }
    }
  }
`;

const getNavigationAboutQuery = /* GraphQL */ `
  query GetNavigationAbout(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    navigationCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        menu
      }
    }
  }
`;

type GetAllNavigations = Pick<GetStaticPropsContext, 'locale' | 'preview'>;
export const getAllNavigations = async ({
  locale,
  preview,
}: GetAllNavigations) => {
  const SLUG = 'navigation';
  const storePromise = fetcher<GetNavigationStoreQuery>({
    query: getNavigationStoreQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
  });

  const laboPromise = fetcher<GetNavigationLaboQuery>({
    query: getNavigationLaboQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
    site: 'labo',
  });

  const aboutPromise = fetcher<GetNavigationAboutQuery>({
    query: getNavigationAboutQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
    site: 'about',
  });

  const [storeData, laboData, aboutData] = await Promise.all([
    storePromise,
    laboPromise,
    aboutPromise,
  ]);
  const store = storeData?.navigationCollection?.items?.[0];
  const labo = laboData?.navigationCollection?.items?.[0];
  const about = aboutData?.navigationCollection?.items?.[0];

  return {
    store,
    labo,
    about,
  };
};
