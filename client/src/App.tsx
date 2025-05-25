import {
  RouterProvider,
} from "react-router";
import { router } from "./routes";
import { useUserStore } from "./store";
import { useEffect } from "react";



function App() {
  const fetch = useUserStore(state => state.fetch);

  useEffect(() => {
    fetch()
  }, [fetch]);

  return <RouterProvider router={router}/>
}

export default App;
