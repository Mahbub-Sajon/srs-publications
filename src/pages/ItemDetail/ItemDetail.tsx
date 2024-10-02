import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Item = {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: string;
  // Add other properties as needed
};

const ItemDetail = () => {
  const { _id } = useParams<{ _id: string }>(); // Extract the ID parameter from the URL
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json"); // Make sure this path is correct
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: Item[] = await response.json();

        const selectedItem = result.find((item) => item._id === _id);
        if (selectedItem) {
          console.log("Item", selectedItem);
          setItem(selectedItem);
        } else {
          console.log(`Item with ID ${_id} not found`);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <div>
      {item && (
        <div className="rounded-md text-center border-2 p-2 mt-28 w-2/3 mx-auto bg-[#f1efef] shadow-lg">
          <h1 className="text-3xl font-bold my-2">Item Detail</h1>
          <img className="rounded-md w-1/2 mx-auto" src={item.image} alt="" />
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <h2 className="text-xl font-semibold">Category: {item.category}</h2>
          <p className="font-semibold">Quantity: {item.quantity}</p>
          {/* Render other details of the item */}
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
