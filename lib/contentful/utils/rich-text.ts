import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

type RenderRichTextReactArgs = {
  json?: Parameters<typeof documentToReactComponents>[0];
};
export const renderRichTextReact = (args?: RenderRichTextReactArgs | null) => {
  if (!args?.json) {
    return null;
  }
  return documentToReactComponents(args.json);
};

type RenderRichTextArgs = {
  json?: Parameters<typeof documentToPlainTextString>[0];
};
export const renderRichText = (args?: RenderRichTextArgs | null) => {
  if (!args?.json) {
    return '';
  }
  return documentToPlainTextString(args.json);
};
