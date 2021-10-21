export type LanguageContent = {
  ja?: string;
  en?: string;
};

export type TextType = string | null;

export type CheckboxType = string | string[] | null;

export type SelectType = {
  value: string;
  label: string;
} | null;
