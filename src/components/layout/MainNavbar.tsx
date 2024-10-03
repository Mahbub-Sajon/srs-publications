import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo/logo.png";
import { AuthContext } from "@/providers/AuthProvider"; // Import AuthContext
import { useContext } from "react";
import { BsCartPlus } from "react-icons/bs";

const MainNavbar = () => {
  const { user, logOut, cartItems } = useContext(AuthContext); // Get cartItems and logOut

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out and cart cleared");
      })
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
            alt="logo"
          />
          <p className="font-bold text-xl ml-5 hidden md:block">
            <span className="text-primary">SRS</span> Publications
          </p>
        </div>
        <ul className="flex space-x-5 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/all-supplies">All Collections</NavLink>
          <NavLink to="/cart">
            <div className="flex items-center">
              <BsCartPlus />
              <span className="ml-2">+{cartItems.length}</span>{" "}
              {/* Display cart count */}
            </div>
          </NavLink>
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
