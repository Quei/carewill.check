import { useMemo } from 'react';
import cn from 'classnames';
import s from './LaboRelatedPosts.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { PickupSection } from '@components/ui';
import type { VFC } from 'react';
import type { Maybe, RelatedStaffNoteFragment } from 'types/schema';

export type RelatedPosts = {
  staffNotes: Maybe<RelatedStaffNoteFragment>[];
};

type Props = {
  className?: string;
  relatedPosts?: RelatedPosts;
};

export const relatedStaffNoteFragment = /* GraphQL */ `
  fragment relatedStaffNote on StaffNote {
    __typename
    sys {
      id
    }
    title
    slug
    date
    content {
      json
    }
    image {
      url
      title
      description
    }
  }
`;

// export const relatedInterviewFragment = /* GraphQL */ `
//   fragment relatedInterview on StaffNote {
//     __typename
//     sys {
//       id
//     }
//     title
//     slug
//     date
//     content {
//       json
//     }
//     image {
//       url
//       title
//       description
//     }
//   }
// `;

const useRelatedPosts = ({ relatedPosts }: Pick<Props, 'relatedPosts'>) => {
  // NOTE:
  // interviewが追加されたり、手動処理が入った場合、
  // ここで制御する

  return useMemo(() => {
    return relatedPosts?.staffNotes.filter(nonNullableFilter);
  }, [relatedPosts]);
};

const LaboRelatedPosts: VFC<Props> = ({ className, relatedPosts }) => {
  const f = useIntlMessage();

  const items = useRelatedPosts({ relatedPosts });
  if (!items?.length) {
    return null;
  }
  return (
    <PickupSection
      className={cn(className)}
      title={f('pickup')}
      items={items}
      hasContentTypeTag={true}
      site="labo"
    />
  );
};

export default LaboRelatedPosts;
