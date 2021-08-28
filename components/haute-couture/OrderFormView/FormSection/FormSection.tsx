import { useState, useEffect, useCallback } from 'react';
import { useFormState, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import cn from 'classnames';
import s from './FormSection.module.css';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { YouTube, ErrorText } from '@components/ui';
import { Input, Checkbox, Select } from '@components/ui/react-hook-form';
import { Root } from './Root';
import { ClothesType } from './ClothesType';
import { ClothesTypeOther } from './ClothesTypeOther';
import { Acceptance } from './Acceptance';
import { Hurt } from './Hurt';
import { PulloverOfExtraSpace } from './PulloverOfExtraSpace';
import { PulloverInconvenientPart } from './PulloverInconvenientPart';
import { Measurement } from './Measurement';
import type { VFC } from 'react';
import type { Lang } from 'types/site';
import type { Data } from '../data';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

type InputNames = Array<keyof HauteCoutureInputs>;

type Props = {
  id: string;
  localeLang: Lang;
  data: Data;
  onFocus?: () => void;
  index: number;
  currentFocusIndex?: number;
};

const useIsOpen = ({
  index,
  currentFocusIndex,
  inputNames,
  hasError,
  hasRequired,
}: Pick<Props, 'index' | 'currentFocusIndex'> & {
  inputNames: InputNames;
  hasError: boolean;
  hasRequired: boolean;
}) => {
  // const { trigger } = useFormContext<HauteCoutureInputs>();
  // const validate = useCallback(async () => {
  //   const results = await trigger(inputNames);
  //   return results;
  // }, [trigger, inputNames]);
  const [isOpen, setIsOpen] = useState(true);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  // const close = useCallback(async () => {
  //   if (hasRequired) {
  //     const results = await validate();
  //     if (results) {
  //       setIsOpen(false);
  //     }
  //   } else {
  //     setIsOpen(false);
  //   }
  //   // NOTE:
  //   // validateを含めると無限ループになるので、
  //   // 除外する。（問題が起きたら考える）
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasRequired]);
  const delayClose = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (currentFocusIndex !== undefined && index < currentFocusIndex) {
      close();
    }
  }, [index, currentFocusIndex, close]);

  return { isOpen, open, delayClose };
};

const useSectionStatus = (inputNames: InputNames) => {
  const f = useIntlMessage();
  const { getValues } = useFormContext<HauteCoutureInputs>();
  const values = getValues(inputNames);
  const hasValue = values.some((value) => value);
  return hasValue ? f('form.change') : f('form.empty');
};

const FormSection: VFC<Props> = ({
  id,
  localeLang,
  data,
  onFocus,
  index,
  currentFocusIndex,
}) => {
  const { errors } = useFormState<HauteCoutureInputs>();
  // NOTE:
  // わざわざrequiredをstate化するのは、
  // clothesTypeOtherのrequiredが動的に変化するので、
  // それに対応するため。
  const [hasRequired, setHasRequired] = useState<boolean>(() => {
    return data.inputs.some((input) => input.required);
  });

  const inputNames = data.inputs.map((input) => input.name);
  const hasError = inputNames.some((name) => name in errors);
  const { isOpen, open, delayClose } = useIsOpen({
    index,
    currentFocusIndex,
    inputNames,
    hasError,
    hasRequired,
  });
  const sectionStatus = useSectionStatus(inputNames);

  return (
    <Root
      id={id}
      title={data.title?.[localeLang] ?? ''}
      isOpen={isOpen}
      open={open}
      required={hasRequired}
      status={sectionStatus}
      hasError={hasError}
    >
      <div className={cn('pt-2.5', 'pb-14', 'md:py-16')}>
        <h2
          className={cn(s.title, {
            [s.hasRequired]: hasRequired,
            [s.hasError]: hasError && hasRequired,
          })}
          dangerouslySetInnerHTML={{ __html: data?.title?.[localeLang] ?? '' }}
        />
        <div className={cn('mt-8', 'md:mt-4', 'text-sm', s.content)}>
          {data.description?.[localeLang] && (
            <p
              className={cn(s.sectionDescription)}
              dangerouslySetInnerHTML={{
                __html: data.description[localeLang] ?? '',
              }}
            />
          )}
          {data.video && (
            <YouTube
              className={cn('aspect-w-16', 'aspect-h-9', s.video)}
              videoId={data.video}
              isLoop={true}
              isAuto={true}
            />
          )}
          {data.componentName && (
            <>
              {data.componentName === 'ClothesType' && (
                <ClothesType
                  localeLang={localeLang}
                  inputs={data.inputs}
                  // onFocus={onFocus}
                  // onChange={delayClose}
                />
              )}
              {data.componentName === 'ClothesTypeOther' && (
                <ClothesTypeOther
                  localeLang={localeLang}
                  inputs={data.inputs}
                  hasRequired={hasRequired}
                  setHasRequired={setHasRequired}
                  // onFocus={onFocus}
                />
              )}
              {data.componentName === 'Hurt' && (
                <Hurt
                  localeLang={localeLang}
                  inputs={data.inputs}
                  // onFocus={onFocus}
                />
              )}
              {data.componentName === 'PulloverOfExtraSpace' && (
                <PulloverOfExtraSpace
                  localeLang={localeLang}
                  inputs={data.inputs}
                  // onFocus={onFocus}
                />
              )}
              {data.componentName === 'PulloverInconvenientPart' && (
                <PulloverInconvenientPart
                  localeLang={localeLang}
                  inputs={data.inputs}
                  // onFocus={onFocus}
                />
              )}
              {data.componentName === 'Measurement' && (
                <Measurement
                  localeLang={localeLang}
                  inputs={data.inputs}
                  // onFocus={onFocus}
                />
              )}
            </>
          )}
          {!data.componentName &&
            data.inputs.map((input, index) => {
              const description =
                localeLang === 'ja'
                  ? input.description?.ja
                  : input.description?.en;
              return (
                <div
                  key={`section-${index}-input-${input.name}`}
                  className={cn(s.input)}
                >
                  {description && (
                    <p
                      className={cn(s.inputDescription)}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                  {(input.type === 'text' || input.type === 'email') && (
                    <Input
                      name={input.name}
                      required={input.required}
                      type={input.type}
                      placeholder={input?.placeholder?.[localeLang]}
                      // onFocus={onFocus}
                    />
                  )}
                  {(input.type === 'radio' || input.type === 'checkbox') && (
                    <div className={cn(s.checkboxes, input.name)}>
                      {input.values.map((value, index) => (
                        <Checkbox
                          className={cn(s.checkbox)}
                          key={`${input.name}-${index}`}
                          type={input.type}
                          name={input.name}
                          value={value[localeLang]}
                          required={input.required}
                          image={value.image}
                          // onFocus={onFocus}
                        >
                          {value[localeLang]}
                        </Checkbox>
                      ))}
                    </div>
                  )}
                  {input.type === 'select' && (
                    <Select
                      required={input.required}
                      name={input.name}
                      id={input.name}
                      hasOtherText={input.hasOtherText}
                      options={input.values.map((value) => {
                        return {
                          value: value[localeLang],
                          label: value[localeLang],
                        };
                      })}
                      // onFocus={onFocus}
                      // onChange={delayClose}
                    />
                  )}
                  {input.type === 'acceptance' && <Acceptance />}
                  {errors?.[input.name] && (
                    <ErrorText className="mt-3">
                      <ErrorMessage errors={errors} name={input.name} />
                    </ErrorText>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Root>
  );
};

export default FormSection;
