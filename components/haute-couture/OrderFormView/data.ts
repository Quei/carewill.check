import type { HauteCoutureInputs } from 'types/haute-couture-inputs';
export type LanguageContent = {
  ja?: string;
  en?: string;
};

type InputBase = {
  name: keyof HauteCoutureInputs;
  description?: LanguageContent;
  required?: boolean;
};

export type TextInput = InputBase & {
  type: 'text' | 'email';
  placeholder?: LanguageContent;
  label: LanguageContent;
};

export type CheckboxValue = LanguageContent & {
  image?: string;
};

export type CheckboxesInput = InputBase & {
  type: 'radio' | 'checkbox';
  values: CheckboxValue[];
};

type SelectInput = InputBase & {
  type: 'select';
  hasOtherText?: boolean;
  values: LanguageContent[];
};

type AcceptanceInput = InputBase & {
  type: 'acceptance';
};

export type InputType =
  | TextInput
  | CheckboxesInput
  | SelectInput
  | AcceptanceInput;

export type Data = {
  title: LanguageContent;
  description?: LanguageContent;
  video?: string;
  componentName?:
    | 'ClothesType'
    | 'ClothesTypeOther'
    | 'Hurt'
    | 'PulloverOfExtraSpace'
    | 'PulloverInconvenientPart'
    | 'Measurement';
  inputs: InputType[];
};

export const data: Data[] = [
  {
    title: { ja: '作りたい服のイメージ', en: 'What kind of cloth type' },
    componentName: 'ClothesType',
    inputs: [
      {
        name: 'clothes_type_radio',
        type: 'radio',
        required: true,
        values: [
          {
            ja: 'インナー',
            image: '/img/haute-couture/clothes_type/01.svg',
          },
          {
            ja: 'シャツ',
            image: '/img/haute-couture/clothes_type/02.svg',
          },
          {
            ja: 'アウター',
            image: '/img/haute-couture/clothes_type/03.svg',
          },
          {
            ja: 'その他',
            image: '/img/haute-couture/clothes_type/04.svg',
          },
        ],
      },
    ],
  },
  {
    title: { ja: '(1) についての補足回答' },
    componentName: 'ClothesTypeOther',
    inputs: [
      {
        name: 'clothes_type_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力' },
        label: { ja: 'その他の回答' },
      },
    ],
  },
  {
    title: { ja: '希望する色' },
    inputs: [
      {
        name: 'color',
        type: 'text',
        required: true,
        placeholder: { ja: '例) 薄いピンク、濃いブルーなど' },
        label: { ja: '希望する色' },
      },
    ],
  },
  {
    title: { ja: '着る場所と頻度' },
    inputs: [
      {
        name: 'frequency_in_use',
        type: 'select',
        hasOtherText: true,
        values: [
          { ja: '室内の普段着で3日に一度着る' },
          { ja: '外着としてたまに着る' },
          { ja: '室内で毎日着る' },
        ],
      },
    ],
  },
  {
    title: { ja: '日常生活を過ごす場所と時間' },
    inputs: [
      {
        name: 'place_and_time',
        type: 'select',
        required: true,
        values: [
          { ja: '一日中室内' },
          { ja: 'ほぼ一日中室内' },
          { ja: '室内・室外半分' },
          { ja: 'ほぼ室外' },
        ],
      },
    ],
  },
  {
    title: { ja: '痛みや可動の制約のある箇所' },
    componentName: 'Hurt',
    inputs: [
      {
        name: 'hurt',
        description: {
          ja: '該当箇所をクリック or タップしてください ※複数回答可',
        },
        type: 'checkbox',
        required: true,
        values: [
          { ja: '右肩' },
          { ja: '左肩' },
          { ja: '右上腕' },
          { ja: '左上腕' },
          { ja: '右ひじ' },
          { ja: '左ひじ' },
          { ja: '右前腕' },
          { ja: '左前腕' },
          { ja: '右手首' },
          { ja: '左手首' },
          { ja: '右指' },
          { ja: '左指' },
        ],
      },
      {
        name: 'hurt_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力' },
        label: { ja: 'その他の回答' },
      },
    ],
  },
  {
    title: { ja: '傷病名' },
    inputs: [
      {
        name: 'name_of_illness',
        type: 'text',
        placeholder: { ja: '回答を入力' },
        label: { ja: '傷病名' },
      },
    ],
  },
  {
    title: { ja: '要支援度・介護度' },
    inputs: [
      {
        name: 'requiring_help_or_care_level',
        type: 'select',
        values: [
          { ja: '要支援1' },
          { ja: '要支援2' },
          { ja: '要支援3' },
          { ja: '要介護1' },
          { ja: '要介護2' },
          { ja: '要介護3' },
          { ja: '要介護4' },
          { ja: '要介護5' },
        ],
      },
    ],
  },
  {
    title: { ja: '管を通す箇所' },
    description: {
      ja:
        'カテーテルやシャントなどの管を通している場合はその身体の箇所をお聞かせください。',
    },
    inputs: [
      {
        name: 'tube_part',
        type: 'text',
        placeholder: { ja: '例) 左鎖骨下、内頸、右腕など' },
        label: { ja: '管を通す箇所' },
      },
    ],
  },
  {
    title: { ja: '更衣介助者' },
    description: {
      ja:
        '更衣介助（服の脱ぎ着を誰かに助けてもらう）を要する場合は、その介助者をお聞かせください。',
    },
    inputs: [
      {
        name: 'assisting_dressing',
        type: 'select',
        values: [{ ja: '家族' }, { ja: '家族以外の介護従事者' }],
      },
    ],
  },
  {
    title: { ja: '“かぶって着る”上衣で“ゆとり”があると良い箇所' },
    description: {
      ja:
        '" かぶって着る " 上衣(T シャツやセーターなどの前開きでない服)を着脱する際に、” ゆとり” ができる ことで着脱を容易にすると思われる服の部位をお選びください<br>該当箇所をクリック or タップしてください ※複数回答可',
    },
    componentName: 'PulloverOfExtraSpace',
    inputs: [
      {
        name: 'pullover_of_extra_space',
        type: 'checkbox',
        values: [
          { ja: '襟ぐり', en: '襟ぐり' },
          { ja: '袖ぐり', en: '袖ぐり' },
          { ja: '袖幅', en: '袖幅' },
          { ja: '胸囲', en: '胸囲' },
          { ja: '腹囲', en: '腹囲' },
        ],
      },
    ],
  },
  {
    title: { ja: '“かぶって着る” 上衣の不自由度合い' },
    description: {
      ja:
        '着用者様が " かぶって着る " タイプの上衣 (T シャツやセーターなどの前開きでない服 ) を着脱する際の不自由の度合いをお聞かせください',
    },
    inputs: [
      {
        name: 'pullover_inconvenient_level',
        type: 'select',
        required: true,
        values: [
          { ja: 'とても不自由' },
          { ja: 'やや不自由' },
          { ja: 'どちらとも言えない' },
          { ja: 'あまり不自由はない' },
          { ja: '不自由はない' },
        ],
      },
    ],
  },
  {
    title: {
      ja:
        '“かぶって着る” 上衣の不自由の詳細<br>※前の質問で「とても不自由」「やや不自由」とお答えになった方',
    },
    componentName: 'PulloverInconvenientPart',
    inputs: [
      {
        name: 'pullover_inconvenient_part',
        description: {
          ja:
            'もっとも不自由がある " かぶって着る " 上衣の着脱に伴う動作をお聞かせください。※複数回答可',
        },
        type: 'checkbox',
        values: [
          {
            ja: '服を膝の上に置く',
          },
          {
            ja: '服をつかむ',
          },
          {
            ja: '服の袖口に通す',
          },
          {
            ja: '腕を服のそでに通す',
          },
          {
            ja: '手を服のそでに通す',
          },
          {
            ja: '手でえりを持ちあげる',
          },
          {
            ja: 'えりに首を通す',
          },
          {
            ja: '服を整える',
          },
        ],
      },
      {
        name: 'pullover_inconvenient_additional_explanation',
        description: { ja: '補足の説明がございましたら記入ください。' },
        type: 'text',
        placeholder: { ja: '回答を入力' },
        label: { ja: '補足の説明' },
      },
      {
        name: 'pullover_inconvenient_other',
        description: {
          ja:
            'その他にも " かぶって着る " 上衣の着脱における不自由な動作がありましたらお聞かせください<br>※自由回答。複数回答可。',
        },
        type: 'text',
        placeholder: { ja: '回答を入力' },
        label: { ja: 'その他の不自由な動作' },
      },
    ],
  },
  {
    title: { ja: 'ボタン' },
    description: { ja: 'ボタンを独力でとめることができますか?' },
    inputs: [
      {
        name: 'button',
        type: 'select',
        required: true,
        values: [
          { ja: '独力でとめられる' },
          { ja: 'とめられない' },
          { ja: 'ほぼとめられない' },
        ],
      },
    ],
  },
  {
    title: { ja: 'ボタンの代替' },
    description: { ja: 'ボタンの代わりにはどれが最もお好みですか?' },
    inputs: [
      {
        name: 'alternative_button',
        type: 'select',
        hasOtherText: true,
        values: [
          { ja: 'チャック' },
          { ja: 'マジックテープ' },
          { ja: 'マグネット' },
        ],
      },
    ],
  },
  {
    title: { ja: '" 下から着る " という服の着方について' },
    description: {
      ja: 'この動画のように”、服を下から着る” ことがありますか?',
    },
    video: 'XWAKr5hSBe8',
    inputs: [
      {
        name: 'wear_from_below',
        type: 'select',
        required: true,
        values: [{ ja: 'ある' }, { ja: 'ない' }],
      },
    ],
  },
  {
    title: { ja: '身体採寸' },
    description: { ja: '※32.4cm であれば 32.4 と入力ください。' },
    componentName: 'Measurement',
    inputs: [
      {
        name: 'measurement_neck',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '首回り' },
      },
      {
        name: 'measurement_shoulder',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '肩幅' },
      },
      {
        name: 'measurement_sleeve',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '袖丈' },
      },
      {
        name: 'measurement_chest',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '胸囲' },
      },
      {
        name: 'measurement_waist',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '腹囲' },
      },
      {
        name: 'measurement_wrist',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '手首回り' },
      },
      {
        name: 'measurement_length',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力' },
        label: { ja: '着丈' },
      },
    ],
  },
  {
    title: { ja: '枚数' },
    inputs: [
      {
        name: 'number',
        type: 'select',
        required: true,
        values: [
          { ja: '1枚' },
          { ja: '2枚' },
          { ja: '3枚' },
          { ja: '4枚' },
          { ja: '5枚' },
        ],
      },
    ],
  },
  {
    title: { ja: 'お客様のご連絡先' },
    inputs: [
      {
        name: 'email',
        type: 'email',
        required: true,
        placeholder: { ja: 'e-mailを入力' },
        label: { ja: 'e-mail' },
      },
      { name: 'acceptance', required: true, type: 'acceptance' },
    ],
  },
  {
    title: { ja: '最後に、ご希望がございましたらお聞かせください' },
    inputs: [
      {
        name: 'request_about_materials',
        description: {
          ja: '素材についてのご希望',
        },
        type: 'text',
        placeholder: { ja: '例) ハリがある、ストレッチ素材など' },
        label: { ja: '素材についてのご希望' },
      },
      {
        name: 'request_about_length',
        description: { ja: '長さについてのご希望' },
        type: 'text',
        placeholder: { ja: '例) 長め、短め、普通' },
        label: { ja: '長さについてのご希望' },
      },
      {
        name: 'request_about_extra_space',
        description: {
          ja: 'ゆとりについてのご希望',
        },
        type: 'text',
        placeholder: { ja: '例) ゆったり、ぴったりなど' },
        label: { ja: 'ゆとりについてのご希望' },
      },
      {
        name: 'request_about_delivery',
        description: {
          ja: '納期時期についてのご希望',
        },
        type: 'text',
        placeholder: { ja: '例) 急がない、〇月〇日まで希望など' },
        label: { ja: '納期時期についてのご希望' },
      },
    ],
  },
];

export const thanks = [
  {
    ja:
      'ご入力ありがとうございました!いただいた e-mail 宛に、当社よりメールを自動配信いたします。',
    en: '',
  },
  {
    ja: '自動配信メールはお手元に届かない場合は xxx までご連絡下さい。',
    en: '',
  },
  {
    ja: 'その後、ヒアリングを経てデザインや金額は確定されます。',
    en: '',
  },
  {
    ja:
      'ご希望の服をより正確に知るために、ご希望の服に近い【参考写真】がございましたら〇〇宛に送付いただければ助かります。現在着ているもの、インターネット上にあるものなど何でも構いません。',
    en: '',
  },
];
