interface Props {
  strokeColor?: string;
}

const Sun = ({ strokeColor }: Props): JSX.Element => (
  <svg
    width={28}
    height={28}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
  >
    <title>Sun</title>
    <g
      transform="translate(.842 .916)"
      stroke={strokeColor || "#979797"}
      fill="none"
      fillRule="evenodd"
    >
      <circle cx={13.158} cy={13.084} r={6.5} />
      <path d="m19.41 6.956 2.344-2.344M4.561 21.805l2.344-2.344M19.41 19.462l2.345 2.344M4.561 4.612l2.344 2.344M22 13.209h4.308M0 13.209h4.308M13.157 22v4.309M13.157 0v4.309" />
    </g>
  </svg>
);

export default Sun;
