import { createTransport, getTestMessageUrl } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { hauteCoutureOptions } from './options';
import { makeThanksMessage } from './make-thanks-message';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Transporter } from 'nodemailer';

type SendProps = {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;
  to?: string;
  subject?: string;
  text?: string;
};
const send = async ({ transporter, to, subject, text }: SendProps) => {
  if (!to) {
    console.log('"to" is undefined.');
    return;
  }
  const info = await transporter.sendMail({
    from: process.env.MAIL_ADDRESS_WEB,
    to,
    subject,
    text,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', getTestMessageUrl(info));
};

type GetMailOptionsProps = {
  body: NextApiRequest['body'];
};
const getMailOptions = ({ body }: GetMailOptionsProps) => {
  if (body?.type === 'haute-couture') {
    return hauteCoutureOptions({ data: body?.data, locale: body?.locale });
  }
  // else if (req.body?.type === 'contact') {

  // }
};

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS_WEB,
        pass: process.env.MAIL_PASS_WEB,
      },
    });

    const mailOptions = getMailOptions({
      body: req.body,
    });

    // await send({
    //   transporter,
    //   to: mailOptions?.admin?.to,
    //   subject: mailOptions?.admin?.subject,
    //   text: mailOptions?.admin?.text,
    // });
    // await send({
    //   transporter,
    //   to: mailOptions?.reply?.to,
    //   subject: mailOptions?.reply?.subject,
    //   text: mailOptions?.reply?.text,
    // });

    const thanksMessage = makeThanksMessage({
      type: req.body?.type,
      locale: req.body?.locale,
    });
    res.status(200).json({
      message: thanksMessage,
    });
  } catch (error) {
    console.log('/api/contact Error. ', error);
    res.status(500).send(error);
  }
};

export default contact;
