import { useRouter } from 'next/router';
import { Checkbox, Link } from '@components/ui';
import type { VFC } from 'react';

type Props = {
  className?: string;
};

const Acceptance: VFC<Props> = ({ className }) => {
  const { locale } = useRouter();
  return (
    <Checkbox name="acceptance">
      {locale === 'ja' && (
        <span>
          <Link className="underline hover:no-underline" href="/privacy-policy">
            個人情報の取扱い
          </Link>
          に同意します
        </span>
      )}
    </Checkbox>
  );
};

export default Acceptance;
