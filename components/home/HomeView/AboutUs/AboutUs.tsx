import cn from 'classnames';
import s from './AboutUs.module.css';
import { nonNullableFilter } from '@lib/non-nullable-filter';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Grid, Block, PickupSection, BlockContentPickup } from '@components/ui';
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

const dummyNewsPickupItems = [
  {
    sys: {
      id: 'dymmy-news-4',
    },
    title:
      'ケア衣料ブランドケアウィル、本日ブランドサイトをオープン、同時にクラウドファンディングをスタート ～2型のケア衣料新製品を発表～',
    slug: '210831_01_news',
    date: '2021-09-01',
    content:
      '当社は、本日ブランドサイトをオープン致しました。また、同時に応援購入サービスMakuakeにてクラウドファンディングをスタートします。本件についてプレスリリースを配信しましたのでご覧ください。',
  },
  {
    sys: {
      id: 'dummy-news-3',
    },
    title:
      'ケア衣料ブランドcarewill（ケアウィル）(R)︎ブランドサイトとクラウドファンディングを8月末にローンチ予定 ～3型のケア衣料新製品を本日発表～',
    slug: '210730_02_news',
    date: '2021-07-30',
    content:
      '当社は、ブランドサイトとクラウドファンディングを8月末にローンチ予定です。これに伴い、今回のクラウドファンディングで販売予定の3型のケア衣料新製品を本日発表致しました。本件についてプレスリリースを配信しましたのでご覧ください。',
  },
  {
    sys: {
      id: 'dummy-news-2',
    },
    title:
      '“carewill”, care-clothing brand to launch crowdfunding, brand site end of August, provide 3 new products',
    slug: '210730_01_news',
    date: '2021-07-30',
    content:
      'carewill will launch a brand site and cloud funding at the same time end of August and start to provide three new products of care-clothing by crowdfunding. >Show details',
  },
];

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
      {/* dummy pickups start*/}
      <Grid layout={'col-3'} isSlide={true}>
        {dummyNewsPickupItems.map((item, index) => (
          <Block
            key={item.sys.id}
            title={index === 0 ? f('about.newsPickup') : undefined}
            titleTag={index === 0 ? 'p' : undefined}
            href={`/news/${item.slug}`}
            site={'about'}
          >
            <BlockContentPickup
              title={item.title}
              titleTag="h4"
              date={item.date}
              hasImage={false}
            >
              {item.content}
            </BlockContentPickup>
          </Block>
        ))}
      </Grid>
      {/* dummy pickups end */}
      <Grid className={cn({ ['col-3']: menuList && menuList?.length > 6 })}>
        {menuList &&
          menuList.map((menu, index) => (
            <Block
              key={`about-menu-list-item-${index}`}
              title={menu.key}
              href={menu.value !== '' ? menu.value : undefined}
              site={SITE}
            />
          ))}
      </Grid>
    </Section>
  );
};

export default AboutUs;
