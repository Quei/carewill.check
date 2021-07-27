import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { scroller } from 'react-scroll';
import cn from 'classnames';
import s from './FormSection.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { Container } from '@components/ui';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  id: string;
  nextSectionId: string;
  title: string;
  required?: boolean;
  children: ReactNode;
};

const useScrollToNextSection = (nextSectionId: string) => {
  return useCallback(() => {
    scroller.scrollTo(nextSectionId, {
      duration: 250,
      smooth: true,
      offset: -55,
    });
  }, [nextSectionId]);
};

const useIsOpen = (scrollToNextSection: () => void) => {
  const [isOpen, setIsOpen] = useState(true);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    const id = setTimeout(() => {
      scrollToNextSection();
      clearTimeout(id);
    }, 200);
  }, [scrollToNextSection]);
  return { isOpen, open, close };
};

const FormSection: FC<Props> = ({
  className,
  id,
  nextSectionId,
  title,
  required = false,
  children,
}) => {
  const scrollToNextSection = useScrollToNextSection(nextSectionId);
  const { isOpen, open, close } = useIsOpen(scrollToNextSection);
  const f = useIntlMessage();
  return (
    <section id={id} className={cn(s.root, className)}>
      <p className={cn('block-title', s.counter)} />
      <motion.div
        className={cn(s.motionDiv)}
        style={{ overflow: 'hidden' }}
        initial={{ height: 'auto' }}
        animate={{ height: isOpen ? 'auto' : '48px' }}
        transition={{ duration: 0.1 }}
      >
        {!isOpen && (
          <button className={s.openButton} onClick={open}>
            {f('hauteCouture.open')}
          </button>
        )}
        <Container>
          <h2
            className={cn(s.title, {
              [s.required]: required,
              [s.lineClamp]: !isOpen,
            })}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className={cn(s.content)}>{children}</div>
        </Container>
        {isOpen && (
          <div className={cn(s.closeButtonWrapper)}>
            <button className={cn(s.closeButton)} onClick={close}>
              {f('hauteCouture.close')}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FormSection;
