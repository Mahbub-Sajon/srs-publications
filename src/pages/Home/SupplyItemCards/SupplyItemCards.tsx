import Loading from "@/components/Loading/Loading";
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
  price: number;
}

const SupplyItemCards = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const result = await response.json();
        setItems(result);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchData();
  }, []);

  // Get unique categories for the dropdown
  const categories = Array.from(new Set(items.map((item) => item.category)));

  // Filter items based on the search query and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-5">Our Collection</h1>

      <div className="flex flex-col md:flex-row md:justify-center mb-5 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-slate-700 px-3 py-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-slate-700 px-3 py-2 rounded-md w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Show loading indicator */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Message for no items found */}
          {filteredItems.length === 0 && (
            <div className="text-center text-lg text-red-600 mb-5">
              The book you are looking for is not available.
            </div>
          )}

          <div className="grid md:grid-cols-3 mb-10 gap-6 mx-auto">
            {filteredItems.slice(0, 6).map((item: Item) => (
              <SupplyItemCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}

      <div className="text-center mb-10">
        <NavLink to="/all-supplies">
          <Button>View All</Button>
        </NavLink>
      </div>
    </Container>
  );
};

export default SupplyItemCards;
