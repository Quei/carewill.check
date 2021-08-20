import cn from 'classnames';
import s from './Labo.module.css';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Section } from '../Section';
import type { VFC } from 'react';
import type {
  HomeLaboViewFragment,
  HomeLaboLatestStaffNoteFragment,
} from 'types/schema';

const SITE = 'labo';

export type Props = HomeLaboViewFragment & {
  className?: string;
  latestStaffNote?: HomeLaboLatestStaffNoteFragment | null;
};

export const homeLaboViewFragment = /* GraphQL */ `
  fragment homeLaboView on Home {
    description {
      json
    }
  }
  fragment homeLaboLatestStaffNote on StaffNote {
    content {
      json
    }
  }
`;

const Labo: VFC<Props> = ({ className, description, latestStaffNote }) => {
  return (
    <Section
      className={cn(s.root)}
      title={'Labo'}
      description={renderRichTextReact(description)}
    ></Section>
  );
};

export default Labo;
