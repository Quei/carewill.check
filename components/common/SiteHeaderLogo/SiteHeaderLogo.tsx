import cn from 'classnames';
import s from './SiteHeaderLogo.module.css';
import { I18nWidget } from '@components/common';
import { Logo, Link } from '@components/ui';
import type { VFC } from 'react';

type Props = {
  className?: string;
  isSiteRoot: boolean;
};

const SiteHeaderLogo: VFC<Props> = ({ className, isSiteRoot }) => {
  return (
    <div className={cn(s.root, { [s.isSiteRoot]: isSiteRoot }, className)}>
      <Link className={cn(s.link)} href="/" site="store" aria-label="Logo">
        <Logo />
      </Link>
      <I18nWidget className={cn(s.i18n)} />
    </div>
  );
};

export default SiteHeaderLogo;
