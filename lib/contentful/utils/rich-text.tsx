import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import Link from 'next/link';
import { INLINES } from '@contentful/rich-text-types';
import type {
  Options,
  NodeRenderer,
} from '@contentful/rich-text-react-renderer';
import type { Maybe } from 'types/schema';

type linkEntry = { sys: { id: string } } & {
  __typename: 'CustomOrder' | 'HauteCouture' | 'Home';
} & {
  slug?: string | null;
};

type RenderRichTextReactArgs = {
  json?: Parameters<typeof documentToReactComponents>[0];
  links?: {
    entries: {
      hyperlink: Array<Maybe<linkEntry>>;
    };
  };
};

// export const hyperlinkEntry = /* GraphQL */ `
//   fragment hyperlinkEntry on Entry {
//     __typename
//   }
// `;

const renderOptions = (links: RenderRichTextReactArgs['links']): Options => {
  // create an asset map
  // const assetMap = new Map();
  // if (links?.assets) {
  //   if ('block' in links?.assets) {
  //     for (const asset of links?.assets.block) {
  //       assetMap.set(asset.sys.id, asset);
  //     }
  //   }
  // }

  // create an entry map
  const entryMap = new Map<string, linkEntry>();
  if (links?.entries) {
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

    for (const entry of links?.entries.hyperlink) {
      if (entry?.sys) {
        entryMap.set(entry.sys.id, entry);
      }
    }
  }

  return {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry) {
          return children;
        }

        if (entry.__typename === 'HauteCouture') {
          return (
            <Link href={`/${entry.slug}`}>
              <a>{children}</a>
            </Link>
          );
        } else if (entry.__typename === 'CustomOrder') {
          return (
            <Link href={`/${entry.slug}`}>
              <a>{children}</a>
            </Link>
          );
        } else {
          <Link href={`/${entry.slug}`}>
            <a>{children}</a>
          </Link>;
        }
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

export const renderRichTextReact = (args?: RenderRichTextReactArgs | null) => {
  if (!args?.json) {
    return null;
  }
  return documentToReactComponents(args.json, renderOptions(args.links));
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

export const renderTextToDom = (text?: string | null) => {
  if (!text) {
    return '';
  }
  return text
    .split('\n')
    .flatMap((text, i) => [i > 0 && <br key={`line-break-${i}`} />, text]);
};
