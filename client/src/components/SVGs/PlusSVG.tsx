import React from 'react'
import { SVGIconType } from './types'

export function PlusSVG({onClick=()=>{},color="",className="size-4"}:SVGIconType) {
  return (
        <svg 
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
  )
}
