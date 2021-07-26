export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  customOrder?: Maybe<CustomOrder>;
  customOrderCollection?: Maybe<CustomOrderCollection>;
  entryCollection?: Maybe<EntryCollection>;
  hauteCouture?: Maybe<HauteCouture>;
  hauteCoutureCollection?: Maybe<HauteCoutureCollection>;
  home?: Maybe<Home>;
  homeCollection?: Maybe<HomeCollection>;
  navigation?: Maybe<Navigation>;
  navigationCollection?: Maybe<NavigationCollection>;
  news?: Maybe<News>;
  newsCategory?: Maybe<NewsCategory>;
  newsCategoryCollection?: Maybe<NewsCategoryCollection>;
  newsCollection?: Maybe<NewsCollection>;
  product?: Maybe<Product>;
  productCollection?: Maybe<ProductCollection>;
};

export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryAssetCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AssetFilter>;
};

export type QueryCustomOrderArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type QueryCustomOrderCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CustomOrderFilter>;
  order?: Maybe<Array<Maybe<CustomOrderOrder>>>;
};

export type QueryEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<EntryOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<EntryFilter>;
};

export type QueryHauteCoutureArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type QueryHauteCoutureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<HauteCoutureFilter>;
  order?: Maybe<Array<Maybe<HauteCoutureOrder>>>;
};

export type QueryHomeArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryHomeCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<HomeOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<HomeFilter>;
};

export type QueryNavigationArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryNavigationCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<NavigationOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<NavigationFilter>;
};

export type QueryNewsArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type QueryNewsCategoryArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type QueryNewsCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<NewsCategoryFilter>;
  order?: Maybe<Array<Maybe<NewsCategoryOrder>>>;
};

export type QueryNewsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<NewsFilter>;
  order?: Maybe<Array<Maybe<NewsOrder>>>;
};

export type QueryProductArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type QueryProductCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ProductFilter>;
  order?: Maybe<Array<Maybe<ProductOrder>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
};

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB',
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
}

export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP',
}

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  hauteCoutureCollection?: Maybe<HauteCoutureCollection>;
  homeCollection?: Maybe<HomeCollection>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type AssetLinkingCollectionsHauteCoutureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type AssetLinkingCollectionsHomeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  contentType?: Maybe<Scalars['String']>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName?: Maybe<Scalars['String']>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  height?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size?: Maybe<Scalars['Int']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  width?: Maybe<Scalars['Int']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type SysFilter = {
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  id?: Maybe<Scalars['String']>;
  id_contains?: Maybe<Scalars['String']>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt_gt?: Maybe<Scalars['DateTime']>;
  publishedAt_gte?: Maybe<Scalars['DateTime']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_lt?: Maybe<Scalars['DateTime']>;
  publishedAt_lte?: Maybe<Scalars['DateTime']>;
  publishedAt_not?: Maybe<Scalars['DateTime']>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedVersion?: Maybe<Scalars['Float']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion_gt?: Maybe<Scalars['Float']>;
  publishedVersion_gte?: Maybe<Scalars['Float']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_lt?: Maybe<Scalars['Float']>;
  publishedVersion_lte?: Maybe<Scalars['Float']>;
  publishedVersion_not?: Maybe<Scalars['Float']>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type ContentfulMetadataFilter = {
  tags?: Maybe<ContentfulMetadataTagsFilter>;
  tags_exists?: Maybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/navigation) */
export type Navigation = Entry & {
  __typename?: 'Navigation';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<NavigationLinkingCollections>;
  menu?: Maybe<Scalars['JSON']>;
  slug?: Maybe<Scalars['String']>;
  sns?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/navigation) */
export type NavigationLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/navigation) */
export type NavigationMenuArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/navigation) */
export type NavigationSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/navigation) */
export type NavigationSnsArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/navigation) */
export type NavigationTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type NavigationLinkingCollections = {
  __typename?: 'NavigationLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type NavigationLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type NavigationCollection = {
  __typename?: 'NavigationCollection';
  items: Array<Maybe<Navigation>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type NavigationFilter = {
  AND?: Maybe<Array<Maybe<NavigationFilter>>>;
  OR?: Maybe<Array<Maybe<NavigationFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  slug?: Maybe<Scalars['String']>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum NavigationOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type Home = Entry & {
  __typename?: 'Home';
  collaboration?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  customOrder?: Maybe<Asset>;
  description?: Maybe<HomeDescription>;
  hauteCouture?: Maybe<Asset>;
  linkedFrom?: Maybe<HomeLinkingCollections>;
  newsPickupCollection?: Maybe<HomeNewsPickupCollection>;
  product?: Maybe<Asset>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeCollaborationArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeCustomOrderArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeHauteCoutureArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeNewsPickupCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeProductArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/home) */
export type HomeTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type HomeLinkingCollections = {
  __typename?: 'HomeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type HomeLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type HomeDescription = {
  __typename?: 'HomeDescription';
  json: Scalars['JSON'];
  links: HomeDescriptionLinks;
};

export type HomeDescriptionLinks = {
  __typename?: 'HomeDescriptionLinks';
  assets: HomeDescriptionAssets;
  entries: HomeDescriptionEntries;
};

export type HomeDescriptionEntries = {
  __typename?: 'HomeDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HomeDescriptionAssets = {
  __typename?: 'HomeDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HomeCollection = {
  __typename?: 'HomeCollection';
  items: Array<Maybe<Home>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type HomeFilter = {
  AND?: Maybe<Array<Maybe<HomeFilter>>>;
  OR?: Maybe<Array<Maybe<HomeFilter>>>;
  collaboration_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  customOrder_exists?: Maybe<Scalars['Boolean']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_not_contains?: Maybe<Scalars['String']>;
  hauteCouture_exists?: Maybe<Scalars['Boolean']>;
  newsPickupCollection_exists?: Maybe<Scalars['Boolean']>;
  product_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum HomeOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export type EntryFilter = {
  AND?: Maybe<Array<Maybe<EntryFilter>>>;
  OR?: Maybe<Array<Maybe<EntryFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type HomeNewsPickupCollection = {
  __typename?: 'HomeNewsPickupCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<News>>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type News = Entry & {
  __typename?: 'News';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<NewsLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  category?: Maybe<NewsCategory>;
  content?: Maybe<NewsContent>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type NewsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type NewsTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type NewsSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type NewsDateArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type NewsCategoryArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/news) */
export type NewsContentArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type NewsLinkingCollections = {
  __typename?: 'NewsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  homeCollection?: Maybe<HomeCollection>;
};

export type NewsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type NewsLinkingCollectionsHomeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/newsCategory) */
export type NewsCategory = Entry & {
  __typename?: 'NewsCategory';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<NewsCategoryLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/newsCategory) */
export type NewsCategoryLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/newsCategory) */
export type NewsCategoryTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/bdipztv4q6kp/content_types/newsCategory) */
export type NewsCategorySlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type NewsCategoryLinkingCollections = {
  __typename?: 'NewsCategoryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  newsCollection?: Maybe<NewsCollection>;
};

export type NewsCategoryLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type NewsCategoryLinkingCollectionsNewsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type NewsCollection = {
  __typename?: 'NewsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<News>>;
};

export type NewsContent = {
  __typename?: 'NewsContent';
  json: Scalars['JSON'];
  links: NewsContentLinks;
};

export type NewsContentLinks = {
  __typename?: 'NewsContentLinks';
  entries: NewsContentEntries;
  assets: NewsContentAssets;
};

export type NewsContentEntries = {
  __typename?: 'NewsContentEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type NewsContentAssets = {
  __typename?: 'NewsContentAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type NewsFilter = {
  category?: Maybe<CfNewsCategoryNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  date_exists?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['DateTime']>;
  date_not?: Maybe<Scalars['DateTime']>;
  date_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  date_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  date_gt?: Maybe<Scalars['DateTime']>;
  date_gte?: Maybe<Scalars['DateTime']>;
  date_lt?: Maybe<Scalars['DateTime']>;
  date_lte?: Maybe<Scalars['DateTime']>;
  category_exists?: Maybe<Scalars['Boolean']>;
  content_exists?: Maybe<Scalars['Boolean']>;
  content_contains?: Maybe<Scalars['String']>;
  content_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<NewsFilter>>>;
  AND?: Maybe<Array<Maybe<NewsFilter>>>;
};

export type CfNewsCategoryNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfNewsCategoryNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfNewsCategoryNestedFilter>>>;
};

export enum NewsOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type NewsCategoryCollection = {
  __typename?: 'NewsCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<NewsCategory>>;
};

export type NewsCategoryFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<NewsCategoryFilter>>>;
  AND?: Maybe<Array<Maybe<NewsCategoryFilter>>>;
};

export enum NewsCategoryOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type HauteCoutureCollection = {
  __typename?: 'HauteCoutureCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<HauteCouture>>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCouture = Entry & {
  __typename?: 'HauteCouture';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<HauteCoutureLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<HauteCoutureDescription>;
  image?: Maybe<Asset>;
  formTitle?: Maybe<Scalars['String']>;
  formDescription?: Maybe<HauteCoutureFormDescription>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureFormTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/hauteCouture) */
export type HauteCoutureFormDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type HauteCoutureLinkingCollections = {
  __typename?: 'HauteCoutureLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type HauteCoutureLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type HauteCoutureDescription = {
  __typename?: 'HauteCoutureDescription';
  json: Scalars['JSON'];
  links: HauteCoutureDescriptionLinks;
};

export type HauteCoutureDescriptionLinks = {
  __typename?: 'HauteCoutureDescriptionLinks';
  entries: HauteCoutureDescriptionEntries;
  assets: HauteCoutureDescriptionAssets;
};

export type HauteCoutureDescriptionEntries = {
  __typename?: 'HauteCoutureDescriptionEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type HauteCoutureDescriptionAssets = {
  __typename?: 'HauteCoutureDescriptionAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type HauteCoutureFormDescription = {
  __typename?: 'HauteCoutureFormDescription';
  json: Scalars['JSON'];
  links: HauteCoutureFormDescriptionLinks;
};

export type HauteCoutureFormDescriptionLinks = {
  __typename?: 'HauteCoutureFormDescriptionLinks';
  entries: HauteCoutureFormDescriptionEntries;
  assets: HauteCoutureFormDescriptionAssets;
};

export type HauteCoutureFormDescriptionEntries = {
  __typename?: 'HauteCoutureFormDescriptionEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type HauteCoutureFormDescriptionAssets = {
  __typename?: 'HauteCoutureFormDescriptionAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type HauteCoutureFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  formTitle_exists?: Maybe<Scalars['Boolean']>;
  formTitle?: Maybe<Scalars['String']>;
  formTitle_not?: Maybe<Scalars['String']>;
  formTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  formTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  formTitle_contains?: Maybe<Scalars['String']>;
  formTitle_not_contains?: Maybe<Scalars['String']>;
  formDescription_exists?: Maybe<Scalars['Boolean']>;
  formDescription_contains?: Maybe<Scalars['String']>;
  formDescription_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<HauteCoutureFilter>>>;
  AND?: Maybe<Array<Maybe<HauteCoutureFilter>>>;
};

export enum HauteCoutureOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  FormTitleAsc = 'formTitle_ASC',
  FormTitleDesc = 'formTitle_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/product) */
export type Product = Entry & {
  __typename?: 'Product';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProductLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/product) */
export type ProductLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/product) */
export type ProductTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/product) */
export type ProductSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ProductLinkingCollections = {
  __typename?: 'ProductLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type ProductLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ProductCollection = {
  __typename?: 'ProductCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Product>>;
};

export type ProductFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<ProductFilter>>>;
  AND?: Maybe<Array<Maybe<ProductFilter>>>;
};

export enum ProductOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/customOrder) */
export type CustomOrder = Entry & {
  __typename?: 'CustomOrder';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<CustomOrderLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<CustomOrderDescription>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/customOrder) */
export type CustomOrderLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/customOrder) */
export type CustomOrderTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/customOrder) */
export type CustomOrderSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/pdt7v3ruuhi4/content_types/customOrder) */
export type CustomOrderDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type CustomOrderLinkingCollections = {
  __typename?: 'CustomOrderLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type CustomOrderLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type CustomOrderDescription = {
  __typename?: 'CustomOrderDescription';
  json: Scalars['JSON'];
  links: CustomOrderDescriptionLinks;
};

export type CustomOrderDescriptionLinks = {
  __typename?: 'CustomOrderDescriptionLinks';
  entries: CustomOrderDescriptionEntries;
  assets: CustomOrderDescriptionAssets;
};

export type CustomOrderDescriptionEntries = {
  __typename?: 'CustomOrderDescriptionEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type CustomOrderDescriptionAssets = {
  __typename?: 'CustomOrderDescriptionAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type CustomOrderCollection = {
  __typename?: 'CustomOrderCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<CustomOrder>>;
};

export type CustomOrderFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CustomOrderFilter>>>;
  AND?: Maybe<Array<Maybe<CustomOrderFilter>>>;
};

export enum CustomOrderOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type CustomOrderViewFragment = { __typename?: 'CustomOrder' } & Pick<
  CustomOrder,
  'title' | 'slug'
> & {
    description?: Maybe<
      { __typename?: 'CustomOrderDescription' } & Pick<
        CustomOrderDescription,
        'json'
      >
    >;
  };

export type CheckboxesWithImagesImageFragment = { __typename?: 'Asset' } & Pick<
  Asset,
  'url' | 'title'
> & { sys: { __typename?: 'Sys' } & Pick<Sys, 'id'> };

export type CustomOrderOrderFormViewFragment = {
  __typename?: 'CustomOrder';
} & Pick<CustomOrder, 'title' | 'slug'> & {
    description?: Maybe<
      { __typename?: 'CustomOrderDescription' } & Pick<
        CustomOrderDescription,
        'json'
      >
    >;
  };

export type HauteCoutureViewFragment = { __typename?: 'HauteCouture' } & Pick<
  HauteCouture,
  'title'
> & {
    description?: Maybe<
      { __typename?: 'HauteCoutureDescription' } & Pick<
        HauteCoutureDescription,
        'json'
      >
    >;
    image?: Maybe<
      { __typename?: 'Asset' } & Pick<
        Asset,
        'url' | 'title' | 'width' | 'height'
      > & { sys: { __typename?: 'Sys' } & Pick<Sys, 'id'> }
    >;
  };

export type HauteCoutureOrderFormViewFragment = {
  __typename?: 'HauteCouture';
} & Pick<HauteCouture, 'formTitle' | 'slug'> & {
    formDescription?: Maybe<
      { __typename?: 'HauteCoutureFormDescription' } & Pick<
        HauteCoutureFormDescription,
        'json'
      >
    >;
  };

export type HomeAboutViewFragment = { __typename?: 'Home' } & {
  description?: Maybe<
    { __typename?: 'HomeDescription' } & Pick<HomeDescription, 'json'>
  >;
  newsPickupCollection?: Maybe<
    { __typename?: 'HomeNewsPickupCollection' } & {
      items: Array<
        Maybe<
          { __typename: 'News' } & Pick<News, 'title' | 'slug' | 'date'> & {
              sys: { __typename?: 'Sys' } & Pick<Sys, 'id'>;
              content?: Maybe<
                { __typename?: 'NewsContent' } & Pick<NewsContent, 'json'>
              >;
            }
        >
      >;
    }
  >;
};

export type HomeLaboViewFragment = { __typename?: 'Home' } & {
  description?: Maybe<
    { __typename?: 'HomeDescription' } & Pick<HomeDescription, 'json'>
  >;
};

export type HomeStoreViewFragment = { __typename?: 'Home' } & {
  description?: Maybe<
    { __typename?: 'HomeDescription' } & Pick<HomeDescription, 'json'>
  >;
  product?: Maybe<
    { __typename?: 'Asset' } & Pick<Asset, 'url' | 'description'>
  >;
  customOrder?: Maybe<
    { __typename?: 'Asset' } & Pick<Asset, 'url' | 'description'>
  >;
  hauteCouture?: Maybe<
    { __typename?: 'Asset' } & Pick<Asset, 'url' | 'description'>
  >;
  collaboration?: Maybe<
    { __typename?: 'Asset' } & Pick<Asset, 'url' | 'description'>
  >;
};

export type GetNavigationStoreQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetNavigationStoreQuery = { __typename?: 'Query' } & {
  navigationCollection?: Maybe<
    { __typename?: 'NavigationCollection' } & {
      items: Array<
        Maybe<{ __typename?: 'Navigation' } & Pick<Navigation, 'menu' | 'sns'>>
      >;
    }
  >;
};

export type GetNavigationLaboQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetNavigationLaboQuery = { __typename?: 'Query' } & {
  navigationCollection?: Maybe<
    { __typename?: 'NavigationCollection' } & {
      items: Array<
        Maybe<{ __typename?: 'Navigation' } & Pick<Navigation, 'menu'>>
      >;
    }
  >;
};

export type GetNavigationAboutQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetNavigationAboutQuery = { __typename?: 'Query' } & {
  navigationCollection?: Maybe<
    { __typename?: 'NavigationCollection' } & {
      items: Array<
        Maybe<{ __typename?: 'Navigation' } & Pick<Navigation, 'menu'>>
      >;
    }
  >;
};

export type GetCustomOrderQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetCustomOrderQuery = { __typename?: 'Query' } & {
  customOrderCollection?: Maybe<
    { __typename?: 'CustomOrderCollection' } & {
      items: Array<
        Maybe<{ __typename?: 'CustomOrder' } & CustomOrderViewFragment>
      >;
    }
  >;
};

export type GetCustomOrderOrderQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetCustomOrderOrderQuery = { __typename?: 'Query' } & {
  customOrderCollection?: Maybe<
    { __typename?: 'CustomOrderCollection' } & {
      items: Array<
        Maybe<{ __typename?: 'CustomOrder' } & CustomOrderOrderFormViewFragment>
      >;
    }
  >;
};

export type GetHauteCoutureQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetHauteCoutureQuery = { __typename?: 'Query' } & {
  hauteCoutureCollection?: Maybe<
    { __typename?: 'HauteCoutureCollection' } & {
      items: Array<
        Maybe<{ __typename?: 'HauteCouture' } & HauteCoutureViewFragment>
      >;
    }
  >;
};

export type GetHauteCoutureOrderQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetHauteCoutureOrderQuery = { __typename?: 'Query' } & {
  hauteCoutureCollection?: Maybe<
    { __typename?: 'HauteCoutureCollection' } & {
      items: Array<
        Maybe<
          { __typename?: 'HauteCouture' } & HauteCoutureOrderFormViewFragment
        >
      >;
    }
  >;
};

export type GetHomeStoreQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetHomeStoreQuery = { __typename?: 'Query' } & {
  homeCollection?: Maybe<
    { __typename?: 'HomeCollection' } & {
      items: Array<Maybe<{ __typename?: 'Home' } & HomeStoreViewFragment>>;
    }
  >;
};

export type GetHomeLaboQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetHomeLaboQuery = { __typename?: 'Query' } & {
  homeCollection?: Maybe<
    { __typename?: 'HomeCollection' } & {
      items: Array<Maybe<{ __typename?: 'Home' } & HomeLaboViewFragment>>;
    }
  >;
};

export type GetHomeAboutQueryVariables = Exact<{
  locale: Scalars['String'];
  slug: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
}>;

export type GetHomeAboutQuery = { __typename?: 'Query' } & {
  homeCollection?: Maybe<
    { __typename?: 'HomeCollection' } & {
      items: Array<Maybe<{ __typename?: 'Home' } & HomeAboutViewFragment>>;
    }
  >;
};
