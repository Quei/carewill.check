import cn from 'classnames';
import s from './SiteHeaderLogo.module.css';
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
    </div>
  );
};

export default SiteHeaderLogo;
