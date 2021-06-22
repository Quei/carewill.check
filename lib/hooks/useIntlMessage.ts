import { useIntl } from 'react-intl';
export const useIntlMessage = () => {
  const { formatMessage } = useIntl();
  return (id: string) => formatMessage({ id });
};
