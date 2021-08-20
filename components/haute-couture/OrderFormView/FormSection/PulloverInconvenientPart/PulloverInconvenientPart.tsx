import { Fragment } from 'react';
import { useFormState } from 'react-hook-form';
import cn from 'classnames';
import s from './PulloverInconvenientPart.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '@components/ui';
import { Checkbox, Input } from '@components/ui/react-hook-form';
import { SVG01, SVG02, SVG03, SVG04, SVG05, SVG06, SVG07, SVG08 } from './svg';
import type { VFC } from 'react';
import type { Lang } from 'types/site';
import type { InputType, CheckboxesInput, TextInput } from '../../data';
import type { HauteCoutureInputs } from 'types/haute-couture-inputs';

type Props = {
  className?: string;
  localeLang: Lang;
  inputs: InputType[];
  onFocus?: () => void;
};

const SVGComponents = [SVG01, SVG02, SVG03, SVG04, SVG05, SVG06, SVG07, SVG08];

const PulloverInconvenientPart: VFC<Props> = ({
  className,
  localeLang,
  inputs,
  onFocus,
}) => {
  const checkboxes = inputs[0] as CheckboxesInput;
  const text1 = inputs[1] as TextInput;
  const text2 = inputs[2] as TextInput;
  const { errors } = useFormState<HauteCoutureInputs>();

  if (!checkboxes || !text1 || !text2) {
    return null;
  }
  const texts = [text1, text2];

  return (
    <div className={cn(className)}>
      <p
        className={cn('mt-2.5')}
        dangerouslySetInnerHTML={{
          __html: checkboxes.description?.[localeLang] ?? '',
        }}
      />
      <div className={cn(s.checkboxes)}>
        {checkboxes.values.map((value, index) => {
          const SVG = SVGComponents[index];
          return (
            <Checkbox
              className={cn(s.checkbox)}
              key={`${checkboxes.name}-${index}`}
              name={checkboxes.name}
              required={checkboxes.required}
              value={value[localeLang]}
              type={checkboxes.type}
              image={<SVG />}
              onFocus={onFocus}
            >
              {value[localeLang]}
            </Checkbox>
          );
        })}
      </div>
      {texts.map((text) => {
        return (
          <Fragment key={text.name}>
            <p
              className={cn('mt-5', 'md:mt-16')}
              dangerouslySetInnerHTML={{
                __html: text?.description?.[localeLang] ?? '',
              }}
            />
            <Input
              className={cn('mt-3')}
              name={text.name}
              type={text.type}
              placeholder={text1.placeholder?.[localeLang]}
              onFocus={onFocus}
            />
          </Fragment>
        );
      })}
      {errors?.[checkboxes.name] && (
        <ErrorText className="mt-3">
          <ErrorMessage errors={errors} name={checkboxes.name} />
        </ErrorText>
      )}
    </div>
  );
};

export default PulloverInconvenientPart;
