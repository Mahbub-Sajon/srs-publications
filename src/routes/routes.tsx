import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignUp from "@/pages/SignUp/SignUp";
import Login from "@/pages/Login/Login";
import AllSupplies from "@/pages/AllSupplies/AllSupplies";
import ItemDetail from "@/pages/ItemDetail/ItemDetail";
import Dashboard from "@/pages/dashboard/Dashboard";
import Admin from "@/pages/dashboard/Admin/Admin";
import PrivateRoutes from "./PrivateRoutes";
import Cart from "@/pages/Cart/Cart";
import Success from "@/pages/payment/Success";
import Fail from "@/pages/payment/Fail";
import Cancel from "@/pages/payment/Cancel";
import AllUsers from "@/pages/dashboard/AllUsers";
import AddProducts from "@/pages/dashboard/Admin/AddProducts";
import Profile from "@/pages/dashboard/User/Profile";
import MyOrders from "@/pages/dashboard/User/MyOrders";
import UnsoldBooks from "@/pages/dashboard/Admin/UnsoldBooks";

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
      {
        path: "/cart",
        element: (
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        ),
      },
      {
        path: "/success/:transactionId",
        element: <Success />,
      },
      {
        path: "/fail",
        element: <Fail />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "add-products",
        element: <AddProducts />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "unsold-books",
        element: <UnsoldBooks />,
      },
    ],
  },
]);

export default router;
