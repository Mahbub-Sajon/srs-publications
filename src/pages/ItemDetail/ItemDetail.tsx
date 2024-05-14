import { useParams } from "react-router-dom";
import { useGetSuppliesQuery } from "@/redux/api/api"; // Import the RTK Query hook
import { useEffect, useState } from "react";
import DonateNowModal from "./DonateNowModal";
type Item = {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: string;
};
const ItemDetail = () => {
  const { _id } = useParams();
  const { data: items, isLoading, isError } = useGetSuppliesQuery(undefined);

  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (items) {
      const selectedItem = items.find(
        (item: Item) => item._id === (_id as string)
      );
      setItem(selectedItem);
    }
  }, [_id, items]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {isError}</p>;
  }

  // const { image, title, category, quantity, description } = item;
  return (
    <div>
      {
        <>
          <div>
            {item && (
              <div className="rounded-md text-center border-2 p-2 mt-28 w-2/3 mx-auto bg-[#f1efef] shadow-lg">
                <h1 className="text-3xl font-bold my-2">Item Detail</h1>
                <img
                  className="rounded-md w-1/2 mx-auto"
                  src={item.image}
                  alt=""
                />
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <h2 className="text-xl font-semibold">
                  Category: {item.category}
                </h2>
                <p className="font-semibold">Quantity: {item.quantity}</p>
                {/* <p>
                  Description: <br /> {item.description}
                </p> */}

                <DonateNowModal />
              </div>
            )}
          </div>
        </>
      }
    </div>
  );
};

export default ItemDetail;
