import SupplyItemCard from "../SupplyItemCard/SupplyItemCard";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Item {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: number;
  price: number; // Ensure price is included
}

const SupplyItemCards = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://srs-publications-server.vercel.app/products"
        );
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
      <h1 className="text-4xl font-bold text-center my-5">Our Collection</h1>
      <div className="grid md:grid-cols-3 mb-10 gap-6 mx-auto">
        {items.slice(0, 6).map((item: Item) => (
          <SupplyItemCard key={item._id} item={item} />
        ))}
      </div>
      <div className="text-center mb-10">
        <NavLink to="/all-supplies">
          <Button>View All</Button>
        </NavLink>
      </div>
    </Container>
  );
};

export default SupplyItemCards;
