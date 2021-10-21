import type {
  NavigationStoreFragment,
  NavigationLaboFragment,
  NavigationAboutFragment,
} from 'types/schema';

export type AllNavigations = {
  store: NavigationStoreFragment;
  labo: NavigationLaboFragment;
  about: NavigationAboutFragment;
};
