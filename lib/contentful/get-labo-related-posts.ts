import { sleep } from '@lib/sleep';
import { fetcher } from '@lib/contentful';
import { fetchAll } from '@lib/contentful/utils/fetch-all';
import { relatedStaffNoteFragment } from '@components/common/LaboRelatedPosts';
import type { GetStaticPropsContext } from 'next';
import type {
  GetAllStaffNotesByCategoryQuery,
  RelatedStaffNotesFragment,
} from 'types/schema';

type Props = Pick<GetStaticPropsContext, 'locale' | 'preview'> & {
  slug: string;
};

const RelatedStaffNotes = /* GraphQL */ `
  fragment RelatedStaffNotes on CategoryLinkingCollections {
    staffNoteCollection(
      locale: $locale
      preview: $preview
      limit: $limit
      skip: $skip
    ) {
      total
      items {
        ...relatedStaffNote
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

  ${RelatedStaffNotes}
`;

// const getAllInterviewsByCategoryQuery = /* GraphQL */ `
//   query GetAllInterviewsByCategory(
//     $locale: String!
//     $preview: Boolean = false
//     $slug: String!
//     $limit: Int = 100
//     $skip: Int = 0
//   ) {
//     categoryCollection(
//       locale: $locale
//       preview: $preview
//       limit: 1
//       where: { slug: $slug }
//     ) {
//       items {
//         title
//         linkedFrom {
//           interviewCollection(
//             locale: $locale
//             preview: $preview
//             limit: $limit
//             skip: $skip
//           ) {
//             total
//             items {
//               ...relatedInterview
//             }
//           }
//         }
//       }
//     }
//   }

//   ${relatedInterviewFragment}
// `;

const pickCollectionStaffNotes = <C>(
  response: GetAllStaffNotesByCategoryQuery
) => {
  return response.categoryCollection?.items?.[0]?.linkedFrom
    ?.staffNoteCollection as C | undefined;
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

  // NOTE:
  // sortする。
  staffNotes.sort((a, b) => {
    const aDate = new Date(a?.date);
    const bDate = new Date(b?.date);
    return bDate > aDate ? 1 : bDate < aDate ? -1 : 0;
  });

  return {
    staffNotes: staffNotes.slice(0, 3),
  };
};
