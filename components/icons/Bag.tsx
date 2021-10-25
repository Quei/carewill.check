const Bag = ({ ...props }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 28.1 29.6"
      stroke="currentColor"
      {...props}
    >
      <polygon
        points="23.3 20.53 9.91 20.53 7.85 7.59 24.89 7.59 23.3 20.53"
        fill="none"
        stroke="#0b5635"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <polyline
        points="8.49 11.61 6.75 1.5 0 1.5"
        fill="none"
        stroke="#0b5635"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <ellipse
        cx="9.7"
        cy="24.49"
        rx="3.6"
        ry="3.61"
        fill="none"
        stroke="#0b5635"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <ellipse
        cx="23.01"
        cy="24.49"
        rx="3.6"
        ry="3.61"
        fill="none"
        stroke="#0b5635"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Bag;
