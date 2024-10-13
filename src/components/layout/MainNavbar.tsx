import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo/logo.png";
import { AuthContext } from "@/providers/AuthProvider"; // Import AuthContext
import { useContext, useState } from "react";
import { BsCartPlus, BsList } from "react-icons/bs";

const MainNavbar = () => {
  const authContext = useContext(AuthContext); // Get AuthContext
  const user = authContext?.user;
  const logOut = authContext?.logOut;
  const cartItems = authContext?.cartItems || []; // Ensure cartItems is an empty array if undefined

  const handleLogOut = () => {
    if (logOut) {
      logOut()
        .then(() => {
          console.log("User logged out and cart cleared");
        })
        .catch((error) => console.log(error));
    }
  };

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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

        {/* Hamburger icon for mobile menu */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <BsList size={24} />
        </div>

        {/* Menu Items */}
        <ul
          className={`flex-col md:flex md:flex-row md:space-x-5 absolute md:relative bg-[#dadada] md:bg-transparent w-full md:w-auto left-0 top-full transition-all duration-300 ease-in-out ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex md:items-center`}
        >
          <NavLink to="/" className="py-2 px-4 hover:bg-gray-300 rounded-md">
            Home
          </NavLink>
          <NavLink
            to="/all-supplies"
            className="py-2 px-4 hover:bg-gray-300 rounded-md"
          >
            All Collections
          </NavLink>
          <NavLink
            to="/cart"
            className="py-2 px-4 hover:bg-gray-300 rounded-md"
          >
            <div className="flex items-center">
              <BsCartPlus />
              <span className="ml-2">+{cartItems.length}</span>{" "}
              {/* Display cart count */}
            </div>
          </NavLink>
          <NavLink
            to="/dashboard"
            className="py-2 px-4 hover:bg-gray-300 rounded-md"
          >
            Dashboard
          </NavLink>
          {user ? (
            <Button onClick={handleLogOut} className="py-2 px-4 rounded-md">
              Logout
            </Button>
          ) : (
            <Button className="py-2 px-4 rounded-md">
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavbar;
