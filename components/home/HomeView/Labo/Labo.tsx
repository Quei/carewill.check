import cn from 'classnames';
import s from './Labo.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import {
  Grid,
  Block,
  BlockContent,
  BlockContentPickupLarge,
} from '@components/ui';
import { Section } from '../Section';
import { Pickup } from './Pickup';
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
  fragment HomeLaboView on Home {
    description {
      json
    }
    interviewImage {
      url
    }
    interviewHomeDescription {
      json
    }
    staffNoteHomeDescription {
      json
    }
    recruitingImage {
      url
    }
    recruitingHomeDescription {
      json
    }
  }
`;

export const homeLaboLatestStaffNoteFragment = /* GraphQL */ `
  fragment HomeLaboLatestStaffNote on StaffNote {
    content {
      json
    }
  }
`;

const Labo: VFC<Props> = ({
  className,
  description,
  interviewImage,
  interviewHomeDescription,
  staffNoteHomeDescription,
  recruitingImage,
  recruitingHomeDescription,
  latestStaffNote,
}) => {
  const f = useIntlMessage();
  return (
    <Section title={'Labo'} description={renderRichTextReact(description)}>
      <Grid>
        {interviewImage && interviewHomeDescription && (
          <Block
            title={f('labo.interviews')}
            titleTag="h3"
            href="https://www.makuake.com/project/carewill/"
          >
            <BlockContent
              image={{ src: interviewImage.url, alt: f('store.product') }}
            >
              {renderRichTextReact(interviewHomeDescription)}
              <p>
                <span className={cn('underline')}>{f('makuakeLink')}</span>
              </p>
            </BlockContent>
          </Block>
        )}
        <Block
          title={f('labo.staffNotes')}
          titleTag="h3"
          href="/staff-notes"
          site={SITE}
        >
          <BlockContent
            image={{
              node: (
                <div
                  className={cn(
                    'bg-light-gray',
                    'text-2xl',
                    'overflow-hidden',
                    s.staffNoteImageTexts
                  )}
                >
                  <p>{renderRichText(latestStaffNote?.content)}</p>
                </div>
              ),
            }}
          >
            {renderRichTextReact(staffNoteHomeDescription)}
          </BlockContent>
        </Block>
      </Grid>
      {/* <Pickup title={f('labo.interviewsPickup')} site={SITE} /> */}
      <section>
        <Block
          title={f('labo.recruiting')}
          titleTag="h3"
          href="/recruiting/partnership"
          site={SITE}
        >
          <BlockContentPickupLarge
            imageSrc={recruitingImage?.url}
            imageAlt={f('labo.recruiting')}
            isImageLayoutCenter={true}
            disableLineClamp={true}
          >
            {renderRichTextReact(recruitingHomeDescription)}
          </BlockContentPickupLarge>
        </Block>
      </section>
    </Section>
  );
};

export default Labo;
