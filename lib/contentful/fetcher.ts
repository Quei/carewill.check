import handleFetchResponse from './utils/handle-fetch-response';

type FetcherOptions = {
  query?: string;
  method?: string;
  variables?: any;
};

type Fetcher = <T>(options: FetcherOptions) => T | Promise<T>;

export const fetcher: Fetcher = async ({
  query,
  method = 'POST',
  variables,
}) => {
  return handleFetchResponse(
    await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method,
        body: JSON.stringify({ query, variables }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            variables?.preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
      }
    )
  );
};

export default fetcher;
