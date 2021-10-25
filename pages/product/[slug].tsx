import {
  fetcher,
  getAllNavigations,
  getFooter,
  getLaboRelatedPosts,
} from '@lib/contentful';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import {
  ProductSingleView,
  productSingleViewFragment,
} from '@components/product';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import type {
  GetProductSingleQuery,
  GetProductSinglePathsQuery,
} from 'types/schema';

const getProductSingleQuery = /* GraphQL */ `
  query GetProductSingle(
    $locale: String!
    $slug: String!
    $preview: Boolean = false
  ) {
    productCollection(
      locale: $locale
      where: { slug: $slug }
      preview: $preview
      limit: 1
    ) {
      items {
        ...ProductSingleView
      }
    }
  }

  ${productSingleViewFragment}
`;

const getProductSinglePaths = /* GraphQL */ `
  query GetProductSinglePaths {
    productCollection {
      items {
        slug
      }
    }
  }
`;

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug!;
  const config = { locale, locales };
  const productPromise = await commerce.getProduct({
    variables: { slug },
    config,
    preview,
  });

  const productContentfulPromise = fetcher<GetProductSingleQuery>({
    query: getProductSingleQuery,
    variables: {
      locale,
      slug,
      preview,
    },
    site: 'store',
  });

  const relatedPostsPromise = getLaboRelatedPosts({
    locale,
    preview,
    slug,
  });

  const allNavigationsPromise = getAllNavigations({ locale, preview });

  const footerPromise = getFooter({ locale, preview });

  const [
    productData,
    productContentData,
    relatedPosts,
    allNavigations,
    footerData,
  ] = await Promise.all([
    productPromise,
    productContentfulPromise,
    relatedPostsPromise,
    allNavigationsPromise,
    footerPromise,
  ]);

  const { product } = productData;
  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found on shopify`);
  }

  const productContent = productContentData?.productCollection?.items[0];
  if (!productContent) {
    throw new Error(
      `Product with slug '${params!.slug}' not found on contentful`
    );
  }

  return {
    props: {
      product,
      productContent,
      relatedPosts,
      allNavigations,
      footer: footerData.footer,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const postsPromise = fetcher<GetProductSinglePathsQuery>({
    query: getProductSinglePaths,
    site: 'store',
  });
  const [postsData] = await Promise.all([postsPromise]);
  const paths = postsData?.productCollection?.items?.flatMap((item) => {
    return locales?.map((locale) => {
      return {
        params: { slug: item?.slug },
        locale,
      };
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Post({
  product,
  productContent,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ProductSingleView
      product={product}
      productContent={productContent}
      relatedPosts={relatedPosts}
    />
  );
}

Post.Layout = Layout;
