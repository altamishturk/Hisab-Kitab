import { NavLink } from "react-router";
import Section from "../components/Section";
import { CardSVG } from "../components/SVGs/CardSVG";




export function Home() {
  return (
    <Section XYCenter>
        <div className="flex gap-2">
            <NavLink
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center gap-2"
              to={"/cards"}
            >
                <span className="w-[20px] h-[20px]">
                  <CardSVG color="#000"/>
                </span>
                <span>Go to Cards Page</span>
            </NavLink>
            <NavLink
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center gap-2"
              to={"/crops"}
            >
                <span className="w-[20px] h-[20px]">
                  <CardSVG color="#000"/>
                </span>
                <span>Go to Land Crops Page</span>
            </NavLink>
        </div>
    </Section>
  )
}




