import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import Link from 'next/link';
import { INLINES } from '@contentful/rich-text-types';
import type {
  Options,
  NodeRenderer,
} from '@contentful/rich-text-react-renderer';

type RenderRichTextReactArgs = {
  json?: Parameters<typeof documentToReactComponents>[0];
};

const linkResolver: NodeRenderer = (node, children) => {
  const { uri } = node.data;
  return (
    <Link href={uri}>
      <a>{children}</a>
    </Link>
  );
};

const options: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: linkResolver,
  },
  renderText: (text) =>
    text
      .split('\n')
      .flatMap((text, i) => [i > 0 && <br key={`line-break-${i}`} />, text]),
};

export const renderRichTextReact = (args?: RenderRichTextReactArgs | null) => {
  if (!args?.json) {
    return null;
  }
  return documentToReactComponents(args.json, options);
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
