import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import { hauteCouture } from './template';

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
    let subject = 'お問い合わせ';
    let text = '';
    let to = process.env.MAIL_ADDRESS_CONTACT;
    if (req.body?.type === 'haute-couture') {
      const mailOption = hauteCouture(req.body?.data);
      if (mailOption) {
        subject = mailOption.subject;
        text = mailOption.text;
        to = mailOption.to;
      }
    }

    const info = await transporter.sendMail({
      from: process.env.MAIL_ADDRESS_WEB,
      to,
      subject,
      text,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(info));

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('/api/contact Error. ', error);
    res.status(500).send(error);
  }
};

export default contact;
