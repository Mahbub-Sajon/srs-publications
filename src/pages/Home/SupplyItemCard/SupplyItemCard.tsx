import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type TSupplyItemCard = {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: string;
};
const SupplyItemCard = (props: { item: TSupplyItemCard }) => {
  // console.log(props);
  const { _id, image, title, category, quantity } = props.item;
  return (
    <div className="rounded-md text-center border-2 p-2 bg-[#f1efef] shadow-lg">
      <img className="rounded-md w-2/3 mx-auto" src={image} alt="" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="text-xl font-semibold">Category: {category}</h2>
      <p className="font-semibold">Quantity: {quantity}</p>
      <Link to={`/item/${_id}`}>
        <Button className="my-2">View Detail</Button>
      </Link>
    </div>
  );
};

export default SupplyItemCard;
