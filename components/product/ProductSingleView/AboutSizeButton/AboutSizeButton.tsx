import cn from 'classnames';
import s from './AboutSize.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import type { VFC } from 'react';

type Props = {
  className?: string;
  onClick: () => void;
};

const AboutSizeButton: VFC<Props> = ({ className, onClick }) => {
  const f = useIntlMessage();
  return (
    <button
      className={cn('underline', 'hover:no-underline', 'pt-2', className)}
      onClick={onClick}
    >
      {f('store.product.aboutSize')}
    </button>
  );
};

export default AboutSizeButton;
