import { NavLink } from "react-router";
import Section from "../components/Section";




export function Home() {
  return (
    <Section XYCenter>
        Welcome, Altamish

        <NavLink
        className="border"
        to={"/card"}
        >
            cards
        </NavLink>
    </Section>
  )
}
