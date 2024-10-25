import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading/Loading";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    image: "",
    title: "",
    category: "",
    quantity: 0,
    price: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://srs-publications-server.vercel.app/products",
        product
      );
      if (response.status === 201) {
        alert("Product added successfully!");

        // Clear the input fields
        setProduct({
          image: "",
          title: "",
          category: "",
          quantity: 0,
          price: 0,
          description: "",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4 text-white">
      <motion.div
        className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Add a New Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Quantity"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product description"
              required
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              className="w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? <Loading /> : "Add Product"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProducts;
