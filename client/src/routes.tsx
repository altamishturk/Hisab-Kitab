import { createBrowserRouter } from "react-router";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Card} from "./pages/card/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Card/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
]);