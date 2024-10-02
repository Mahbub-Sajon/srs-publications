import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo/logo.png";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

const MainNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => console.log(error));
  };
  return (
    <header className="bg-[#dadada] p-3 fixed w-full z-10 top-0">
      <nav className="mx-auto px-5 max-w-[1220px] flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="hidden md:block w-[5rem] rounded-md"
            src={logo}
            alt=""
          />
          <p className="font-bold text-xl ml-5 hidden md:block">
            <span className="text-primary">SRS</span> Publications
          </p>
        </div>
        <ul className="space-x-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/all-supplies">All Collections</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {user ? (
            <Button onClick={handleLogOut}>Logout</Button>
          ) : (
            <Button>
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavbar;
