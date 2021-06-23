import { FC } from 'react';
import cn from 'classnames';
import s from './OrderFormSection.module.css';
import type { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  title?: string;
  titleTagName?: 'h2' | 'h3';
  description?: string;
};

const OrderFormSection: FC<Props> = ({
  className,
  children,
  title,
  titleTagName = 'h2',
  description,
}) => {
  const WrapperTag = title ? 'section' : 'div';
  const TitleTag = titleTagName;

  return (
    <WrapperTag className={cn(s.root, className)}>
      {(title || description) && (
        <header className={cn(s.header)}>
          {title && <TitleTag className={cn(s.title)}>{title}</TitleTag>}
          {description && <p className={cn(s.description)}>{description}</p>}
        </header>
      )}
      <div className={cn(s.content)}>{children}</div>
    </WrapperTag>
  );
};

export default OrderFormSection;
