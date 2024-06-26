import { Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";

const MainLayout = () => {
  return (
    <div>
      <MainNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
