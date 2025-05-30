import { SVGIconType } from "./types";





export function EditSVG({color="#000000",onClick=()=>{}}:SVGIconType) {
  return (
    <svg 
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        id="Edit--Streamline-Tabler" 
        className="size-4 cursor-pointer"
    >
        <desc>{"\n    Edit Streamline Icon: https://streamlinehq.com\n  "}</desc>
        <path d="M7 7H6a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" strokeWidth={2} />
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97L9 12v3h3l8.385 -8.415z" strokeWidth={2} />
        <path d="m16 5 3 3" strokeWidth={2} />
    </svg>
  )
}
