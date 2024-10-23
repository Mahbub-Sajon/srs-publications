import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import { useContext } from "react"; // Import useContext to access AuthContext
import { AuthContext } from "@/providers/AuthProvider"; // Import AuthContext

type TSupplyItemCard = {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: number;
  price: number;
};

const SupplyItemCard = (props: { item: TSupplyItemCard }) => {
  const { _id, image, title, category, quantity, price } = props.item;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, addToCart }: any = useContext(AuthContext); // Access user and addToCart from AuthContext
  const navigate = useNavigate(); // For navigation

  const handleAddToCart = async () => {
    if (user) {
      // Add the item to the cart
      addToCart(props.item);
      console.log("Item added to cart:", props.item);

      // Prepare data to send to the backend
      const cartItemData = {
        userId: user.uid, // Assuming you have user ID from the auth context
        item: {
          _id: props.item._id,
          title: props.item.title,
          quantity: props.item.quantity,
          image: props.item.image,
          price: props.item.price,
        },
      };

      // Send the cart item data to the backend
      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItemData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Cart item saved to database:", data);
      } catch (error) {
        console.log("Error saving cart item:", error);
      }
    } else {
      // Navigate to login if user is not logged in
      navigate("/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state before animation
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.5 }} // Duration of the animation
      viewport={{ once: false }} // Enable reanimation when scrolling back
      className="rounded-md text-center border-2 p-2 bg-[#f1efef] shadow-lg flex flex-col h-full" // Flex column to make button at the bottom
    >
      <img className="w-full h-48 object-cover" src={image} alt="" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="text-xl font-semibold">Category: {category}</h2>
      <p className="font-semibold">Quantity: {quantity}</p>
      <p className="font-semibold">Price: BDT {price}</p>
      <div className="mt-auto">
        <Link to={`/item/${_id}`}>
          <Button className="my-2 mx-2">View Detail</Button>
        </Link>
        <Button onClick={handleAddToCart} className="my-2">
          {user ? "Add to Cart" : "Login to Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
};

export default SupplyItemCard;
