import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null); // Adjust type if needed
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing their name

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/api/users/${user.email}`
        );
        setUserData(userResponse.data);
        setName(userResponse.data.name);
        setIsAdmin(userResponse.data.role === "admin");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.email]);

  // Update user name
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user.email}`, {
        name,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUserData((prev: any) => ({ ...prev, name })); // Adjust type if needed
      alert("Name updated successfully");
      setIsEditing(false); // Close editing mode
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <motion.div
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h1 className="text-2xl font-bold mb-4">This is Your Profile</h1>
      <p className="text-lg mb-2">
        <strong>Name:</strong> {userData.name}
      </p>
      <p className="text-lg mb-4">
        <strong>Email:</strong> {userData.email}
      </p>
      {isAdmin && <p className="text-lg text-green-600">You are an admin.</p>}

      {isEditing ? (
        <form onSubmit={handleUpdateName} className="flex flex-col">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update your name"
            required
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button type="submit" className="text-white p-2 rounded">
              Update Name
            </Button>
          </motion.div>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mt-2 text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </form>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center mt-4"
        >
          <Button
            onClick={() => setIsEditing(true)}
            className="text-white p-2 rounded"
          >
            Edit Name
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;
