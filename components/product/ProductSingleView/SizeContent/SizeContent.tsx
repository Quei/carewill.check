import { useCallback, useRef, useEffect } from 'react';
import cn from 'classnames';
import s from './SizeContent.module.css';
import { renderRichTextReact } from '@lib/contentful/utils/rich-text';
import { Cross } from '@components/icons';
import type { VFC, MouseEventHandler } from 'react';
import type { ProductSingleViewFragment } from 'types/schema';

type Props = {
  className?: string;
  content: ProductSingleViewFragment['size'];
  onClick: () => void;
};

const SizeContent: VFC<Props> = ({ className, content, onClick }) => {
  const bgOnClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      onClick();
    },
    [onClick]
  );
  const cancelClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <div
      className={cn('flex', 'justify-center', 'items-center', className)}
      onClick={bgOnClick}
    >
      <div
        className={cn(
          'relative',
          'bg-white',
          'border',
          'border-current',
          s.contentContainer
        )}
      >
        <button
          className={cn('absolute', 'z-20', 'top-0', 'right-0')}
          aria-label="close"
          onClick={onClick}
        >
          <Cross className={cn('w-12', 'h-12')} />
        </button>
        <div
          className={cn(
            'px-5',
            'pt-3',
            'pb-5',
            'text-sm',
            'h-full',
            'overflow-y-auto',
            s.content
          )}
          onClick={cancelClick}
        >
          {renderRichTextReact(content)}
        </div>
      </div>
    </div>
  );
};

export default SizeContent;
