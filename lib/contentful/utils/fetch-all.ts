import { fetcher } from '@lib/contentful';
import { sleep } from '@lib/sleep';
import type { GetStaticPropsContext } from 'next';
import type { Site } from 'types/site';

type CollectionBaseType = {
  total: number;
  items: Array<unknown>;
};
type FetchAllProps<Q> = Pick<GetStaticPropsContext, 'locale' | 'preview'> & {
  site: Site;
  query: string;
  slug?: string;
  pickCollection: <C>(arg: Q) => C | undefined | null;
};
export const fetchAll = async <
  QueryType,
  CollectionType extends CollectionBaseType
>({
  site,
  query,
  locale,
  preview,
  slug,
  pickCollection,
}: FetchAllProps<QueryType>) => {
  const limit = 100;
  let page = 0;
  let shouldQueryMorePosts = true;
  const posts: CollectionType['items'] = [];

  while (shouldQueryMorePosts) {
    const response = await fetcher<QueryType>({
      query,
      variables: {
        locale,
        preview,
        slug,
        limit,
        skip: page * limit,
      },
      site,
    });
    const collection = pickCollection<CollectionType>(response);
    if (collection?.items?.length) {
      posts.push(...collection.items);
      shouldQueryMorePosts = posts.length < collection.total;
    } else {
      shouldQueryMorePosts = false;
    }
    sleep(300);
    page++;
  }

  return posts;
};
