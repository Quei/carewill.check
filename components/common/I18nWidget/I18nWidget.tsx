import { useState } from 'react';
import cn from 'classnames';
import s from './I18nWidget.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { VFC } from 'react';
import type { Lang } from 'types/site';

type Props = {
  className?: string;
};

type Locale = {
  name: string;
  label: string;
};
const LOCALES_MAP: Record<Lang, Locale> = {
  ja: {
    name: 'Japanese',
    label: 'Ja',
  },
  en: {
    name: 'English',
    label: 'En',
  },
};

const I18nWidget: VFC<Props> = ({ className }) => {
  const { locales, locale: currentLocale, asPath: currentPath } = useRouter();

  return (
    <ul className={cn('flex', className)}>
      {locales?.map((locale, index) => (
        <li key={locale}>
          {index !== 0 && (
            <span className={cn('mx-0.5')} aria-hidden={true}>
              /
            </span>
          )}
          <Link href={currentPath} locale={locale}>
            <a
              className={cn('cursor-pointer', 'hover:line-through', {
                ['line-through']: locale === currentLocale,
              })}
              aria-label={LOCALES_MAP[locale as Lang].name}
            >
              {LOCALES_MAP[locale as Lang].label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default I18nWidget;
