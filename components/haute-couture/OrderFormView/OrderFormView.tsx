import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './OrderFormView.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import {
  PageHeader,
  Block,
  Container,
  Button,
  Input,
  Select,
} from '@components/ui';
import { FormSection } from './FormSection';
import { Checkboxes } from './Checkboxes';
import { Acceptance } from './Acceptance';
import type { VFC } from 'react';
import type { HauteCoutureOptions } from 'types/haute-couture-options';
import type { HauteCoutureOrderFormViewFragment } from 'types/schema';
import { data } from './data';

type Props = HauteCoutureOrderFormViewFragment & {
  className?: string;
};

export const hauteCoutureOrderFormViewFragment = /* GraphQL */ `
  fragment hauteCoutureOrderFormView on HauteCouture {
    formTitle
    formDescription {
      json
    }
    slug
  }
`;

const OrderFormView: VFC<Props> = ({ formTitle, formDescription, slug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HauteCoutureOptions>();

  const onSubmit: SubmitHandler<HauteCoutureOptions> = (data) => {
    console.log(data);
  };

  const titleText = formTitle ?? '';
  const descriptionText = renderRichText(formDescription);
  const f = useIntlMessage();
  const { locale } = useRouter();
  const localeLang = locale ? (locale as 'ja' | 'en') : 'ja';

  return (
    <>
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
      <Block title={titleText} titleTag="h1" hasNoPaddingMobile={true}>
        <Container className={cn(s.description)}>
          {renderRichTextReact(formDescription)}
        </Container>
      </Block>
      <form className={cn(s.form)} onSubmit={handleSubmit(onSubmit)}>
        {data.map((item, index) => {
          return (
            <FormSection
              className={cn(s.section)}
              key={`section-${index}`}
              id={`section-${index}`}
              nextSectionId={`section-${index + 1}`}
              title={item.title[localeLang] ?? ''}
              required={item.required}
            >
              {item.inputs.map((input) => {
                const description =
                  locale === 'ja'
                    ? input.description?.ja
                    : input.description?.en;
                return (
                  <div key={`section-${index}-input-${input.name}`}>
                    {description && (
                      <p
                        className={cn(s.inputDescription)}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    )}
                    {(input.type === 'text' || input.type === 'email') && (
                      <Input
                        type={input.type}
                        placeholder={input?.placeholder?.[localeLang]}
                      />
                    )}
                    {(input.type === 'radio' || input.type === 'checkbox') && (
                      <Checkboxes
                        className={cn(
                          s.checkboxes,
                          { [s.gridLayout]: input.columnNumber !== undefined },
                          { [s.column3]: input.columnNumber === 3 },
                          { [s.column4]: input.columnNumber === 4 }
                        )}
                        localeLang={localeLang}
                        isRadio={input.type === 'radio'}
                        {...input}
                      />
                    )}
                    {input.type === 'select' && (
                      <Select name={input.name}>
                        {input.values.map((value, index) => (
                          <option
                            key={`${input.name}-${index}`}
                            value={value[localeLang]}
                          >
                            {value[localeLang]}
                          </option>
                        ))}
                      </Select>
                    )}
                    {input.type === 'acceptance' && <Acceptance />}
                    {input.type !== 'text' &&
                      input.type !== 'email' &&
                      input.type !== 'select' &&
                      input.type !== 'radio' &&
                      input.type !== 'checkbox' &&
                      input.type !== 'acceptance' && (
                        <div className="h-96 border bg-gray-200">
                          画像インタラクション作成中
                        </div>
                      )}
                  </div>
                );
              })}
            </FormSection>
          );
        })}
        <Block className={cn(s.submitBlock)}>
          <Container className="text-center">
            <Button aria-label="Submit" type="submit" className={s.submit}>
              {f('submit')}
            </Button>
          </Container>
        </Block>
      </form>
    </>
  );
};

export default OrderFormView;
