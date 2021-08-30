import { Lang } from 'types/site';

type Props = { type: string; locale: Lang };
export const makeThanksMessage = ({ type, locale }: Props) => {
  if (type === 'haute-couture') {
    const hauteCoutureAddress = process.env.MAIL_ADDRESS_HAUTE_COUTURE;
    if (locale === 'ja') {
      return `<ul>
<li>ご入力ありがとうございました！いただいたe-mail宛に、当社よりメールを自動配信いたします。</li>
<li>自動配信メールがお手元に届かない場合は${hauteCoutureAddress}までご連絡下さい。</li>
<li>その後、ヒアリングを経てデザインや金額は確定されます。</li>
<li>ご希望の服をより正確に知るために、ご希望の服に近い【参考写真】がございましたら${hauteCoutureAddress}宛に送付いただければ助かります。現在着ているもの、インターネット上にあるものなど何でも構いません。</li>
</ul>`;
    } else {
      return `<ul>
<li>Thank you for your input! You will receive an automatic email from us to the email address you provided.</li>
<li>If you do not receive the automatic email, please contact ${hauteCoutureAddress}.</li>
<li>Then, after the hearing, the design and price will be finalized.</li>
<li>To get a more accurate idea of what you are looking for, it would be helpful if you could send us a [reference photo] that is similar to your desired outfit to ${hauteCoutureAddress}.It can be anything you are currently wearing or anything you can find on the Internet.</li>
</ul>
`;
    }
  }
};
