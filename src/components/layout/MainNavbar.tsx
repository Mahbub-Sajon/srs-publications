import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo/logo.webp";
import { AuthContext } from "@/providers/AuthProvider"; // Import AuthContext
import { useContext, useState, useEffect } from "react";
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

  // Close the menu when clicking outside
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (!event.target.closest("nav")) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    // Scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-[#dadada] p-3 fixed w-full z-10 top-0">
      <nav className="mx-auto px-5 max-w-[1220px] flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" onClick={handleLogoClick}>
            <img
              className="hidden md:block w-[4rem] rounded-md"
              src={logo}
              alt="logo"
            />
          </Link>
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
          <NavLink
            to="/"
            className="py-2 px-4 hover:bg-gray-300 rounded-md"
            onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
          >
            Home
          </NavLink>
          <NavLink
            to="/all-supplies"
            className="py-2 px-4 hover:bg-gray-300 rounded-md"
            onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
          >
            All Collections
          </NavLink>
          <NavLink
            to="/cart"
            className="py-2 px-4 hover:bg-gray-300 rounded-md"
            onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
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
            onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
          >
            Dashboard
          </NavLink>
          {user ? (
            <Button
              onClick={() => {
                handleLogOut();
                setIsMenuOpen(false); // Close menu after logout
              }}
              className="py-2 px-4 rounded-md"
            >
              Logout
            </Button>
          ) : (
            <Button
              className="py-2 px-4 rounded-md"
              onClick={() => setIsMenuOpen(false)} // Close menu when going to login
            >
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavbar;
