import React, { FC, useState } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './OrderView.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Button, Checkbox, OrderFormSection } from '@components/ui';
import {
  CheckboxesWithImages,
  checkboxesWithImagesImageFragment,
} from '@components/common';
import type { HauteCoutureOptions } from 'types/haute-couture-options';
import type { HauteCoutureOrderViewFragment } from 'types/schema';

type Props = HauteCoutureOrderViewFragment & {
  className?: string;
};

export const hauteCoutureOrderViewFragment = /* GraphQL */ `
  fragment hauteCoutureOrderView on HauteCouture {
    title
    description {
      json
    }
    slug
  }
`;

const OrderView: FC<Props> = ({ title, description, slug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HauteCoutureOptions>();

  const onSubmit: SubmitHandler<HauteCoutureOptions> = (data) => {
    console.log(data);
  };

  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();

  return (
    <div className={cn(s.root, 'fit')}>
      <NextSeo
        title={titleText}
        description={descriptionText}
        openGraph={{
          type: 'website',
          title: titleText,
          description: descriptionText,
          // images: [
          //   {
          //     url: product.images[0]?.url!,
          //     width: 800,
          //     height: 600,
          //     alt: product.name,
          //   },
          // ],
        }}
      />
      <div>
        <h1>{titleText}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <OrderFormSection
            title={'タイプ'}
            description={'ご購入を希望する服のタイプをお聞かせください。'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'枚数'}
            description={'ご購入を希望する枚数お聞かせください。'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'その他のタイプ'}
            description={
              '前の質問で「f.その他」を選ばれた方は、その服のタイプをお聞かせください'
            }
          >
            text area
          </OrderFormSection>
          <OrderFormSection
            title={'色'}
            description={
              'ご購入を希望する服のタイプの【色】をお聞かせください。'
            }
          >
            text area
          </OrderFormSection>
          <OrderFormSection
            title={'場所と頻度'}
            description={
              '着用者様が、ご希望の服を着る【場所】と【頻度】をお聞かせください。例えば「室内の普段着で3日に一度着る」、「外着としてたまに着る」、「室内で毎日着る」など。'
            }
          >
            text area
          </OrderFormSection>
          <OrderFormSection
            title={'場所と時間'}
            description={
              '着用者様が、ご希望の服を着る【場所】と【頻度】をお聞かせください。 例えば「室内の普段着で3日に一度着る」、「外着としてたまに着る」、「室内で毎日着る」など。'
            }
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'部位'}
            description={
              '着用者様の上半身に、痛みや可動の制約など身体の不自由がある場合は、その部位を選択ください　※複数回答可'
            }
          >
            checbox and text area
          </OrderFormSection>
          <OrderFormSection
            title={'傷病名'}
            description={'着用者様が、患われている傷病名をお聞かせください'}
          >
            text area
          </OrderFormSection>
          <OrderFormSection
            title={'要支援度・介護度'}
            description={'着用者様の要支援度・介護度をお聞かせください'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'カテーテル・シャント'}
            description={
              '着用者様が、カテーテルやシャントなどの管を通している場合はその身体の箇所をお聞かせください。'
            }
          >
            text area
          </OrderFormSection>
          <OrderFormSection
            title={'支援者'}
            description={
              '着用者様が更衣に支援を要する場合は、その支援者をお聞かせください　※複数回答可'
            }
          >
            checkbox and text area
          </OrderFormSection>
          <OrderFormSection title={'開ける場所？'} description={'開ける場所？'}>
            checkbox
          </OrderFormSection>
          <OrderFormSection
            title={'不自由度'}
            description={
              '着用者様が "かぶって着る" タイプの上衣(Tシャツやセーターなどの前開きでない服)を着脱する際の不自由の度合いをお聞かせください *'
            }
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={
              '"かぶって着る" 上衣の不自由の詳細について　※前の質問で「とても不自由」「やや不自由」とお答えになった方'
            }
            description={
              '以下の１~８の着衣動作のうちもっとも不自由がある"かぶって着る" 上衣の着脱に伴う動作をお聞かせください。以下は片方の腕に不自由がある方を想定していますが、そうではない方は、「不自由でない手」「不自由な手」という表現は気にせずに、以下図１~８の着衣動作において不自由を伴う動作を選択ください　※複数回答可'
            }
          >
            checkbox text area * 2
          </OrderFormSection>
          <OrderFormSection
            title={'ボタンについて'}
            description={'着用者様は、ボタンを独力でとめることができますか？'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'ボタンの代替について'}
            description={'ボタンの代わりには、以下のいずれが最もお好みですか？'}
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'"下から着る" という服の着方について'}
            description={
              '普段、服を着る際の不自由から、　下記動画写のように”下から着る” ことがありますか？'
            }
          >
            radio
          </OrderFormSection>
          <OrderFormSection
            title={'身体採寸について'}
            description={
              '着用者様の寸法を入力ください。 ※単位は、cmでご入力ください。例えば、32.4cmであれば32.4、32cmでしたら32と入力ください。'
            }
          >
            input
          </OrderFormSection>
          <OrderFormSection
            title={'お客様のご連絡先を記入ください'}
            description={'email'}
          >
            input
          </OrderFormSection>
          <OrderFormSection
            title={'最後に、ご希望がございましたらお聞かせください'}
            description={'その他'}
          >
            text area * 4
          </OrderFormSection>
        </div>
        <div>
          <Button aria-label="Submit" type="submit" className={s.button}>
            {f('Submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderView;
