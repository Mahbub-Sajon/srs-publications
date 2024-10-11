import { Link } from "react-router-dom";

const Sidebar = () => {
  const isAdmin = true;
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-full md:w-64 p-4">
        <nav className="space-y-4">
          <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/profile"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/my-orders"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            My Orders
          </Link>
          {isAdmin && (
            <>
              <Link
                to="/dashboard/add-products"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Add Products
              </Link>
              <Link
                to="/dashboard/users"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                All Users
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
