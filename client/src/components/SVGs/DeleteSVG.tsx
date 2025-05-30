import { SVGIconType } from './types';

export function DeleteSVG({color = '#000000',onClick = () => {}}: SVGIconType) {


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-trash-2 cursor-pointer"
      id="Trash-2--Streamline-Feather"
      height={16}
      width={16}
      color={color}
      onClick={onClick}
    >
      <desc>
        {'\n    Trash 2 Streamline Icon: https://streamlinehq.com\n  '}
      </desc>
      <path d="m1.875 3.75 1.25 0 10 0" strokeWidth={1} />
      <path
        d="M11.875 3.75v8.75a1.25 1.25 0 0 1 -1.25 1.25H4.375a1.25 1.25 0 0 1 -1.25 -1.25V3.75m1.875 0V2.5a1.25 1.25 0 0 1 1.25 -1.25h2.5a1.25 1.25 0 0 1 1.25 1.25v1.25"
        strokeWidth={1}
      />
      <path d="m6.25 6.875 0 3.75" strokeWidth={1} />
      <path d="m8.75 6.875 0 3.75" strokeWidth={1} />
    </svg>
  );
}
