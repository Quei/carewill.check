import cn from 'classnames';
import s from './FormSection.module.css';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  title?: string;
  titleTagName?: 'h2' | 'h3';
  description?: string;
  children: ReactNode;
};

const FormSection: FC<Props> = ({
  className,
  title,
  titleTagName = 'h2',
  description,
  children,
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

export default FormSection;
