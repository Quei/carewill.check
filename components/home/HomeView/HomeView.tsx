import { Store } from './Store';
import { Labo } from './Labo';
import { LaboPreview } from './LaboPreview';
import { AboutUs } from './AboutUs';
import type { VFC } from 'react';
import type { Props as StoreProps } from './Store';
import type { Props as LaboProps } from './Labo';
import type { Props as AboutProps } from './AboutUs';

type Props = {
  store?: StoreProps;
  labo?: LaboProps;
  about?: AboutProps;
};

const HomeView: VFC<Props> = ({ store, labo, about }) => {
  return (
    <>
      {store && <Store {...store} />}
      {labo && <Labo {...labo} />}
      {about && <AboutUs {...about} />}
    </>
  );
};

export default HomeView;
