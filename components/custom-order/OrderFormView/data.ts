import type { CustomOrderInputs } from 'types/custom-order-inputs';
import type { LanguageContent } from 'types/form';

export type Data = {
  title: LanguageContent;
  inputs: {
    name: keyof CustomOrderInputs;
    values: LanguageContent[];
    notes?: LanguageContent[];
  }[];
};

export const data: Data[] = [
  {
    title: {
      ja: '色',
      en: 'Color',
    },
    inputs: [
      {
        name: 'color',
        values: [
          {
            ja: 'white',
            en: 'white',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: 'オープン箇所',
      en: 'Open spot',
    },
    inputs: [
      {
        name: 'open_left',
        values: [
          {
            ja: '上部オープン',
            en: '',
          },
          {
            ja: '全部オープン（行為介助向け）',
            en: '',
          },
          {
            ja: 'オープンしない',
            en: '',
          },
        ],
        notes: [
          {
            ja: '※左全部オープンのみ、１枚あたり＋500円',
            en: '',
          },
        ],
      },
      {
        name: 'open_right',
        values: [
          {
            ja: '上部オープン',
            en: '',
          },
          {
            ja: '全部オープン（行為介助向け）',
            en: '',
          },
          {
            ja: 'オープンしない',
            en: '',
          },
        ],
        notes: [
          {
            ja: '※右全部オープンのみ、１枚あたり＋500円',
            en: '',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: 'ポケット',
      en: 'Pocket',
    },
    inputs: [
      {
        name: 'pocket',
        values: [
          {
            ja: '両方',
            en: 'Both',
          },
          {
            ja: '右のみ',
            en: 'Right',
          },
          {
            ja: '左のみ',
            en: 'Left',
          },
          {
            ja: 'なし',
            en: 'None',
          },
        ],
        notes: [
          {
            ja: '※１点あたり＋●●●円',
            en: '',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: 'サイズ',
      en: 'Size',
    },
    inputs: [
      {
        name: 'size',
        values: [
          {
            ja: 'M',
            en: 'M',
          },
          {
            ja: 'L',
            en: 'L',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: '枚数',
      en: 'Number',
    },
    inputs: [
      {
        name: 'number',
        values: [
          {
            ja: '1',
            en: '1',
          },
          {
            ja: '2',
            en: '2',
          },
          {
            ja: '3（〇〇円／1枚）',
            en: '3',
          },
        ],
        notes: [
          {
            ja: '※5枚以上の割引金額は同額となります。',
            en: '',
          },
          {
            ja: '※同商品を10枚以上ご希望の方はコンタクトからお問合せください。',
            en: '',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: 'ギフト包装',
      en: 'Gift wrapping',
    },
    inputs: [
      {
        name: 'gift',
        values: [
          {
            ja: 'あり',
            en: 'Yes',
          },
          {
            ja: 'なし',
            en: 'No',
          },
        ],
        notes: [
          {
            ja: '※包装ありの場合＋●●●円',
            en: '',
          },
        ],
      },
    ],
  },
  {
    title: {
      ja: 'メッセージカード',
      en: 'Message card',
    },
    inputs: [
      {
        name: 'message',
        values: [
          {
            ja: 'あり',
            en: 'Yes',
          },
          {
            ja: 'なし',
            en: 'No',
          },
        ],
        notes: [
          {
            ja: '※メッセージカードありの場合＋●●●円',
            en: '',
          },
        ],
      },
    ],
  },
];
