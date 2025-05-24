import React from 'react'
import { NavLink } from 'react-router';

export function Navbar() {



  return (
    <nav className="bg-white/90 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <h2 className='font-semibold'>Hisab Kitab</h2>
            
            <NavLink to="/login">Login</NavLink>
        </div>
    </nav>
  )
}
