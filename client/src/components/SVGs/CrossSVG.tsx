import React from 'react'
import { SVGIconType } from './types'




export function CrossSVG({onClick=()=>{}}:SVGIconType) {
  return (
    <svg onClick={onClick}   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}
