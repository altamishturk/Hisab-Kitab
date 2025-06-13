import { NavLink } from "react-router";
import Section from "../components/Section";
import { CardSVG } from "../components/SVGs/CardSVG";




export function Home() {
  return (
    <Section XYCenter>
        <div className="flex gap-2 flex-wrap">
            <NavLink
              className="flex-1 min-w-[200px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
              to={"/cards"}
            >
                <span className="w-[20px] h-[20px]">
                  <CardSVG color="#000"/>
                </span>
                <span>View Cards</span>
            </NavLink>

            <NavLink
              className="flex-1 min-w-[200px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center gap-2 "
              to={"/crops"}
            >
                <span className="w-[20px] h-[20px]">
                  <CardSVG color="#000"/>
                </span>
                <span>View Crops</span>
            </NavLink>

            <NavLink
              className="flex-1 min-w-[200px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center gap-2 "
              to={"/persons"}
            >
                <span className="w-[20px] h-[20px]">
                  <CardSVG color="#000"/>
                </span>
                <span>View Persons</span>
            </NavLink>
        </div>
    </Section>
  )
}




