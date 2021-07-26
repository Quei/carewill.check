type LanguageContent = {
  ja?: string;
  en?: string;
};

type InputBase = {
  name: string;
  description?: LanguageContent;
};

type TextInput = InputBase & {
  type: 'text' | 'email';
  placeholder?: LanguageContent;
};

export type CheckboxesInput = InputBase & {
  type: 'radio' | 'checkbox';
  columnNumber?: number;
  values: (LanguageContent & {
    image?: { path: string; width: number; height: number };
  })[];
};

type SelectInput = InputBase & {
  type: 'select';
  values: LanguageContent[];
};

type AcceptanceInput = InputBase & {
  type: 'acceptance';
};

type Data = {
  title: LanguageContent;
  required?: boolean;
  inputs: (TextInput | CheckboxesInput | SelectInput | AcceptanceInput)[];
}[];

export const data: Data = [
  {
    title: { ja: '作りたい服のイメージ', en: 'What kind of type' },
    required: true,
    inputs: [
      {
        name: 'type',
        type: 'radio',
        columnNumber: 3,
        values: [
          {
            ja: 'インナー',
            image: {
              path: '/img/haute-couture/type/01.svg',
              width: 180,
              height: 121,
            },
          },
          {
            ja: 'シャツ',
            image: {
              path: '/img/haute-couture/type/02.svg',
              width: 218,
              height: 121,
            },
          },
          {
            ja: 'アウター',
            image: {
              path: '/img/haute-couture/type/03.svg',
              width: 234,
              height: 121,
            },
          },
        ],
      },
      {
        name: 'type_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力' },
      },
    ],
  },
  {
    title: { ja: '希望する色' },
    required: true,
    inputs: [
      {
        name: 'color',
        type: 'text',
        placeholder: { ja: '例) 薄いピンク、濃いブルーなど' },
      },
    ],
  },
  {
    title: { ja: '着る場所と頻度' },
    inputs: [
      {
        name: 'frequency_in_use',
        type: 'select',
        values: [
          { ja: '室内の普段着で3日に一度着る' },
          { ja: '外着としてたまに着る' },
          { ja: '室内で毎日着る' },
        ],
      },
      {
        name: 'frequency_in_use_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力' },
      },
    ],
  },
  {
    title: { ja: '日常生活を過ごす場所と時間' },
    required: true,
    inputs: [
      {
        name: 'place_and_time',
        type: 'select',
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
    required: true,
    inputs: [
      {
        name: 'hurt',
        description: {
          ja: '該当箇所をクリック or タップしてください ※複数回答可',
        },
        type: 'image',
      },
      {
        name: 'hurt_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力' },
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
    inputs: [
      {
        name: 'tube_part',
        description: {
          ja:
            'カテーテルやシャントなどの管を通している場合はその身体の箇所をお聞かせください。',
        },
        type: 'text',
        placeholder: { ja: '例) 左鎖骨下、内頸、右腕など' },
      },
    ],
  },
  {
    title: { ja: '更衣介助者' },
    inputs: [
      {
        name: 'assisting_dressing',
        description: {
          ja:
            '更衣介助（服の脱ぎ着を誰かに助けてもらう）を要する場合は、その介助者をお聞かせください<br>※複数回答可',
        },
        type: 'checkbox',
        values: [{ ja: '家族' }, { ja: '家族以外の介護従事者' }],
      },
    ],
  },
  {
    title: { ja: '“かぶって着る”上衣で“ゆとり”があると良い箇所' },
    inputs: [
      {
        name: 'pullover_of_extra_space',
        description: {
          ja:
            '" かぶって着る " 上衣(T シャツやセーターなどの前開きでない服)を着脱する際に、” ゆとり” ができる ことで着脱を容易にすると思われる服の部位をお選びください<br>該当箇所をクリック or タップしてください ※複数回答可',
        },
        type: 'image',
      },
    ],
  },
  {
    title: { ja: '“かぶって着る” 上衣の不自由度合い' },
    required: true,
    inputs: [
      {
        name: 'pullover_inconvenient_level',
        description: {
          ja:
            '着用者様が " かぶって着る " タイプの上衣 (T シャツやセーターなどの前開きでない服 ) を着脱する際の不自由の度合いをお聞かせください',
        },
        type: 'select',
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
    inputs: [
      {
        name: 'pullover_inconvenient_part',
        description: {
          ja:
            'もっとも不自由がある " かぶって着る " 上衣の着脱に伴う動作をお聞かせください。※複数回答可',
        },
        type: 'checkbox',
        columnNumber: 4,
        values: [
          {
            ja: '服を膝の上に置く',
            image: {
              path: '/img/haute-couture/pullover/01.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: '服をつかむ',
            image: {
              path: '/img/haute-couture/pullover/02.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: '服の袖口に通す',
            image: {
              path: '/img/haute-couture/pullover/03.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: '腕を服のそでに通す',
            image: {
              path: '/img/haute-couture/pullover/04.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: '手を服のそでに通す',
            image: {
              path: '/img/haute-couture/pullover/05.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: '手でえりを持ちあげる',
            image: {
              path: '/img/haute-couture/pullover/06.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: 'えりに首を通す',
            image: {
              path: '/img/haute-couture/pullover/07.svg',
              width: 113,
              height: 200,
            },
          },
          {
            ja: '服を整える',
            image: {
              path: '/img/haute-couture/pullover/08.svg',
              width: 113,
              height: 200,
            },
          },
        ],
      },
      {
        name: 'pullover_inconvenient_additional_explanation',
        description: { ja: '補足の説明がございましたら記入ください。' },
        type: 'text',
        placeholder: { ja: '回答を入力' },
      },
      {
        name: 'pullover_inconvenient_other',
        description: {
          ja:
            'その他にも " かぶって着る " 上衣の着脱における不自由な動作がありましたらお聞かせください<br>※自由回答。複数回答可。',
        },
        type: 'text',
        placeholder: { ja: '回答を入力' },
      },
    ],
  },
  {
    title: { ja: 'ボタン' },
    required: true,
    inputs: [
      {
        name: 'button',
        description: { ja: 'ボタンを独力でとめることができますか?' },
        type: 'select',
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
    inputs: [
      {
        name: 'alternative_button',
        description: { ja: 'ボタンの代わりにはどれが最もお好みですか?' },
        type: 'select',
        values: [
          { ja: 'チャック' },
          { ja: 'マジックテープ' },
          { ja: 'マグネット' },
        ],
      },
      {
        name: 'alternative_button_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力' },
      },
    ],
  },
  {
    title: { ja: '" 下から着る " という服の着方について' },
    required: true,
    inputs: [
      {
        name: 'wear_from_below',
        description: {
          ja: 'この動画のように”、服を下から着る” ことがありますか?',
        },
        type: 'radio',
        values: [{ ja: 'ある' }, { ja: 'ない' }],
      },
    ],
  },
  {
    title: { ja: '身体採寸' },
    required: true,
    inputs: [
      {
        name: 'measurement',
        type: 'custom',
      },
    ],
  },
  {
    title: { ja: '枚数' },
    required: true,
    inputs: [
      {
        name: 'number',
        type: 'select',
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
    required: true,
    inputs: [
      {
        name: 'email',
        type: 'email',
        placeholder: { ja: 'e-mailを入力' },
      },
      { name: 'privacy_acceptance', type: 'acceptance' },
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
      },
      {
        name: 'request_about_length',
        description: { ja: '長さについてのご希望' },
        type: 'text',
        placeholder: { ja: '例) 長め、短め、普通' },
      },
      {
        name: 'request_about_extra_space',
        description: {
          ja: 'ゆとりについてのご希望',
        },
        type: 'text',
        placeholder: { ja: '例) ゆったり、ぴったりなど' },
      },
      {
        name: 'request_about_delivery',
        description: {
          ja: '納期時期についてのご希望',
        },
        type: 'text',
        placeholder: { ja: '例) 急がない、〇月〇日まで希望など' },
      },
    ],
  },
];
