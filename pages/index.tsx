import commerce from '@lib/api/commerce';
import { fetcher } from '@lib/contentful';
import { getAllNavigations } from '@lib/contentful/get-all-navigations';
import { Layout } from '@components/common';
import {
  HomeView,
  homeStoreViewFragment,
  homeLaboViewFragment,
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
        ...homeStoreView
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
        ...homeLaboView
      }
    }
  }

  ${homeLaboViewFragment}
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
        ...homeAboutView
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

  const [storeData, laboData, aboutData, allNavigations] = await Promise.all([
    storePromise,
    laboPromise,
    aboutPromise,
    allNavigationsPromise,
  ]);
  const store = storeData?.homeCollection?.items?.[0];
  const labo = laboData?.homeCollection?.items?.[0];
  const about = aboutData?.homeCollection?.items?.[0];

  return {
    props: {
      products,
      brands,
      pages,
      store,
      labo,
      about,
      allNavigations,
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HomeView
        store={store ?? undefined}
        labo={labo ?? undefined}
        about={about ?? undefined}
      />
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  );
}

Home.Layout = Layout;
