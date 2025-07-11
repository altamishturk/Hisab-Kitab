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
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-300 bg-gray-200">
        <div className="w-full max-w-screen-xl mx-auto p-4 flex justify-between">
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
