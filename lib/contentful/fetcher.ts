import handleFetchResponse from './utils/handle-fetch-response';
import type { Site } from 'types/site';

const CONTENTFUL_ENDPOINT_BASE =
  'https://graphql.contentful.com/content/v1/spaces';
const ENDPOINTS = {
  store: {
    url: `${CONTENTFUL_ENDPOINT_BASE}/${process.env.CONTENTFUL_STORE_SPACE_ID}`,
    accessToken: process.env.CONTENTFUL_STORE_ACCESS_TOKEN,
    previewAccessToken: process.env.CONTENTFUL_STORE_PREVIEW_ACCESS_TOKEN,
  },
  labo: {
    url: `${CONTENTFUL_ENDPOINT_BASE}/${process.env.CONTENTFUL_LABO_SPACE_ID}`,
    accessToken: process.env.CONTENTFUL_LABO_ACCESS_TOKEN,
    previewAccessToken: process.env.CONTENTFUL_LABO_PREVIEW_ACCESS_TOKEN,
  },
  about: {
    url: `${CONTENTFUL_ENDPOINT_BASE}/${process.env.CONTENTFUL_ABOUT_SPACE_ID}`,
    accessToken: process.env.CONTENTFUL_ABOUT_ACCESS_TOKEN,
    previewAccessToken: process.env.CONTENTFUL_ABOUT_PREVIEW_ACCESS_TOKEN,
  },
};

type FetcherOptions = {
  query?: string;
  method?: string;
  variables?: any;
  site?: Site;
};

type Fetcher = <T>(options: FetcherOptions) => T | Promise<T>;

export const fetcher: Fetcher = async ({
  query,
  method = 'POST',
  variables,
  site = 'store',
}) => {
  const endpoint = ENDPOINTS[site];
  return handleFetchResponse(
    await fetch(endpoint.url, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          variables?.preview
            ? endpoint.previewAccessToken
            : endpoint.accessToken
        }`,
      },
    })
  );
};

export default fetcher;
