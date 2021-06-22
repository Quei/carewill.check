import { FC } from 'react';
import cn from 'classnames';
import s from './SiteFooter.module.css';
import { Container } from '@components/ui';
import type { Page } from '@commerce/types/page';

interface Props {
  className?: string;
  children?: any;
  pages?: Page[];
}

const LINKS = [
  {
    name: 'twitter',
    label: 'twitter',
    url: 'https://google.com',
  },
  {
    name: 'youtube',
    label: 'youtube',
    url: 'https://google.com',
  },
  {
    name: 'other',
    label: 'other',
    url: 'https://google.com',
  },
  {
    name: 'note',
    label: 'note',
    url: 'https://google.com',
  },
];

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy'];

const SiteFooter: FC<Props> = ({ className, pages }) => {
  return (
    <footer className={cn(className, s.root)}>
      <Container>
        <div className="">
          <div>
            <p>
              グッドデザイン賞2021受賞　Tokyo Startup Gateway
              2019/ファイナリスト&オーディエンス賞受賞 TOKYO STARTUP
              DEGAWA/最優秀出川賞受賞
            </p>
            <p>
              copyright&copy; 株式会社ケアウィル , 2020 All Rights Reserved.
            </p>
          </div>
          {LINKS && (
            <ul>
              {LINKS.map((link) => (
                <li key={`footer-link-item-${link.name}`}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
};

export default SiteFooter;
