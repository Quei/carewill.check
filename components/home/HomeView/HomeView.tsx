import { Seo } from '@components/common';
import { Store } from './Store';
import { Labo } from './Labo';
import { AboutUs } from './AboutUs';
import type { VFC } from 'react';
import type { Props as StoreProps } from './Store';
import type { Props as LaboProps } from './Labo';
import type { Props as AboutProps } from './AboutUs';
import type { Maybe, NavigationAboutFragment } from 'types/schema';

type Props = {
  store?: StoreProps;
  labo?: LaboProps;
  about?: AboutProps;
  aboutNavigation?: Maybe<NavigationAboutFragment>;
};

const HomeView: VFC<Props> = ({ store, labo, about, aboutNavigation }) => {
  return (
    <>
      {/* NOTE:
      何故か、next-seoのdefaultTitleの仕組みが上手く機能しないので、
      homeはここでtitleとtitleTemplateを設定する（両方指定しないと、上手く動作しない）。
       */}
      <Seo title={'Carewill'} titleTemplate={'Carewill'} />
      {store && <Store {...store} />}
      {labo && <Labo {...labo} />}
      {about && (
        <AboutUs {...about} navigation={aboutNavigation ?? undefined} />
      )}
    </>
  );
};

export default HomeView;
