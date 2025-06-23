import { useTranslation } from 'react-i18next';

function useFormatDate() {
  const { i18n } = useTranslation();

  return (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
};

export default useFormatDate;