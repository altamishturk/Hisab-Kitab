import { NavLink } from "react-router";
import Section from "../components/Section";
import {crop, invitationCard, man} from "../assets";




export function Home() {
  return (
    <Section XYCenter>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <NavLink
            to="/cards"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="bg-gray-100 group-hover:bg-blue-50 transition p-4 rounded-full">
              <img src={invitationCard} alt="Cards" className="w-16 h-16 object-contain" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Cards</h3>
            <p className="text-sm text-gray-500 mt-1">Create and manage invitation cards</p>
          </NavLink>

          <NavLink
            to="/crops"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="bg-gray-100 group-hover:bg-green-50 transition p-4 rounded-full">
              <img src={crop} alt="Crops" className="w-16 h-16 object-contain" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Crops</h3>
            <p className="text-sm text-gray-500 mt-1">Manage crop-related data easily</p>
          </NavLink>

          <NavLink
            to="/persons"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="bg-gray-100 group-hover:bg-purple-50 transition p-4 rounded-full">
              <img src={man} alt="Persons" className="w-16 h-16 object-contain" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Persons</h3>
            <p className="text-sm text-gray-500 mt-1">View and manage people records</p>
          </NavLink>
        </div>
    </Section>
  )
}




