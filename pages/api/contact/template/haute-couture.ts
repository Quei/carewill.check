type Data = {
  title: string;
  answers: {
    name: string;
    question: string;
    answer: string;
  }[];
}[];
export const hauteCouture = (data?: Data) => {
  if (!data) {
    return null;
  }
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
    subject: 'オートクチュールフォーム',
    text: message.join('\n\n'),
    to: process.env.MAIL_ADDRESS_HAUTE_COUTURE,
  };
};
