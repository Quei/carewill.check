import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './HauteCoutureView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { getOpenGraph } from '@lib/get-open-graph';
import {
  PageHeader,
  OnelineLink,
  PickupSection,
  FullImage,
} from '@components/ui';
import type { FC } from 'react';
import type { HauteCoutureViewFragment } from 'types/schema';

type Props = HauteCoutureViewFragment & {
  className?: string;
  children?: any;
};

export const hauteCoutureViewFragment = /* GraphQL */ `
  fragment hauteCoutureView on HauteCouture {
    title
    description {
      json
    }
    image {
      url
    }
  }
`;

const DummyItems = [
  {
    sys: { id: 'test-01' },
    title: 'テスト',
    slug: 'test',
    date: '2022.07.01',
    content: 'test',
  },
  {
    sys: { id: 'test-02' },
    title: 'テスト2',
    slug: 'test2',
    date: '2022.07.02',
    content: 'test',
  },
  {
    sys: { id: 'test-03' },
    title: 'テスト3',
    slug: 'test3',
    date: '2022.07.03',
    content: 'test',
  },
];

const HauteCoutureView: FC<Props> = ({ title, description, image }) => {
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
      <PageHeader title={titleText}>
        {renderRichTextReact(description)}
      </PageHeader>
      {image?.url && <FullImage src={image?.url ?? ''} alt={titleText ?? ''} />}
      <OnelineLink href="/haute-couture/order-form">
        {f('formLink')}
      </OnelineLink>
      <OnelineLink href="/">{f('pdfLink')}</OnelineLink>
      <PickupSection
        title={f('pickup')}
        titleTag="h2"
        items={DummyItems}
        site={'labo'}
      />
    </>
  );
};

export default HauteCoutureView;
