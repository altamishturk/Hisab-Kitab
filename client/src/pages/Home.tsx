import { NavLink } from "react-router";
import Section from "../components/Section";
import {crop, invitationCard, man} from "../assets";




export function Home() {
  return (
    <Section XYCenter>
        <div className="flex gap-2 flex-wrap">
            <NavLink
              className="flex-1 flex-col min-w-[200px] bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
              to={"/cards"}
            >
                <img src={invitationCard} alt="card" className="w-[100px]"/>
                <span>Cards</span>
            </NavLink>

            <NavLink
              className="flex-1 flex-col min-w-[200px] bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center gap-2 "
              to={"/crops"}
            >
                <img src={crop} alt="card" className="w-[100px]"/>
                <span>Crops</span>
            </NavLink>

            <NavLink
              className="flex-1 flex-col min-w-[200px] bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center gap-2 "
              to={"/persons"}
            >
                <img src={man} alt="card" className="w-[100px]"/>
                <span>Persons</span>
            </NavLink>
        </div>
    </Section>
  )
}




