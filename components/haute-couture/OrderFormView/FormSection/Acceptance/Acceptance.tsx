import { useRouter } from 'next/router';
import { Link } from '@components/ui';
import { Checkbox } from '@components/ui/react-hook-form';
import type { VFC } from 'react';

type Props = {
  className?: string;
};

const Acceptance: VFC<Props> = ({ className }) => {
  const { locale } = useRouter();
  return (
    <Checkbox
      className={className}
      type="checkbox"
      name="acceptance"
      required={true}
    >
      {locale === 'ja' && (
        <span>
          <Link
            className="underline hover:no-underline"
            href="/privacy-policy"
            site="about"
            target="_blank"
          >
            個人情報の取扱い
          </Link>
          に同意します
        </span>
      )}
    </Checkbox>
  );
};

export default Acceptance;
