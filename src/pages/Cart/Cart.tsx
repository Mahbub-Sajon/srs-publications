import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartItem {
  _id: string; // Unique ID for the cart entry
  item: {
    _id: string;
    image: string;
    title: string;
    category: string;
    quantity: number; // This represents how many times the item has been added to the cart
    price: number;
    description: string;
  };
  addedAt: string;
}

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [userCartItems, setUserCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await axios.get<CartItem[]>(
            `http://localhost:5000/cart/${user.uid}`
          );
          setUserCartItems(response.data);
        } catch (error) {
          console.log("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userCartItems.length > 0 ? (
          userCartItems.map((cartItem) => (
            <motion.div
              key={cartItem._id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="border rounded-lg p-4 shadow-lg bg-white"
            >
              <img
                src={cartItem.item.image}
                alt={cartItem.item.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">
                {cartItem.item.title}
              </h2>
              <p className="text-md text-gray-600">
                Quantity in Cart: {cartItem.item.quantity}
              </p>
              <p className="text-md font-bold mt-2">
                Total Price: ${cartItem.item.price * cartItem.item.quantity}
              </p>
              <Button
                className="mt-3 bg-green-500 text-white"
                onClick={() => navigate(`/payment/${cartItem._id}`)}
              >
                Place Order
              </Button>
            </motion.div>
          ))
        ) : (
          <p className="text-lg">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
