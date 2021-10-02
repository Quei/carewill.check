import { sleep } from '@lib/sleep';
import { fetcher } from '@lib/contentful';
import { fetchAll } from '@lib/contentful/utils/fetch-all';
import {
  relatedStaffNoteFragment,
  relatedInterviewFragment,
} from '@components/common/LaboRelatedPosts';
import type { GetStaticPropsContext } from 'next';
import type {
  GetAllStaffNotesByCategoryQuery,
  RelatedStaffNotesFragment,
  RelatedStaffNoteFragment,
  GetAllInterviewsByCategoryQuery,
  RelatedInterviewsFragment,
  RelatedInterviewFragment,
} from 'types/schema';

type Props = Pick<GetStaticPropsContext, 'locale' | 'preview'> & {
  slug: string;
};

const relatedStaffNotes = /* GraphQL */ `
  fragment RelatedStaffNotes on CategoryLinkingCollections {
    staffNoteCollection(
      locale: $locale
      preview: $preview
      limit: $limit
      skip: $skip
    ) {
      total
      items {
        ...RelatedStaffNote
      }
    }
  }
  ${relatedStaffNoteFragment}
`;

const getAllStaffNotesByCategoryQuery = /* GraphQL */ `
  query GetAllStaffNotesByCategory(
    $locale: String!
    $preview: Boolean = false
    $slug: String!
    $limit: Int = 100
    $skip: Int = 0
  ) {
    categoryCollection(
      locale: $locale
      preview: $preview
      limit: 1
      where: { slug: $slug }
    ) {
      items {
        title
        linkedFrom(allowedLocales: ["ja", "en"]) {
          ...RelatedStaffNotes
        }
      }
    }
  }

  ${relatedStaffNotes}
`;

const relatedInterviews = /* GraphQL */ `
  fragment RelatedInterviews on CategoryLinkingCollections {
    interviewCollection(
      locale: $locale
      preview: $preview
      limit: $limit
      skip: $skip
    ) {
      total
      items {
        ...RelatedInterview
      }
    }
  }
  ${relatedInterviewFragment}
`;

const getAllInterviewsByCategoryQuery = /* GraphQL */ `
  query GetAllInterviewsByCategory(
    $locale: String!
    $preview: Boolean = false
    $slug: String!
    $limit: Int = 100
    $skip: Int = 0
  ) {
    categoryCollection(
      locale: $locale
      preview: $preview
      limit: 1
      where: { slug: $slug }
    ) {
      items {
        title
        linkedFrom(allowedLocales: ["ja", "en"]) {
          ...RelatedInterviews
        }
      }
    }
  }

  ${relatedInterviews}
`;

const pickCollectionStaffNotes = <C>(
  response: GetAllStaffNotesByCategoryQuery
) => {
  return response.categoryCollection?.items?.[0]?.linkedFrom
    ?.staffNoteCollection as C | undefined;
};

const pickCollectionInterviews = <C>(
  response: GetAllInterviewsByCategoryQuery
) => {
  return response.categoryCollection?.items?.[0]?.linkedFrom
    ?.interviewCollection as C | undefined;
};

type ItemHasDate =
  | Pick<RelatedStaffNoteFragment, 'date'>
  | Pick<RelatedInterviewFragment, 'date'>
  | null;
const sortByDate = (a: ItemHasDate, b: ItemHasDate) => {
  const aDate = new Date(a?.date);
  const bDate = new Date(b?.date);
  return bDate > aDate ? 1 : bDate < aDate ? -1 : 0;
};

export const getLaboRelatedPosts = async ({ locale, preview, slug }: Props) => {
  const staffNotes = await fetchAll<
    GetAllStaffNotesByCategoryQuery,
    NonNullable<RelatedStaffNotesFragment['staffNoteCollection']>
  >({
    site: 'labo',
    locale,
    preview,
    slug,
    query: getAllStaffNotesByCategoryQuery,
    pickCollection: pickCollectionStaffNotes,
  });

  const interviews = await fetchAll<
    GetAllInterviewsByCategoryQuery,
    NonNullable<RelatedInterviewsFragment['interviewCollection']>
  >({
    site: 'labo',
    locale,
    preview,
    slug,
    query: getAllInterviewsByCategoryQuery,
    pickCollection: pickCollectionInterviews,
  });

  // NOTE:
  // mergeしてsortする。
  const relatedPosts = [...staffNotes, ...interviews];
  relatedPosts.sort(sortByDate);

  return relatedPosts.slice(0, 3);
};
