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
      `https://${process.env.PRISMIC_REPOSITORY_NAME}.cdn.prismic.io/graphql`,
      {
        method,
        body: JSON.stringify({ query, variables }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            variables?.preview
              ? process.env.PRISMIC_ACCESS_TOKEN
              : process.env.PRISMIC_ACCESS_TOKEN
          }`,
        },
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${
        //     variables?.preview
        //       ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
        //       : process.env.PRISMIC_ACCESS_TOKEN
        //   }`,
        // },
      }
    )
  );
};

export default fetcher;
