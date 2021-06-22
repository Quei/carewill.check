import React, { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import s from './Layout.module.css';
import { IntlProvider } from 'react-intl';
import { CommerceProvider } from '@framework';
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies';
import { useUI } from '@components/ui/context';
import { SiteHeaderLogo, Navbar, SiteFooter } from '@components/common';
import { Sidebar, Button, Modal, LoadingDots } from '@components/ui';
import CartSidebarView from '@components/cart/CartSidebarView';
import LoginView from '@components/auth/LoginView';
import { ja as localeContentJa, en as localeContentEn } from '@content/locales';
import type { Page } from '@commerce/types/page';
import type { Category } from '@commerce/types/site';

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: () => <Loading />,
};

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
);

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
);

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
);

interface Props {
  pageProps: {
    pages?: Page[];
    categories: Category[];
    isSiteRoot?: boolean;
  };
}

const Layout: FC<Props> = ({
  children,
  pageProps: { categories = [], isSiteRoot, ...pageProps },
}) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const { locale = 'ja', defaultLocale } = useRouter();
  const messages = useMemo(() => {
    return locale === 'ja' ? localeContentJa : localeContentEn;
  }, [locale]);

  const navBarlinks = categories.slice(0, 2).map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }));

  return (
    <CommerceProvider locale={locale}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <div className={cn(s.root)}>
          <SiteHeaderLogo isSiteRoot={isSiteRoot ?? false} />
          <Navbar links={navBarlinks} />
          <main className="fit">{children}</main>
          <SiteFooter pages={pageProps.pages} />

          <Modal open={displayModal} onClose={closeModal}>
            {modalView === 'LOGIN_VIEW' && <LoginView />}
            {modalView === 'SIGNUP_VIEW' && <SignUpView />}
            {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
          </Modal>

          <Sidebar open={displaySidebar} onClose={closeSidebar}>
            <CartSidebarView />
          </Sidebar>

          <FeatureBar
            title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
            hide={acceptedCookies}
            action={
              <Button className="mx-5" onClick={() => onAcceptCookies()}>
                Accept cookies
              </Button>
            }
          />
        </div>
      </IntlProvider>
    </CommerceProvider>
  );
};

export default Layout;
