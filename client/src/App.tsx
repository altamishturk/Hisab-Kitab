import { Navbar } from "./components/Navbar";
import {
  RouterProvider,
} from "react-router";
import { router } from "./routes";



function App() {
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main className="pt-[73px] p-4 w-full min-h-[100vh] max-w-screen-xl mx-auto">
      <RouterProvider router={router}/>
    </main>
    </>
  );
}

export default App;
