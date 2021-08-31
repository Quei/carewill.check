import { fetcher } from '@lib/contentful';
import { relatedStaffNoteFragment } from '@components/common/LaboRelatedPosts';
import type { GetStaticPropsContext } from 'next';
import type { GetAllStaffNotesByCategoryQuery } from 'types/schema';

type Props = Pick<GetStaticPropsContext, 'locale' | 'preview'> & {
  slug: string;
};

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
        linkedFrom {
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
      }
    }
  }

  ${relatedStaffNoteFragment}
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

const fetchAll = async <T extends GetAllStaffNotesByCategoryQuery>({
  locale,
  preview,
  slug,
  query,
  collectionName,
}: Props & { query: string; collectionName: 'staffNoteCollection' }) => {
  const limit = 100;
  let page = 0;
  let shouldQueryMorePosts = true;
  const posts = [];

  while (shouldQueryMorePosts) {
    const response = await fetcher<T>({
      query,
      variables: {
        locale,
        preview,
        slug,
        limit,
        skip: page * limit,
      },
      site: 'labo',
    });

    const category = response?.categoryCollection?.items?.[0];
    const collection = category?.linkedFrom?.[collectionName];

    if (collection?.items?.length) {
      posts.push(...collection.items);
      shouldQueryMorePosts = posts.length < collection.total;
    } else {
      shouldQueryMorePosts = false;
    }

    page++;
  }
  return posts;
};

export const getLaboRelatedPosts = async ({ locale, preview, slug }: Props) => {
  const staffNotes = await fetchAll<GetAllStaffNotesByCategoryQuery>({
    locale,
    preview,
    slug,
    query: getAllStaffNotesByCategoryQuery,
    collectionName: 'staffNoteCollection',
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
