import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Ensure users is initialized as an empty array
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users"); // API endpoint for getting all users
      const data = response.data;

      // Ensure the response data is an array
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

  // Make Admin
  const makeAdmin = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/users/admin/${id}`); // API endpoint to make a user admin
      alert("User made admin successfully");
      fetchUsers(); // Refresh the list after updating
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`); // API endpoint to delete a user
        alert("User deleted successfully");
        fetchUsers(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <button
                  onClick={() => makeAdmin(user._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
