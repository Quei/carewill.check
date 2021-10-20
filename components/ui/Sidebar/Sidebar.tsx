import { useEffect, useRef } from 'react';
import Portal from '@reach/portal';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import s from './Sidebar.module.css';
import cn from 'classnames';
import type { FC } from 'react';

interface Props {
  children: any;
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  return (
    <Portal>
      {open ? (
        <div className={cn('fixed', 'inset-0', 'overflow-hidden', 'z-50')}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex outline-none">
              <div className="h-full md:w-screen md:max-w-md">
                <div
                  className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto"
                  ref={ref}
                >
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Sidebar;
