import type { Navigation, Maybe } from 'types/schema';

export type Repeater = {
  id: string;
  key: string;
  value: string;
};

export type AllNavigations = {
  store:
    | Maybe<
        {
          __typename?: 'Navigation' | undefined;
        } & Pick<Navigation, 'menu' | 'sns'>
      >
    | undefined;
  labo:
    | Maybe<
        {
          __typename?: 'Navigation' | undefined;
        } & Pick<Navigation, 'menu'>
      >
    | undefined;
  about:
    | Maybe<
        {
          __typename?: 'Navigation' | undefined;
        } & Pick<Navigation, 'menu'>
      >
    | undefined;
};
