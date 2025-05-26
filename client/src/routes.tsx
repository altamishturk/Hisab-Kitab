import { createBrowserRouter, Outlet } from "react-router";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Card} from "./pages/card/index";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import { Home } from "./pages/Home";

const Layout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <main className="pt-[73px] p-4 w-full min-h-[100vh] max-w-screen-xl mx-auto">
      <Outlet />
    </main>
    <ToastContainer position="bottom-center"/>
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/card",
        element: <Card/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      }
    ]
  }
]);