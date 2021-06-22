import { FC } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './CustomOrderView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { renderRichText } from '@lib/contentful/utils/rich-text';
import { Page, Header } from '@components/common';
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
    slug
  }
`;

const CustomOrderView: FC<Props> = ({ title, description, slug }) => {
  const titleText = title ?? '';
  const descriptionText = renderRichText(description);
  const f = useIntlMessage();
  return (
    <div className={cn(s.root)}>
      <NextSeo
        title={titleText}
        description={descriptionText}
        openGraph={{
          type: 'website',
          title: titleText,
          description: descriptionText,
          // images: [
          //   {
          //     url: product.images[0]?.url!,
          //     width: 800,
          //     height: 600,
          //     alt: product.name,
          //   },
          // ],
        }}
      />
      <Page
        header={
          <Header title={f('customOrder')} description={descriptionText} />
        }
      >
        <Link href="/custom-order/order">
          <a>{f('formLink')}</a>
        </Link>
      </Page>
      <section>
        <h2>{f('relatedPosts')}</h2>
      </section>
    </div>
  );
};

export default CustomOrderView;
