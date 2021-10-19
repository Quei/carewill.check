import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';
import { LinkResolver } from '@config/link-resolver';
import type { Document } from '@contentful/rich-text-types';
import type { Options } from '@contentful/rich-text-react-renderer';
import type {
  Maybe,
  RichTextAssetFragment,
  RichTextEntryHyperlinkFragment,
} from 'types/schema';

export const richTextAssetFragment = /* GraphQL */ `
  fragment RichTextAsset on Asset {
    sys {
      id
    }
    url
    description
    width
    height
  }
`;

type Entry = RichTextEntryHyperlinkFragment & {
  slug?: Maybe<string>;
};

type Asset = RichTextAssetFragment;

type Entries = {
  inline?: Array<Maybe<Entry>>;
  hyperlink?: Array<Maybe<Entry>>;
  block?: Array<Maybe<Entry>>;
};

type Assets = {
  hyperlink?: Array<Maybe<Asset>>;
  block?: Array<Maybe<Asset>>;
};

type Links = {
  entries?: Entries;
  assets?: Assets;
};

type RenderRichTextArgs = {
  json?: Document;
  links?: Links;
};

const renderOptions = (links?: Links): Options => {
  // create an asset map
  const assetMap = new Map();
  if (links?.assets?.block) {
    for (const asset of links?.assets?.block) {
      assetMap.set(asset?.sys.id, asset);
    }
  }

  // create an entry map
  const entryMap = new Map<string, Entry>();
  if (links?.entries?.hyperlink) {
    // if ('block' in links?.entries) {
    //   for (const entry of links?.entries.block) {
    //     entryMap.set(entry.sys.id, entry);
    //   }
    // }

    // if ('inline' in links?.entries) {
    //   for (const entry of links?.entries.inline) {
    //     entryMap.set(entry.sys.id, entry);
    //   }
    // }

    for (const entry of links.entries.hyperlink) {
      if (entry?.sys) {
        entryMap.set(entry.sys.id, entry);
      }
    }
  }

  return {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset) {
          return children;
        }
        return (
          <div className="image-wrapper">
            <Image
              src={asset.url}
              alt={asset.description}
              width={asset.width}
              height={asset.height}
            />
          </div>
        );
      },

      // eslint-disable-next-line react/display-name
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry?.slug) {
          return children;
        }

        return (
          <LinkResolver __typename={entry.__typename} slug={entry.slug}>
            {children}
          </LinkResolver>
        );
      },
      // eslint-disable-next-line react/display-name
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <a href={node.data.uri} target="_blank" rel="noreferrer noopener">
            {children}
          </a>
        );
      },
    },
    renderText: (text) =>
      text
        .split('\n')
        .flatMap((text, i) => [i > 0 && <br key={`line-break-${i}`} />, text]),
  };
};

export const renderRichTextReact = (args?: RenderRichTextArgs | null) => {
  if (!args?.json) {
    return null;
  }
  return documentToReactComponents(args.json, renderOptions(args.links));
};

export const renderRichText = (
  args?: RenderRichTextArgs | null,
  length?: number
) => {
  if (!args?.json) {
    return '';
  }
  const text = documentToPlainTextString(args.json);
  if (length) {
    return text.substr(0, length);
  }
  return text;
};

export const renderTextToDom = (text?: string | null) => {
  if (!text) {
    return '';
  }
  return text
    .split('\n')
    .flatMap((text, i) => [i > 0 && <br key={`line-break-${i}`} />, text]);
};
