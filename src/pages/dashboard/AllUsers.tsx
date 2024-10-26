import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://srs-publications-server.vercel.app/api/users"
      );
      const data = response.data;

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Error: Data is not an array");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const makeAdmin = async (id: string) => {
    try {
      await axios.patch(
        `https://srs-publications-server.vercel.app/users/admin/${id}`
      );
      toast.success("User made admin successfully"); // Show success toast
      fetchUsers();
    } catch (error) {
      console.error("Error making user admin:", error);
      toast.error("Failed to make user admin."); // Show error toast
    }
  };

  const deleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `https://srs-publications-server.vercel.app/api/users/${id}`
        );
        toast.success("User deleted successfully"); // Show success toast
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user."); // Show error toast
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="container mx-auto mt-8 bg-gray-900 py-10 rounded-md">
      <ToastContainer /> {/* Add ToastContainer here */}
      <h1 className="text-2xl font-bold mb-4 text-white text-center">
        All Users
      </h1>
      <table className="min-w-full bg-gray-800 border border-gray-300">
        <thead>
          <tr className="text-white">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <motion.tr
              key={user._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                <div className="flex justify-end space-x-2">
                  {user.role !== "admin" && (
                    <Button
                      onClick={() => makeAdmin(user._id)}
                      className="text-white px-3 py-1 rounded transition duration-200"
                    >
                      Make Admin
                    </Button>
                  )}
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
