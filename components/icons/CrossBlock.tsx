const CrossBlock = ({ strokeWidth = 3, ...props }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      preserveAspectRatio="none"
      {...props}
    >
      <path d="M0 0 L100 100" vectorEffect="non-scaling-stroke" />
      <path d="M0 100 L100 0" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

export default CrossBlock;
