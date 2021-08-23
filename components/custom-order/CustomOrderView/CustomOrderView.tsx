import Link from 'next/link';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './CustomOrderView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { getOpenGraph } from '@lib/get-open-graph';
import { PageHeader, OnelineLink, FullImage } from '@components/ui';
import type { FC } from 'react';
import type { CustomOrderViewFragment } from 'types/schema';

type Props = CustomOrderViewFragment & {
  className?: string;
  children?: any;
};

export const customOrderViewFragment = /* GraphQL */ `
  fragment customOrderView on CustomOrder {
    title
    description {
      json
    }
    image {
      url
    }
  }
`;

const CustomOrderView: FC<Props> = ({ title, description, image }) => {
  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();
  const openGraph = getOpenGraph({
    title: titleText,
    description: descriptionText,
    image,
  });
  return (
    <>
      <NextSeo
        title={titleText}
        description={descriptionText}
        openGraph={openGraph}
      />
      <PageHeader title={f('customOrder')}>
        {renderRichTextReact(description)}
      </PageHeader>
      {image?.url && <FullImage src={image?.url ?? ''} alt={titleText ?? ''} />}
      <OnelineLink href="https://google.com">Makuakeへ</OnelineLink>
    </>
  );
};

export default CustomOrderView;
