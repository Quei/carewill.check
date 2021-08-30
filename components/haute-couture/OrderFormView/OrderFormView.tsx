import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { scroller } from 'react-scroll';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';
import s from './OrderFormView.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { useScreen } from '@lib/hooks/useScreen';
import {
  renderRichText,
  renderRichTextReact,
} from '@lib/contentful/utils/rich-text';
import { Block, Container, Link } from '@components/ui';
import { FormSection } from './FormSection';
import { ErrorTitles } from './ErrorTitles';
import type { VFC } from 'react';
import type { DeepMap, FieldError } from 'react-hook-form';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';
import type { HauteCoutureOrderFormViewFragment } from 'types/schema';
import { data } from './data';
import { useEffect } from 'react';

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

const getErrorTitles = (errors: DeepMap<HauteCoutureInputs, FieldError>) => {
  // NOTE:
  // なぜかuseMemo(() => {}, [errors])をしても
  // errorsが更新されないので、普通にgetにしておく
  return data
    .map((item, index) => {
      const hasError = item.inputs.some((input) => {
        return input.name in errors;
      });
      if (hasError) {
        return { title: item.title, index };
      } else {
        return null;
      }
    })
    .filter((item) => item);
};

const useCurrentFocusIndex = () => {
  const [currentFocusIndex, setCurrentFocusIndex] = useState<number>();
  const handleOnFocus = useCallback((targetIndex: number) => {
    setCurrentFocusIndex(targetIndex);
  }, []);
  const { isScreenMd } = useScreen();

  useEffect(() => {
    if (currentFocusIndex !== undefined) {
      setTimeout(() => {
        scroller.scrollTo(`section-${currentFocusIndex}`, {
          duration: 400,
          smooth: true,
          offset: isScreenMd ? -65 : -55,
        });
      }, 1000);
    }
  }, [currentFocusIndex, isScreenMd]);
  return { currentFocusIndex, handleOnFocus };
};

const OrderFormView: VFC<Props> = ({ formTitle, formDescription, slug }) => {
  const formMethod = useForm<HauteCoutureInputs>({
    shouldFocusError: false,
  });
  const {
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
    },
  } = formMethod;

  const { locale } = useRouter();
  const localeLang = locale ? (locale as 'ja' | 'en') : 'ja';
  const [message, setMessage] = useState<string>();

  const onSubmit: SubmitHandler<HauteCoutureInputs> = useCallback(
    async (submitData) => {
      const contactData = data.map((section) => {
        const title = section.title[localeLang];
        const answers = section.inputs
          .filter((input) => input.name !== 'acceptance')
          .map((input) => {
            const question =
              input.type === 'text' && input.label?.[localeLang]
                ? input.label[localeLang]
                : title;
            const answer = submitData[input.name];

            let answerText = '';
            if (answer !== null && answer !== undefined) {
              if (typeof answer === 'string') {
                answerText = answer;
              } else if (Array.isArray(answer)) {
                answerText = answer.join(', ');
              } else if (typeof answer === 'object') {
                answerText = answer.value;
              }
            }

            return {
              name: input.name,
              question,
              answer: answerText,
            };
          });
        return {
          title,
          answers,
        };
      });

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: contactData,
          type: 'haute-couture',
          locale: localeLang,
        }),
      });
      if (res.status === 200) {
        const json = await res.json();
        console.log(json.message);
        setMessage(json.message);
      } else {
        console.log('Send mail error: ', res);
      }
    },
    [localeLang]
  );

  const titleText = formTitle ?? '';
  const descriptionText = renderRichText(formDescription);
  const f = useIntlMessage();
  const errorTitles = getErrorTitles(errors);
  const { currentFocusIndex, handleOnFocus } = useCurrentFocusIndex();

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
        <Container className={cn('pt-24', 'pb-10', s.description)}>
          {renderRichTextReact(formDescription)}
        </Container>
      </Block>
      <FormProvider {...formMethod}>
        <form
          className={cn(s.form)}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {data.map((item, index) => {
            return (
              <FormSection
                key={`section-${index}`}
                id={`section-${index}`}
                localeLang={localeLang}
                data={item}
                // onFocus={() => handleOnFocus(index)}
                index={index}
                // currentFocusIndex={currentFocusIndex}
              />
            );
          })}
          <Block className={cn('py-16')}>
            <Container>
              <button
                aria-label="Submit"
                type="submit"
                className={cn(
                  'block',
                  'leading-none',
                  'text-2xl',
                  'border',
                  'border-green',
                  'h-14',
                  'w-52',
                  'mx-auto',
                  'hover:text-white',
                  'hover:bg-green',
                  s.submit
                )}
                disabled={isSubmitting || isSubmitSuccessful}
              >
                {!isSubmitSuccessful && !isSubmitting && f('form.submit')}
                {isSubmitSuccessful && f('form.submit.success')}
                {isSubmitting && f('form.submit.ing')}
              </button>
              {(isSubmitSuccessful || (isSubmitted && !isValid)) && (
                <div className={cn('text-sm', 'mt-10', 'md:mt-16')}>
                  {isSubmitted && !isValid && (
                    <ErrorTitles titles={errorTitles} localeLang={localeLang} />
                  )}
                  {isSubmitSuccessful && message && (
                    <>
                      <div
                        className={cn(s.message)}
                        dangerouslySetInnerHTML={{ __html: message }}
                      />
                      <p className={cn('text-center', 'mt-10', 'text-base')}>
                        <Link href="/" className={cn('hover:underline')}>
                          {f('form.topLink')}
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              )}
            </Container>
          </Block>
        </form>
      </FormProvider>
    </>
  );
};

export default OrderFormView;
