import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router';
import { useUserStore } from '../store';
import { capitalizeFirstLetter } from '../utils';

export function Navbar() {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate("/");
    }
    else {
      navigate("/login");
    }
  }, [user,navigate]);

  return (
    <nav className="bg-white/90 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <NavLink className={"font-semibold"} to="/">Hisab Kitab</NavLink>
            {
              user && <>{capitalizeFirstLetter(user.firstname)} {capitalizeFirstLetter(user.lastname)}</>
            }
            {
              !user && <NavLink to="/login">Login</NavLink>
            }
        </div>
    </nav>
  )
}
