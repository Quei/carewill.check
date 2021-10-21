import cn from 'classnames';
import s from './FormSection.module.css';
import { Select } from '@components/ui/react-hook-form';
import type { VFC, Dispatch, SetStateAction } from 'react';
import type { Data } from '../data';
import type { SelectedOptions } from '../helper';
import type { Lang } from 'types/site';

type Props = {
  className?: string;
  localeLang: Lang;
  data: Data;
  setVariationChoices: Dispatch<SetStateAction<SelectedOptions>>;
};

const FormSection: VFC<Props> = ({
  className,
  localeLang,
  data,
  setVariationChoices,
}) => {
  return (
    <section className={cn(s.root, className)}>
      <h2>{data.title[localeLang]}</h2>
      {data.inputs.map((input) => (
        <div key={input.name}>
          <Select
            required={true}
            name={input.name}
            id={input.name}
            options={input.values.map((value) => {
              return {
                value: value[localeLang],
                label: value[localeLang],
              };
            })}
            // onFocus={onFocus}
            // onChange={delayClose}
          />
          {input.notes && (
            <div>
              {input.notes.map((note, index) => (
                <p key={`note-${input.name}-${index}`}>{note[localeLang]}</p>
              ))}
            </div>
          )}
        </div>
      ))}
      <div></div>
    </section>
  );
};

export default FormSection;
