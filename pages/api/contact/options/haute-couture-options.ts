import type { Lang } from 'types/site';

type Data = {
  title: string;
  answers: {
    name: string;
    question: string;
    answer: string;
  }[];
}[];

type Props = {
  data?: Data;
  locale?: Lang;
};

const makeAdminOptions = ({ data }: Required<Pick<Props, 'data'>>) => {
  const message = data.map((item, index) => {
    const answersText = item.answers.map(({ name, question, answer }) => {
      return `
    name: ${name}
    question: ${question}
    answer: ${answer}
    `;
    });

    return `number: ${index + 1}
title: ${item.title}
answer: ${answersText}`;
  });
  return {
    subject: 'オートクチュールの注文を受け付けました',
    text: message.join('\n\n'),
    to: process.env.MAIL_ADDRESS_HAUTE_COUTURE!,
  };
};

const makeReplyTemplate = (email: string, locale: Lang) => {
  const hauteCoutureAddress = process.env.MAIL_ADDRESS_HAUTE_COUTURE!;
  const subject = {
    ja: '【carewillからのお知らせ】オートクチュール入力情報　受領致しました。',
    en: 'Thank you for placing your order with carewill.',
  };
  const text = {
    ja: `※このメールは自動配信メールです。返信はできません。
${email}様

オートクチュールフォームへのご回答ありがとうございました。
以下の内容で受領致しました。
弊社で内容確認後、担当者よりご連絡いたしますので、
今しばらくお待ちくださいませ。

入力内容やその他ご不明点などございましたら
${hauteCoutureAddress}までご連絡ください。
`,
    en: `This is an automatic email. No reply will be sent.
Dear ${email}

Thank you for your response to the Haute Couture form.
We have received the following information.
Please wait a moment as we will contact you after we confirm the contents.

If you have any questions or concerns, please contact us at ${hauteCoutureAddress}.
`,
  };

  return {
    subject: subject[locale],
    text: text[locale],
  };
};

const makeReplyOptions = ({ data, locale }: Required<Props>) => {
  const to = data.find((item) => {
    return item.answers.some((answer) => answer.name === 'email');
  })?.answers?.[0].answer;
  if (!to) {
    return null;
  }

  const { subject, text } = makeReplyTemplate(to, locale);
  return {
    subject,
    text,
    to,
  };
};

export const hauteCoutureOptions = ({ data, locale = 'ja' }: Props) => {
  if (!data) {
    return null;
  }
  const admin = makeAdminOptions({ data });
  const reply = makeReplyOptions({ data, locale });

  return {
    admin,
    reply,
  };
};
