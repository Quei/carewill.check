import { VFC } from 'react';
import cn from 'classnames';
import s from './SiteHeaderLogo.module.css';
import Link from 'next/link';
import { Logo } from '@components/ui';

interface Props {
  isSiteRoot: boolean;
}

const SiteHeaderLogo: VFC<Props> = ({ isSiteRoot }) => {
  return (
    <div className={cn(s.root, { 'sr-only': !isSiteRoot })}>
      <Link href="/">
        <a aria-label="Logo">
          <Logo />
        </a>
      </Link>
    </div>
  );
};

export default SiteHeaderLogo;
