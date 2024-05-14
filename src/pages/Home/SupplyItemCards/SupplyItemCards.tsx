import SupplyItemCard from "../SupplyItemCard/SupplyItemCard";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
// import { useGetSuppliesQuery } from "@/redux/api/api";
import { useEffect, useState } from "react";
interface Item {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: string;
}

const SupplyItemCards = () => {
  //locally
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        const result = await response.json();
        setItems(result);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);
  //from rtk query
  // const { data: items, isLoading, isError } = useGetSuppliesQuery(undefined);

  // console.log(items);
  // if (isLoading) {
  //   return <p>Loading</p>;
  // }
  // if (isError) {
  //   console.log(isError);
  // }

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-5">Supplied Items</h1>
      <div className="grid md:grid-cols-3 mb-10 gap-6 mx-auto">
        {items.slice(0, 6).map((item: Item) => (
          <SupplyItemCard key={item._id} item={item} />
        ))}
      </div>
      <div className="text-center mb-10">
        <Button>View All</Button>
      </div>
    </Container>
  );
};

export default SupplyItemCards;
