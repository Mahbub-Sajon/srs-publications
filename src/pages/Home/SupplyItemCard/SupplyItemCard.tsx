import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion

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
        {" "}
        {/* Pushes button to the bottom */}
        <Link to={`/item/${_id}`}>
          <Button className="my-2">View Detail</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default SupplyItemCard;
