import { useIntl } from 'react-intl';
export const useIntlMessage = () => {
  const { formatMessage } = useIntl();
  return (id: string, values?: Parameters<typeof formatMessage>[1]) =>
    formatMessage({ id }, values) as string;
};
