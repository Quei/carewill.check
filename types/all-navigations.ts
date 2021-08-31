import type {
  NavigationStoreFragment,
  NavigationLaboFragment,
  NavigationAboutFragment,
} from 'types/schema';

export type Repeater = {
  id: string;
  key: string;
  value: string;
};

export type AllNavigations = {
  store: NavigationStoreFragment;
  labo: NavigationLaboFragment;
  about: NavigationAboutFragment;
};
