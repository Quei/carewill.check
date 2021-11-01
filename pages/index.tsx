import commerce from '@lib/api/commerce';
import { fetcher, getAllNavigations, getFooter } from '@lib/contentful';
import { Layout } from '@components/common';
import {
  HomeView,
  homeStoreViewFragment,
  homeLaboViewFragment,
  homeLaboLatestStaffNoteFragment,
  homeAboutViewFragment,
} from '@components/home';
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import type {
  GetHomeStoreQuery,
  GetHomeLaboQuery,
  GetHomeAboutQuery,
} from 'types/schema';

const getHomeStoreQuery = /* GraphQL */ `
  query GetHomeStore(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    homeCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        ...HomeStoreView
      }
    }
  }

  ${homeStoreViewFragment}
`;

const getHomeLaboQuery = /* GraphQL */ `
  query GetHomeLabo(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    homeCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        ...HomeLaboView
      }
    }
    staffNoteCollection(
      locale: $locale
      preview: $preview
      order: date_DESC
      limit: 1
    ) {
      items {
        ...HomeLaboLatestStaffNote
      }
    }
  }

  ${homeLaboViewFragment}
  ${homeLaboLatestStaffNoteFragment}
`;

const getHomeAboutQuery = /* GraphQL */ `
  query GetHomeAbout(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    homeCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        ...HomeAboutView
      }
    }
  }

  ${homeAboutViewFragment}
`;

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales };
  const { products } = await commerce.getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  });
  const { brands } = await commerce.getSiteInfo({
    config,
    preview,
  });
  const { pages } = await commerce.getAllPages({ config, preview });

  const SLUG = 'home';
  const storePromise = fetcher<GetHomeStoreQuery>({
    query: getHomeStoreQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
  });
  const laboPromise = fetcher<GetHomeLaboQuery>({
    query: getHomeLaboQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
    site: 'labo',
  });
  const aboutPromise = fetcher<GetHomeAboutQuery>({
    query: getHomeAboutQuery,
    variables: {
      locale,
      slug: SLUG,
      preview,
    },
    site: 'about',
  });

  const allNavigationsPromise = getAllNavigations({ locale, preview });

  const footerPromise = getFooter({ locale, preview });

  const [
    storeData,
    laboData,
    aboutData,
    allNavigations,
    footerData,
  ] = await Promise.all([
    storePromise,
    laboPromise,
    aboutPromise,
    allNavigationsPromise,
    footerPromise,
  ]);
  const store = storeData?.homeCollection?.items?.[0];
  const labo = laboData?.homeCollection?.items?.[0];
  const latestStaffNote = laboData?.staffNoteCollection?.items?.[0];
  const about = aboutData?.homeCollection?.items?.[0];

  return {
    props: {
      products,
      brands,
      pages,
      store,
      labo: { ...labo, latestStaffNote },
      about,
      allNavigations,
      footer: footerData.footer,
      isSiteRoot: true,
    },
    // revalidate: 14400,
    revalidate: 60 * 30,
  };
}

export default function Home({
  products,
  brands,
  pages,
  store,
  labo,
  about,
  allNavigations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HomeView
        store={store ?? undefined}
        labo={labo ?? undefined}
        about={about ?? undefined}
        aboutNavigation={allNavigations.about}
      />
    </>
  );
}

Home.Layout = Layout;
