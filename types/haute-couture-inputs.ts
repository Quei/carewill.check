type TextType = string | null;

type CheckboxType = string | string[] | null;

type SelectType = {
  value: string;
  label: string;
} | null;

export type HauteCoutureInputs = {
  clothes_type_radio?: CheckboxType;
  clothes_type_other?: TextType;
  color?: TextType;
  frequency_in_use?: SelectType;
  frequency_in_use_other?: TextType;
  place_and_time?: SelectType;
  hurt?: CheckboxType;
  hurt_other?: TextType;
  name_of_illness?: TextType;
  requiring_help_or_care_level?: SelectType;
  tube_part?: TextType;
  assisting_dressing?: CheckboxType;
  pullover_of_extra_space?: CheckboxType;
  pullover_inconvenient_level?: SelectType;
  pullover_inconvenient_part?: CheckboxType;
  pullover_inconvenient_additional_explanation?: TextType;
  pullover_inconvenient_other?: TextType;
  button?: SelectType;
  alternative_button?: SelectType;
  alternative_button_other?: TextType;
  wear_from_below?: CheckboxType;
  measurement_neck?: TextType;
  measurement_shoulder?: TextType;
  measurement_sleeve?: TextType;
  measurement_chest?: TextType;
  measurement_waist?: TextType;
  measurement_wrist?: TextType;
  measurement_length?: TextType;
  number?: SelectType;
  email?: TextType;
  acceptance?: boolean;
  request_about_materials?: TextType;
  request_about_length?: TextType;
  request_about_extra_space?: TextType;
  request_about_delivery?: TextType;
};

type TypeFilter<T, U> = {
  [P in keyof T]: P extends U ? U : never;
};

export type SelectInputs = TypeFilter<HauteCoutureInputs, SelectType>;
