import cn from 'classnames';
import s from './AboutUs.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Grid, Block, PickupSection } from '@components/ui';
import { Section } from '../Section';
import type { VFC } from 'react';
import type { HomeAboutViewFragment } from 'types/schema';

const SITE = 'about';

type Props = HomeAboutViewFragment & {
  className?: string;
};

export const homeAboutViewFragment = /* GraphQL */ `
  fragment homeAboutView on Home {
    description {
      json
    }
    newsPickupCollection(limit: 3) {
      items {
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
      }
    }
  }
`;

const AboutUs: VFC<Props> = ({
  className,
  description,
  newsPickupCollection,
}) => {
  const f = useIntlMessage();
  const nonNullableNewsPickUps = newsPickupCollection?.items.filter(
    nonNullableFilter
  );
  return (
    <Section title={'About us'} description={renderRichTextReact(description)}>
      {nonNullableNewsPickUps && (
        <PickupSection
          title={f('newsPickup')}
          titleTag="h3"
          items={nonNullableNewsPickUps}
          site={SITE}
        />
      )}
      <Grid layout={'col-3'}>
        <Block title="ニュース" href="/news" site={SITE} />
        <Block title="プロダクトについて" href="/product" site={SITE} />
        <Block title="サービスについて" href="/service" site={SITE} />
        <Block title="クラフトマンシップ" href="/craftmanship" site={SITE} />
        <Block
          title="ミッションステートメント"
          href="/mission-statement"
          site={SITE}
        />
        <Block title="会社情報" href="/company" site={SITE} />
      </Grid>
    </Section>
  );
};

export default AboutUs;
