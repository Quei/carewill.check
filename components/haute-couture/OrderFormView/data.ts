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
    title: {
      ja: '作りたい服のイメージ',
      en: 'The type of clothing you want to make',
    },
    componentName: 'ClothesType',
    inputs: [
      {
        name: 'clothes_type_radio',
        type: 'radio',
        required: true,
        values: [
          {
            ja: 'インナー',
            en: 'Innerwear',
            image: '/img/haute-couture/clothes_type/01.svg',
          },
          {
            ja: 'シャツ',
            en: 'Shirt',
            image: '/img/haute-couture/clothes_type/02.svg',
          },
          {
            ja: 'アウター',
            en: 'Outerwear',
            image: '/img/haute-couture/clothes_type/03.svg',
          },
          {
            ja: 'その他',
            en: 'Other',
            image: '/img/haute-couture/clothes_type/04.svg',
          },
        ],
      },
    ],
  },
  {
    title: { ja: '(1) についての補足回答', en: 'Supplementary answer to (1)' },
    componentName: 'ClothesTypeOther',
    inputs: [
      {
        name: 'clothes_type_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力', en: 'Enter other answers' },
        label: { ja: 'その他の回答', en: 'Other answers' },
      },
    ],
  },
  {
    title: { ja: '希望する色', en: 'Preferred color' },
    inputs: [
      {
        name: 'color',
        type: 'text',
        required: true,
        placeholder: {
          ja: '例) 薄いピンク、濃いブルーなど',
          en: 'e.g.) light pink, dark blue, etc.',
        },
        label: { ja: '希望する色', en: 'Preferred color' },
      },
    ],
  },
  {
    title: { ja: '着る場所と頻度', en: 'Where and how often to wear it' },
    inputs: [
      {
        name: 'frequency_in_use',
        type: 'select',
        hasOtherText: true,
        values: [
          {
            ja: '室内の普段着で3日に一度着る',
            en: 'Wear once every three days for regular indoor wear.',
          },
          { ja: '外着としてたまに着る', en: 'Wear Occasionally as outerwear' },
          { ja: '室内で毎日着る', en: 'Wear indoors every day' },
        ],
      },
    ],
  },
  {
    title: {
      ja: '日常生活を過ごす場所と時間',
      en: 'Where and when we spend our daily lives',
    },
    inputs: [
      {
        name: 'place_and_time',
        type: 'select',
        required: true,
        values: [
          { ja: '一日中室内', en: 'All day indoors' },
          { ja: 'ほぼ一日中室内', en: 'Almost all day indoors' },
          { ja: '室内・室外半分', en: 'Half indoor, half outdoor' },
          { ja: 'ほぼ室外', en: 'Mostly outside' },
        ],
      },
    ],
  },
  {
    title: {
      ja: '痛みや可動の制約のある箇所',
      en: 'Areas of pain or restriction of movement',
    },
    componentName: 'Hurt',
    inputs: [
      {
        name: 'hurt',
        description: {
          ja: '該当箇所をクリック or タップしてください。※複数回答可',
          en:
            'Please click or tap the appropriate area. ※ Multiple answers are possible.',
        },
        type: 'checkbox',
        required: true,
        values: [
          { ja: '右肩', en: 'Right shoulder' },
          { ja: '左肩', en: 'Left shoulder' },
          { ja: '右上腕', en: 'Right upper arm' },
          { ja: '左上腕', en: 'Left upper arm' },
          { ja: '右ひじ', en: 'Right elbow' },
          { ja: '左ひじ', en: 'Left elbow' },
          { ja: '右前腕', en: 'Right forearm' },
          { ja: '左前腕', en: 'Left forearm' },
          { ja: '右手首', en: 'Right wrist' },
          { ja: '左手首', en: 'Left wrist' },
          { ja: '右指', en: 'Right finger' },
          { ja: '左指', en: 'Left finger' },
        ],
      },
      {
        name: 'hurt_other',
        type: 'text',
        placeholder: { ja: 'その他の回答を入力', en: 'Enter other answers.' },
        label: { ja: 'その他の回答', en: 'Other answers' },
      },
    ],
  },
  {
    title: { ja: '傷病名', en: 'Name of injury or illness' },
    inputs: [
      {
        name: 'name_of_illness',
        type: 'text',
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '傷病名', en: 'Name of injury or illness' },
      },
    ],
  },
  {
    title: { ja: '要支援度・介護度', en: 'Level of support and care required' },
    inputs: [
      {
        name: 'requiring_help_or_care_level',
        type: 'select',
        values: [
          { ja: '要支援1', en: 'Needs support level 1' },
          { ja: '要支援2', en: 'Needs support level 2' },
          { ja: '要介護1', en: 'Nursing care level 1' },
          { ja: '要介護2', en: 'Nursing care level 2' },
          { ja: '要介護3', en: 'Nursing care level 3' },
          { ja: '要介護4', en: 'Nursing care level 4' },
          { ja: '要介護5', en: 'Nursing care level 5' },
        ],
      },
    ],
  },
  {
    title: { ja: '管を通す箇所', en: 'Pipe passage part' },
    description: {
      ja:
        'カテーテルやシャントなどの管を通している場合はその身体の箇所をお聞かせください。',
      en:
        'If you have a catheter, shunt, or other tube running through your body, please tell us the part of your body that is affected.',
    },
    inputs: [
      {
        name: 'tube_part',
        type: 'text',
        placeholder: {
          ja: '例) 左鎖骨下、内頸、右腕など',
          en: 'e.g.) left subclavian, inner neck, right arm, etc.',
        },
        label: { ja: '管を通す箇所', en: 'Pipe passage part' },
      },
    ],
  },
  {
    title: { ja: '更衣介助者', en: 'Dresser' },
    description: {
      ja:
        '更衣介助（服の脱ぎ着を誰かに助けてもらう）を要する場合は、その介助者をお聞かせください。',
      en:
        'If you need assistance with changing clothes (i.e., someone to help you undress), please tell us who the helper is.',
    },
    inputs: [
      {
        name: 'assisting_dressing',
        type: 'select',
        values: [
          { ja: '家族', en: 'Family' },
          {
            ja: '家族以外の介護従事者',
            en: 'Non-family caregivers',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: '“かぶって着る”上衣で“ゆとり”があると良い箇所',
      en: 'Where there should be "room" in a "wear it over your head" jacket.',
    },
    description: {
      ja:
        '“かぶって着る”上衣(Tシャツやセーターなどの前開きでない服)を着脱する際に、”ゆとり”ができることで着脱を容易にすると思われる服の部位をお選びください。<br>該当箇所をクリック or タップしてください。※複数回答可',
      en:
        'When you put on or take off a "wear it over your head" jacket (non-front-opening clothes such as T-shirts, sweaters, etc.), please select the part of the clothes that you think would make it easier to put on or take off.<br>Please click or tap the appropriate area *Multiple answers are possible',
    },
    componentName: 'PulloverOfExtraSpace',
    inputs: [
      {
        name: 'pullover_of_extra_space',
        type: 'checkbox',
        values: [
          { ja: '襟ぐり', en: 'Neckline' },
          { ja: '袖ぐり', en: 'Sleeve seam' },
          { ja: '袖幅', en: 'Sleeve width' },
          { ja: '胸囲', en: 'Chest measurement' },
          { ja: '腹囲', en: 'Girth of the abdomen' },
        ],
      },
    ],
  },
  {
    title: {
      ja: '“かぶって着る”上衣の不自由度合い',
      en: 'The degree of inconvenience of a "wear it over your head" jacket',
    },
    description: {
      ja:
        '着用者様が“かぶって着る”タイプの上衣(Tシャツやセーターなどの前開きでない服)を着脱する際の不自由の度合いをお聞かせください。',
      en:
        'How inconvenient is it for the wearer to put on and take off a "wear it over your head" jacket upper garments (clothes that do not open in front, such as T-shirts and sweaters)?',
    },
    inputs: [
      {
        name: 'pullover_inconvenient_level',
        type: 'select',
        required: true,
        values: [
          { ja: 'とても不自由', en: 'Very inconvenient' },
          { ja: 'やや不自由', en: 'Slightly inconvenient' },
          { ja: 'どちらとも言えない', en: "Can't say either" },
          { ja: 'あまり不自由はない', en: 'Not very inconvenient' },
          { ja: '不自由はない', en: 'No inconvenience' },
        ],
      },
    ],
  },
  {
    title: {
      ja:
        '“かぶって着る”上衣の不自由の詳細<br>※前の質問で「とても不自由」「やや不自由」とお答えになった方',
      en:
        'Details of the inconvenience of a "wear it over your head" jacket<br>※ If you answered "very inconvenient" or "somewhat inconvenient" to the previous question',
    },
    componentName: 'PulloverInconvenientPart',
    inputs: [
      {
        name: 'pullover_inconvenient_part',
        description: {
          ja:
            'もっとも不自由がある“かぶって着る”上衣の着脱に伴う動作をお聞かせください。※複数回答可',
          en:
            'Please tell us the most inconvenient actions you take when putting on and taking off a "wear it over your head" jacket. ※ Multiple answers are acceptable.',
        },
        type: 'checkbox',
        values: [
          {
            ja: '服を膝の上に置く',
            en: 'Put your clothes on your lap',
          },
          {
            ja: '服をつかむ',
            en: 'Grab a hold of a clothesline',
          },
          {
            ja: '服のそでぐちに通す',
            en: 'Thread the cuffs of your clothes',
          },
          {
            ja: '腕を服のそでに通す',
            en: 'Put your arms through the sleeves of your clothes',
          },
          {
            ja: '手を服のそでに通す',
            en: 'Put your hands through the sleeves of your clothes',
          },
          {
            ja: '手でえりを持ちあげる',
            en: "Lift one's collar with one's hands",
          },
          {
            ja: 'えりに首を通す',
            en: 'Put your neck through the collar',
          },
          {
            ja: '服を整える',
            en: "Arrange one's clothes",
          },
        ],
      },
      {
        name: 'pullover_inconvenient_additional_explanation',
        description: {
          ja: '補足の説明がございましたら記入ください。',
          en:
            'If you have any additional explanation, please fill in the form.',
        },
        type: 'text',
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '補足の説明', en: 'Supplementary explanation' },
      },
      {
        name: 'pullover_inconvenient_other',
        description: {
          ja:
            'その他にも“かぶって着る”上衣の着脱における不自由な動作がありましたらお聞かせください。<br>※自由回答。複数回答可。',
          en:
            'Please let us know if there are any other inconveniences in putting on and taking off a "wear it over your head" jacket. Multiple answers are acceptable.',
        },
        type: 'text',
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: {
          ja: 'その他の不自由な動作',
          en: 'Other Nonfunctional Activities',
        },
      },
    ],
  },
  {
    title: { ja: 'ボタン', en: 'Button' },
    description: {
      ja: 'ボタンを独力でとめることができますか?',
      en: 'Can you fasten the buttons by yourself?',
    },
    inputs: [
      {
        name: 'button',
        type: 'select',
        required: true,
        values: [
          { ja: '独力でとめられる', en: 'Yes, I can do it by myself.' },
          { ja: 'とめられない', en: "No, I can't." },
          { ja: 'ほぼとめられない', en: 'Almost impossible to fasten' },
        ],
      },
    ],
  },
  {
    title: { ja: 'ボタンの代替', en: 'Button alternative' },
    description: {
      ja: 'ボタンの代わりにはどれが最もお好みですか?',
      en: 'Which is your most preferred alternative to buttons?',
    },
    inputs: [
      {
        name: 'alternative_button',
        type: 'select',
        hasOtherText: true,
        values: [
          { ja: 'チャック／チャック', en: 'Chuck' },
          { ja: 'マジックテープ', en: 'Velcro' },
          { ja: 'マグネット', en: 'Magnets' },
        ],
      },
    ],
  },
  {
    title: {
      ja: '“下から着る”という服の着方について',
      en: 'How to wear clothes "from the bottom up"',
    },
    description: {
      ja: 'この動画のように、上衣を“下から着る”ことがありますか?',
      en: 'Do you ever wear clothes "from the bottom up," as in this video?',
    },
    video: 'XWAKr5hSBe8',
    inputs: [
      {
        name: 'wear_from_below',
        type: 'select',
        required: true,
        values: [
          { ja: 'ある', en: 'Yes' },
          { ja: 'ない', en: 'No' },
        ],
      },
    ],
  },
  {
    title: { ja: '身体採寸', en: 'Body measurements' },
    description: {
      ja: '※32.4cm であれば半角数字で32.4と入力ください。',
      en: '※ If the size is 32.4cm, please enter 32.4.',
    },
    componentName: 'Measurement',
    inputs: [
      {
        name: 'measurement_neck',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '首回り', en: 'Around the neck' },
      },
      {
        name: 'measurement_shoulder',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '肩幅', en: 'Shoulder width' },
      },
      {
        name: 'measurement_sleeve',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '袖丈', en: 'Length of a sleeve' },
      },
      {
        name: 'measurement_chest',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '胸囲', en: 'Chest measurement' },
      },
      {
        name: 'measurement_waist',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '腹囲', en: 'Girth of the abdomen' },
      },
      {
        name: 'measurement_wrist',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '手首回り', en: 'Around the wrist' },
      },
      {
        name: 'measurement_length',
        type: 'text',
        required: true,
        placeholder: { ja: '回答を入力', en: 'Enter your answer' },
        label: { ja: '着丈', en: 'Dress length' },
      },
    ],
  },
  {
    title: { ja: '枚数', en: 'Number' },
    inputs: [
      {
        name: 'number',
        type: 'select',
        required: true,
        values: [
          { ja: '1枚', en: '1 piece' },
          { ja: '2枚', en: '2 pieces' },
          { ja: '3枚', en: '3 pieces' },
          { ja: '4枚', en: '4 pieces' },
          { ja: '5枚', en: '5 pieces' },
        ],
      },
    ],
  },
  {
    title: {
      ja: 'お客様のご連絡先、個人情報の取扱い',
      en: 'Your contact information',
    },
    inputs: [
      {
        name: 'email',
        type: 'email',
        required: true,
        placeholder: { ja: 'e-mailを入力', en: 'Enter your e-mail address' },
        label: { ja: 'e-mail' },
      },
      { name: 'acceptance', required: true, type: 'acceptance' },
    ],
  },
  {
    title: {
      ja: '最後に、ご希望がございましたらお聞かせください',
      en: 'Finally, if you have any requests, please let us know.',
    },
    inputs: [
      {
        name: 'request_about_materials',
        description: {
          ja: '素材についてのご希望',
          en: 'Material requirements',
        },
        type: 'text',
        placeholder: {
          ja: '例) ハリがある、ストレッチ素材など',
          en: 'e.g.) firm, stretchy material, etc.',
        },
        label: { ja: '素材についてのご希望', en: 'Material requirements' },
      },
      {
        name: 'request_about_length',
        description: { ja: '長さについてのご希望', en: 'Length requirements' },
        type: 'text',
        placeholder: {
          ja: '例) 長め、短め、普通',
          en: 'e.g.) longer, shorter, normal',
        },
        label: { ja: '長さについてのご希望', en: 'Length requirements' },
      },
      {
        name: 'request_about_extra_space',
        description: {
          ja: 'ゆとりについてのご希望',
          en: 'How much room do you want?',
        },
        type: 'text',
        placeholder: {
          ja: '例) ゆったり、ぴったりなど',
          en: 'e.g.) loose, snug, etc.',
        },
        label: {
          ja: 'ゆとりについてのご希望',
          en: 'How much room do you want?',
        },
      },
      {
        name: 'request_about_delivery',
        description: {
          ja: '納期時期についてのご希望',
          en: 'What is your preference for delivery time?',
        },
        type: 'text',
        placeholder: {
          ja: '例) 急がない、〇月〇日まで希望など',
          en: 'e.g.) No hurry, no later than October 1, etc.',
        },
        label: {
          ja: '納期時期についてのご希望',
          en: 'What is your preference for delivery time?',
        },
      },
    ],
  },
];
