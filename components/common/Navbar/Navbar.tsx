import { FC } from 'react';
import Link from 'next/link';
import { Container } from '@components/ui';
import { I18nWidget, UserNav } from '@components/common';
import NavbarRoot from './NavbarRoot';
import s from './Navbar.module.css';

interface Link {
  href: string;
  label: string;
}
interface NavbarProps {
  links?: Link[];
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center flex-1">
          <nav className="hidden ml-6 space-x-4 lg:block">
            <Link href="/">
              <a className={s.link}>top</a>
            </Link>
            <Link href="/store">
              <a className={s.link}>store</a>
            </Link>
            <Link href="/labo">
              <a className={s.link}>labo</a>
            </Link>
            <Link href="/about-us">
              <a className={s.link}>about us</a>
            </Link>
            {/* <Link href="/search">
                <a className={s.link}>All</a>
              </Link> */}
            {/* <Link href="/search?q=clothes">
                <a className={s.link}>Clothes</a>
              </Link> */}
          </nav>
        </div>
        <I18nWidget />
        <div className="flex justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
);

export default Navbar;
