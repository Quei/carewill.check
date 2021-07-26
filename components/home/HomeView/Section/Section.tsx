import cn from 'classnames';
import s from './Section.module.css';
import { PageHeader } from '@components/ui';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

const Section: FC<Props> = ({ className, title, description, children }) => {
  return (
    <section className={cn(s.root, className)}>
      <PageHeader title={title} titleTag="h2">
        {description}
      </PageHeader>
      {children && <div className={cn(s.content)}>{children}</div>}
    </section>
  );
};

export default Section;
