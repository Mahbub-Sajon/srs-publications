import { useEffect, useState } from "react";
import SupplyItemCard from "../Home/SupplyItemCard/SupplyItemCard";
import Container from "@/components/layout/Container";

interface Item {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: number;
  price: number; // Add the price property
}

const AllSupplies = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const result = await response.json();
        setItems(result);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="mt-28 text-4xl font-bold text-center my-5">
        All Collections
      </h1>
      <div className="grid md:grid-cols-3 mb-10 gap-6 mx-auto">
        {items.map((item: Item) => (
          <SupplyItemCard key={item._id} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default AllSupplies;
