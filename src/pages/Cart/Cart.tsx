import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";
import PlaceOrderModal from "../ItemDetail/PlaceOrderModal";
import { Button } from "@/components/ui/button";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useContext(AuthContext);
  const [userCartItems, setUserCartItems] = useState<CartItem[]>([]);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await axios.get<CartItem[]>(
            `https://srs-publications-server.vercel.app/cart/${user.uid}`
          );
          setUserCartItems(response.data);
        } catch (error) {
          console.log("Error fetching cart items:", error);
        }
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
        await axios.delete(
          `https://srs-publications-server.vercel.app/cart/${user.uid}`
        );
        setUserCartItems([]); // Clear cart state after successful deletion
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={handleClearCart}
          disabled={userCartItems.length === 0}
        >
          Clear Cart
        </Button>
      </div>
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
                className="my-2"
                onClick={() => handleOpenModal(cartItem)}
              >
                Place Order
              </Button>
            </motion.div>
          ))
        ) : (
          <p className="text-lg">Your cart is empty.</p>
        )}
      </div>

      {/* Conditionally render the modal */}
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
