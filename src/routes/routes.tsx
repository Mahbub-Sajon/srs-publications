import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignUp from "@/pages/SignUp/SignUp";
import Login from "@/pages/Login/Login";
import AllSupplies from "@/pages/AllSupplies/AllSupplies";
import ItemDetail from "@/pages/ItemDetail/ItemDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/all-supplies",
        element: <AllSupplies />,
      },
      {
        path: "/item/:_id",
        element: <ItemDetail />,
      },
    ],
  },
]);

export default router;
