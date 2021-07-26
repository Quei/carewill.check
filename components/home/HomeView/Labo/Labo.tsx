import cn from 'classnames';
import s from './Labo.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import {
  Grid,
  Block,
  BlockContent,
  BlockContentPickup,
  BlockContentPickupLarge,
  Container,
} from '@components/ui';
import { Section } from '../Section';
import { Project } from './Project';
import type { VFC } from 'react';
import type { HomeLaboViewFragment } from 'types/schema';

const SITE = 'labo';

type Props = HomeLaboViewFragment & {
  className?: string;
};

export const homeLaboViewFragment = /* GraphQL */ `
  fragment homeLaboView on Home {
    description {
      json
    }
  }
`;

const Labo: VFC<Props> = ({ className, description }) => {
  const f = useIntlMessage();
  return (
    <Section
      className={cn(s.root)}
      title={'Labo'}
      description={renderRichTextReact(description)}
    >
      <Grid>
        <Block title={'取材記事'} titleTag="h3" href="/" site={SITE}>
          <BlockContent>
            carewill に寄せられた声から生まれたプロジェ
            クトや、パートナーシップから生まれた挑戦を 連載しています。carewill
            に寄せられた声から 生まれたプロジェクトや、パートナーシップか
          </BlockContent>
        </Block>
        <Block
          title={'スタッフノート'}
          titleTag="h3"
          href="/staff-note"
          site={SITE}
        >
          <BlockContent>
            carewill の笈沼やスタッフによる日記。carewill
            の笈沼やスタッフによる日記。carewill の笈沼
            やスタッフによる日記。carewill の笈沼やスタッ フによる日記。carewill
            の笈沼やスタッフによ
          </BlockContent>
        </Block>
      </Grid>
      <Project title={'プロジェクトピックアップ'} site={SITE} />
      <section>
        <Block title={'募集'} titleTag="h3" href="/" site={SITE}>
          <BlockContentPickupLarge isImageLayoutCenter={true}>
            CF会員のリターン提供期間終了後（11月末）にCF会員をメンバーシップへ誘導するという話をしましたので、8/1
            BSリリース時は存在しませんから、となると募集の中身は「パートナーシップ」のみとなり、であれば、「パートナーシップ」で良いと思いました。
          </BlockContentPickupLarge>
        </Block>
      </section>
    </Section>
  );
};

export default Labo;
