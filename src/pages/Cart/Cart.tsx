import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider"; // Ensure your path is correct
import { motion } from "framer-motion";
import axios from "axios";
import PlaceOrderModal from "../ItemDetail/PlaceOrderModal";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading/Loading";

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
    author: string;
  };
  addedAt: string;
}

const Cart = () => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, setCartItems }: any = authContext || {
    user: null,
    setCartItems: null,
  }; // Provide default values
  const [userCartItems, setUserCartItems] = useState<CartItem[]>([]);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        setLoading(true);
        console.log("Fetching cart items for user:", user.uid); // Debug log
        try {
          const response = await axios.get<{
            message: string;
            items: CartItem[];
          }>(`http://localhost:5000/cart/${user.uid}`);
          console.log("Response data:", response.data); // Debug log

          // Aggregate items by product ID
          const aggregatedItems = response.data.items.reduce(
            (acc, cartItem) => {
              const existingItem = acc.find(
                (item) => item.item._id === cartItem.item._id
              );
              if (existingItem) {
                existingItem.item.quantity += cartItem.item.quantity; // Sum quantities
              } else {
                acc.push({ ...cartItem }); // Add new item
              }
              return acc;
            },
            [] as CartItem[]
          );

          setUserCartItems(aggregatedItems); // Set aggregated items
        } catch (error) {
          console.log("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is authenticated."); // Debug log
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleOpenModal = (cartItem: CartItem) => {
    setSelectedCartItem(cartItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCartItem(null);
  };

  const handleClearCart = async () => {
    if (user) {
      try {
        await axios.delete(`http://localhost:5000/cart/${user.uid}`);
        setUserCartItems([]); // Clear cart state after successful deletion

        // Ensure setCartItems is a function before calling
        if (typeof setCartItems === "function") {
          setCartItems([]); // Update context state as well
        } else {
          console.error("setCartItems is not a function");
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4 mt-28 text-center">Your Cart</h1>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-red-700 text-white hover:bg-red-800 mx-auto"
          onClick={handleClearCart}
          disabled={userCartItems.length === 0}
        >
          Clear Cart
        </Button>
      </div>

      {loading ? (
        <Loading />
      ) : (
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
                <h3 className="text-xl font-semibold mt-2">
                  Author: {cartItem.item.author}
                </h3>
                <p className="text-md text-gray-600">
                  Quantity in Cart: {cartItem.item.quantity}
                </p>
                <p className="text-md font-bold mt-2">
                  Total Price: BDT{" "}
                  {cartItem.item.price * cartItem.item.quantity}
                </p>
                <Button
                  className="my-2"
                  onClick={() => handleOpenModal(cartItem)}
                >
                  Place Order
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-center">Your cart is empty.</p>
          )}
        </div>
      )}

      {selectedCartItem && (
        <PlaceOrderModal
          cartItem={selectedCartItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Cart;
