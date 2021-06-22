import { FC, useState } from 'react';
import cn from 'classnames';
import s from './I18nWidget.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LOCALE_DATA {
  name: string;
  label: string;
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  ja: {
    name: 'Japanese',
    label: 'ja',
  },
  en: {
    name: 'English',
    label: 'en',
  },
};

const I18nWidget: FC = () => {
  const { locales, asPath: currentPath } = useRouter();

  return (
    <ul className={cn(s.root)}>
      {locales?.map((locale, index) => (
        <li key={locale}>
          {index !== 0 && (
            <span className={cn(s.slash)} aria-hidden={true}>
              /
            </span>
          )}
          <Link href={currentPath} locale={locale}>
            <a className={cn(s.item)} aria-label={LOCALES_MAP[locale].name}>
              {LOCALES_MAP[locale].label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default I18nWidget;
