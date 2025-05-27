import { SVGIconType } from "./types";


export function CardSVG({color="#ccc"}:SVGIconType) {


  return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={color} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            id="Captions--Streamline-Lucide"
            className=''
        >
            <desc>{"\n    Captions Streamline Icon: https://streamlinehq.com\n  "}</desc>
            <path d="M5 5h14s2 0 2 2v10s0 2 -2 2H5s-2 0 -2 -2V7s0 -2 2 -2" strokeWidth={2} />
            <path d="M7 15h4m4 0h2M7 11h2m4 0h4" strokeWidth={2} />
        </svg>
  )
}

