import { NextSeo } from 'next-seo';
import Image from 'next/image';
import cn from 'classnames';
import s from './HauteCoutureView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Seo, LaboRelatedPosts } from '@components/common';
import { PageHeader, OnelineLink, FullImage, Container } from '@components/ui';
import type { RelatedPosts } from '@components/common/LaboRelatedPosts';
import type { VFC } from 'react';
import type { HauteCoutureViewFragment } from 'types/schema';

type Props = HauteCoutureViewFragment & {
  className?: string;
  relatedPosts?: RelatedPosts;
};

export const hauteCoutureViewFragment = /* GraphQL */ `
  fragment HauteCoutureView on HauteCouture {
    title
    description {
      json
    }
    image {
      url
      width
      height
    }
    orderSheet {
      url
    }
    orderStepsImage {
      url
      title
      width
      height
    }
    orderStepsMobileImage {
      url
      title
      width
      height
    }
  }
`;

const HauteCoutureView: VFC<Props> = ({
  title,
  description,
  image,
  orderSheet,
  orderStepsImage,
  orderStepsMobileImage,
  relatedPosts,
}) => {
  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();
  return (
    <>
      <Seo title={titleText} description={descriptionText} image={image} />
      <PageHeader title={titleText}>
        {renderRichTextReact(description)}
      </PageHeader>
      {image?.url && <FullImage src={image?.url ?? ''} alt={titleText ?? ''} />}
      <OnelineLink href="/haute-couture/order-form">
        {f('formLink')}
      </OnelineLink>
      {orderSheet?.url && (
        <OnelineLink href={orderSheet.url}>{f('pdfLink')}</OnelineLink>
      )}
      {orderStepsImage?.url && orderStepsMobileImage?.url && (
        <div
          className={cn('px-site-vertical', 'py-12', 'sm:pt-24', 'sm:pb-20')}
        >
          <Container>
            <div className={cn('hidden', 'sm:block')}>
              <Image
                src={orderStepsImage.url}
                alt={orderStepsImage.title ?? ''}
                width={orderStepsImage.width ?? ''}
                height={orderStepsImage.height ?? ''}
                layout="responsive"
              />
            </div>
            <div className={cn('sm:hidden')}>
              <Image
                src={orderStepsMobileImage.url}
                alt={orderStepsMobileImage.title ?? ''}
                width={orderStepsMobileImage.width ?? ''}
                height={orderStepsMobileImage.height ?? ''}
                layout="responsive"
              />
            </div>
          </Container>
        </div>
      )}
      <LaboRelatedPosts relatedPosts={relatedPosts} />
    </>
  );
};

export default HauteCoutureView;
