import { useState, useCallback } from 'react';
import cn from 'classnames';
import s from './Project.module.css';
import {
  Grid,
  Block,
  BlockContentPickup,
  BlockContentPickupLarge,
} from '@components/ui';
import type { VFC } from 'react';

type Props = {
  className?: string;
  title: string;
  site: 'labo';
};

const Project: VFC<Props> = ({ className, title, site }) => {
  const [isPointerEnterLargeBlock, setIsPointerEnterLargeBlock] = useState(
    false
  );
  const onPointerEnter = useCallback(() => {
    setIsPointerEnterLargeBlock(true);
  }, []);
  const onPointerLeave = useCallback(() => {
    setIsPointerEnterLargeBlock(false);
  }, []);

  return (
    <section className={cn(s.root, className)}>
      <h3
        className={cn('block-title', {
          'text-white': isPointerEnterLargeBlock,
          'text-green': !isPointerEnterLargeBlock,
        })}
      >
        {title}
      </h3>
      <div className={cn(s.content)}>
        <Block
          href="/"
          site={site}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          <BlockContentPickupLarge
            title="プロジェクトの記事名入れたり"
            titleTag="h3"
            date="2022.05.05"
          >
            carewill の笈沼やスタッフによる日記。carewill
            の笈沼やスタッフによる日記。carewill の笈沼
            やスタッフによる日記。carewill の笈沼やスタッ フによる日記。carewill
            の笈沼やスタッフによ
          </BlockContentPickupLarge>
        </Block>
        <Grid layout={'col-3'} isSlide={true}>
          <Block href="/" site={site}>
            <BlockContentPickup
              title="プロジェクトの記事名入れるエリアプロジェクトの記事名入れるエリア"
              titleTag="h4"
              date="2020.07.04"
              hasImage={true}
            >
              carewill の笈沼やスタッフによる日記。carewill
              の笈沼やスタッフによる日記。carewill の笈沼
              やスタッフによる日記。carewill の笈沼やスタッ
              フによる日記。carewill の笈沼やスタッフによ
            </BlockContentPickup>
          </Block>
          <Block href="/" site={site}>
            <BlockContentPickup
              title="プロジェクトの記事名入れるエリアプロジェクトの記事名入れるエリアるエリアプロジェクトの記事名入れるエリア"
              titleTag="h4"
              date="2020.07.04"
              hasImage={true}
            >
              carewill の笈沼やスタッフによる日記。carewill
              の笈沼やスタッフによる日記。carewill の笈沼
              やスタッフによる日記。carewill の笈沼やスタッ
              フによる日記。carewill の笈沼やスタッフによ
            </BlockContentPickup>
          </Block>
          <Block href="/" site={site}>
            <BlockContentPickup
              title="プロジェクトの記事名入れるエリア"
              titleTag="h4"
              date="2020.07.04"
              hasImage={true}
            >
              carewill の笈沼やスタッフによる日記。carewill
              の笈沼やスタッフによる日記。carewill の笈沼
              やスタッフによる日記。carewill の笈沼やスタッ
              フによる日記。carewill の笈沼やスタッフによ
            </BlockContentPickup>
          </Block>
        </Grid>
      </div>
    </section>
  );
};

export default Project;
