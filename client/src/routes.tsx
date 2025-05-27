import { createBrowserRouter, Outlet } from "react-router";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Card} from "./pages/card/index";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import { Home } from "./pages/Home";

const Layout = () => (
  <div className="w-[100vw] min-h-[100vh]  bg-gray-200">
    <header className="bg-gray-200">
      <Navbar />
    </header>
    <main className="p-4 pt-[57px] w-full min-h-[100vh] max-w-screen-xl mx-auto bg-gray-200">
      <Outlet />
    </main>
    <ToastContainer position="bottom-center"/>
  </div>
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