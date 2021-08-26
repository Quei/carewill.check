import { Link } from 'react-scroll';
import cn from 'classnames';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useScreen } from '@lib/hooks/useScreen';
import type { VFC } from 'react';
import type { Lang } from 'types/site';
import type { LanguageContent } from '../data';

type Props = {
  className?: string;
  titles: ({
    title: LanguageContent;
    index: number;
  } | null)[];
  localeLang: Lang;
};

const ErrorTitles: VFC<Props> = ({ className, titles, localeLang }) => {
  const f = useIntlMessage();
  const { isScreenMd } = useScreen();
  const offset = isScreenMd ? -65 : -55;
  return (
    <div className={cn('text-red', 'text-center', className)}>
      <p>{f('form.error.messageBlock')}</p>
      <ul>
        {titles.map((item) => (
          <li key={`error-title-${item?.index}`}>
            <Link
              className="cursor-pointer underline hover:no-underline"
              to={`section-${item?.index}`}
              smooth={true}
              offset={offset}
              duration={500}
            >
              {item?.index !== undefined ? `(${item.index + 1})` : ''}
              {item?.title[localeLang]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorTitles;
