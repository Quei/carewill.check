import { useRouter } from 'next/router';
import cn from 'classnames';
import s from './LaboPreview.module.css';
import { Container } from '@components/ui';
import { CrossBlock } from '@components/icons';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LaboPreview: FC<Props> = ({ children }) => {
  const { locale } = useRouter();
  return (
    <div className="relative">
      {children}
      <CrossBlock className="absolute top-0 left-0" />
      <div className={cn(s.underConstruction)}>
        <Container>
          <p>
            <span className="bg-white">
              {locale === 'ja' &&
                'Laboは9月半ばオープン予定ですが、現在挑戦中のクラウドファンディングを応援して頂けた方限定で、先行してコンテンツをご利用いただけます。'}
              {locale === 'en' &&
                'Laboは9月半ばオープン予定ですが、現在挑戦中のクラウドファンディングを応援して頂けた方限定で、先行してコンテンツをご利用いただけます。'}
            </span>
            <br />
            <a
              className="bg-white underline hover:no-underline"
              href="https://google.com/"
              target="_blank"
              rel="noreferrer"
            >
              {locale === 'ja' && 'クラウドファンディングのサイトへ'}
              {locale === 'en' && 'クラウドファンディングのサイトへ'}
            </a>
          </p>
        </Container>
      </div>
    </div>
  );
};

export default LaboPreview;
