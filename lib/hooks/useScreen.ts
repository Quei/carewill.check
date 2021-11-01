import { useMediaQuery } from '@react-hook/media-query';

export const useScreen = () => {
  const isScreenMd = useMediaQuery('(min-width: 769px)');
  const isScreenLg = useMediaQuery('(min-width: 1024px)');
  return { isScreenMd, isScreenLg };
};
