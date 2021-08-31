const ArrowLink = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" {...props}>
      <polyline
        points="24.07 17.83 24.07 24.07 1.93 24.07 1.93 1.93 7.41 1.93"
        fill="none"
        stroke="#165737"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <polyline
        points="24.07 12.14 24.07 1.93 13.86 1.93"
        fill="none"
        stroke="#165737"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <line
        x1="9.36"
        y1="16.64"
        x2="24.07"
        y2="1.93"
        fill="none"
        stroke="#165737"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </svg>
  );
};

export default ArrowLink;
