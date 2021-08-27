import cn from 'classnames';
import s from './AboutUs.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Grid, Block, PickupSection } from '@components/ui';
import { Section } from '../Section';
import type { VFC } from 'react';
import type {
  HomeAboutViewFragment,
  NavigationAboutFragment,
} from 'types/schema';
import type { Repeater } from 'types/all-navigations';

const SITE = 'about';

export type Props = HomeAboutViewFragment & {
  className?: string;
  navigation?: NavigationAboutFragment;
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
  navigation,
}) => {
  const f = useIntlMessage();
  const nonNullableNewsPickUps = newsPickupCollection?.items.filter(
    nonNullableFilter
  );
  const menuList = navigation?.menu ? (navigation.menu as Repeater[]) : null;
  return (
    <Section title={'About us'} description={renderRichTextReact(description)}>
      {/* {nonNullableNewsPickUps && (
        <PickupSection
          title={f('about.newsPickup')}
          titleTag="h3"
          items={nonNullableNewsPickUps}
          site={SITE}
        />
      )} */}
      <Grid layout={'col-3'}>
        {menuList &&
          menuList.map((menu, index) => (
            <Block
              key={`about-menu-list-item-${index}`}
              title={menu.key}
              href={menu.value !== '' ? menu.value : undefined}
              site={SITE}
              isClose={menu.value === ''}
            />
          ))}
      </Grid>
    </Section>
  );
};

export default AboutUs;
