import dayjs from 'dayjs';
import cn from 'classnames';
import s from './PickupSection.module.css';
import { renderRichText } from '@lib/contentful/utils/rich-text';
import { Grid, Block, BlockContentPickup } from '@components/ui';
import type { VFC } from 'react';
import type { Maybe, Asset } from 'types/schema';
import type { Site } from 'types/site';

type ItemProps = {
  __typename?: any;
  sys: { id?: Maybe<string> };
  title?: Maybe<string>;
  slug?: Maybe<string>;
  date?: Maybe<any>;
  content?: Maybe<any>;
  image?: Maybe<
    { __typename?: 'Asset' } & Pick<Asset, 'url' | 'title' | 'description'>
  >;
};

type Props = {
  className?: string;
  title?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4';
  items: Array<ItemProps>;
  hasContentTypeTag?: boolean;
  site: Site;
};

const getHref = ({
  __typename,
  slug,
  site,
}: Pick<ItemProps, '__typename' | 'slug'> & Pick<Props, 'site'>) => {
  if (!slug) {
    return undefined;
  }

  let base = '';
  if (site === 'about') {
    if (__typename === 'News') {
      base = '/news';
    }
  } else if (site === 'labo') {
    if (__typename === 'StaffNote') {
      base = '/staff-notes';
    } else if (__typename == 'Interview') {
      base = '/interviews';
    }
  }

  return `${base}/${encodeURIComponent(slug)}`;
};

const PickupSection: VFC<Props> = ({
  className,
  title,
  titleTag: TitleTag = 'h1',
  items,
  hasContentTypeTag = false,
  site,
}) => {
  return (
    <section className={cn(s.root, className)}>
      <TitleTag className={'sr-only'}>{title}</TitleTag>
      <Grid layout={'col-3'} isSlide={true}>
        {items.map((item, index) => (
          <Block
            key={item.sys.id}
            title={index === 0 ? title : undefined}
            titleTag={index === 0 ? 'p' : undefined}
            href={getHref({
              __typename: item.__typename,
              slug: item.slug,
              site,
            })}
            site={site}
          >
            <BlockContentPickup
              title={item.title}
              titleTag="h4"
              date={item.date}
              contentType={
                site === 'labo' && hasContentTypeTag
                  ? item.__typename
                  : undefined
              }
              hasImage={site === 'about' ? false : true}
              imageSrc={item?.image?.url}
              imageAlt={
                item?.image?.description ?? item?.image?.title ?? item.title
              }
            >
              {renderRichText(item?.content, 300)}
            </BlockContentPickup>
          </Block>
        ))}
      </Grid>
    </section>
  );
};

export default PickupSection;
