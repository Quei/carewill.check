import Link from 'next/link';
import cn from 'classnames';
import s from './HomeView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { Grid, Block } from '@components/ui';
import { Store } from './Store';
import { Labo } from './Labo';
import { AboutUs } from './AboutUs';
import { Section } from './Section';
import type { VFC } from 'react';
import type {
  HomeStoreViewFragment,
  HomeLaboViewFragment,
  HomeAboutViewFragment,
} from 'types/schema';

type Props = {
  className?: string;
  store?: HomeStoreViewFragment;
  labo?: HomeLaboViewFragment;
  about?: HomeAboutViewFragment;
};

const HomeView: VFC<Props> = ({ className, store, labo, about }) => {
  const f = useIntlMessage();
  return (
    <>
      <div className="h-60">slide-show</div>
      {store && <Store {...store} />}
      {labo && <Labo {...labo} />}
      {about && <AboutUs {...about} />}
    </>
  );
};

export default HomeView;
