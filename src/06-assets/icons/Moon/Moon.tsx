import * as React from "react";

interface Props {
  strokeColor?: string;
}

const Moon = ({ strokeColor }: Props): JSX.Element => (
  <svg
    width={20}
    height={20}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <title>Moon</title>
    <g stroke={strokeColor || "#979797"} fill="none" fillRule="evenodd">
      <circle cx={10} cy={10} r={9.5} />
      <path d="M10 .5c.574 0 1.135.05 1.681.149a10.475 10.475 0 0 0-3.61 7.922c0 2.36.779 4.537 2.092 6.29a10.533 10.533 0 0 0 4.458 3.442A9.458 9.458 0 0 1 10 19.5a9.47 9.47 0 0 1-6.718-2.782A9.47 9.47 0 0 1 .5 10a9.47 9.47 0 0 1 2.782-6.718A9.47 9.47 0 0 1 10 .5Z" />
    </g>
  </svg>
);

export default Moon;
