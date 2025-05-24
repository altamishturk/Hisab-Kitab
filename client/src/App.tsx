import { Navbar } from "./components/Navbar";
import { Card } from "./pages/card/index";
// import { Login } from "./pages/Login";
// import { Signup } from "./pages/Signup";


function App() {
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main className="pt-[73px] p-4 w-full min-h-[100vh] max-w-screen-xl mx-auto">
      {/* <Login/> */}
      {/* <Signup/> */}
      <Card/>
    </main>
    </>
  );
}

export default App;
