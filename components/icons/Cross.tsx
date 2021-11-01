const Cross = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="3"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      preserveAspectRatio="none"
      {...props}
    >
      <path d="M18 6L6 18" vectorEffect="non-scaling-stroke" />
      <path d="M6 6l12 12" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

export default Cross;
