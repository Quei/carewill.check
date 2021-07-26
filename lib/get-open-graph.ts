type Props = {
  title?: string;
  description?: string;
  image?: {
    url?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};
export const getOpenGraph = ({ title, description, image }: Props) => {
  let base = {
    type: 'website',
    title: title,
    description: description,
    // images: [
    //   {
    //     url: image?.url,
    //     width: image?.width,
    //     height: image?.height,
    //     alt: title,
    //   },
    // ],
  };
  return image?.url && image?.width && image?.height
    ? {
        ...base,
        images: [
          {
            url: image.url,
            width: image.width,
            height: image.height,
          },
        ],
      }
    : base;
};
