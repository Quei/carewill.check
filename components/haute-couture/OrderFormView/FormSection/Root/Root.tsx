import { useFormContext } from 'react-hook-form';
import { useMediaQuery } from '@react-hook/media-query';
import { motion } from 'framer-motion';
import cn from 'classnames';
import s from './Root.module.css';
import { Block, Container } from '@components/ui';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  id: string;
  title: string;
  isOpen: boolean;
  open: () => void;
  required?: boolean;
  status: string;
  hasError?: boolean;
  children?: ReactNode;
};

const Root: FC<Props> = ({
  className,
  id,
  title,
  isOpen,
  open,
  required,
  status,
  hasError,
  children,
}) => {
  const isScreenMd = useMediaQuery('(min-width: 768px)');
  return (
    <section id={id} className={cn('relative', className)}>
      <p className={cn('block-title', s.counter)} />
      <motion.div
        initial={{ overflow: 'visible', height: 'auto' }}
        animate={
          isOpen
            ? {
                height: 'auto',
                transitionEnd: {
                  overflow: 'visible',
                },
              }
            : {
                overflow: 'hidden',
                height: isScreenMd ? '58px' : '52px',
              }
        }
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Block>
          <Container>
            <div
              // NOTE:
              // buttonにすると、
              // react-hook-formが反応するので、
              // divにしておく
              className={cn(
                s.openButton,
                { [s.isOpen]: isOpen },
                { [s.hasError]: hasError }
              )}
              onClick={open}
              aria-hidden={true}
            >
              <span
                className={cn(s.dummyTitle, { [s.required]: required })}
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <span className={cn(s.status)}>{status}</span>
            </div>
            <div className={cn(s.children, { [s.isHide]: !isOpen })}>
              {children}
            </div>
          </Container>
        </Block>
      </motion.div>
    </section>
  );
};

export default Root;
