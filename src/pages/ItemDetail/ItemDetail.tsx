import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/providers/AuthProvider"; // Import AuthContext
import Loading from "@/components/Loading/Loading";

type Item = {
  _id: string;
  image: string;
  title: string;
  category: string;
  quantity: number;
  description: string;
  price: number;
  author: string;
};

const ItemDetail = () => {
  const { _id } = useParams<{ _id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, addToCart }: any = useContext(AuthContext); // Access user and addToCart from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://srs-publications-server.vercel.app/products"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: Item[] = await response.json();
        if (_id) {
          const selectedItem = result.find((item) => item._id === _id);
          if (selectedItem) {
            setItem(selectedItem);
          } else {
            console.log(`Item with ID ${_id} not found`);
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  const handleAddToCart = async () => {
    if (user && item) {
      // Add the item to the cart context
      addToCart(item);

      // Prepare data to send to the backend
      const cartItemData = {
        userId: user.uid,
        item: {
          _id: item._id,
          title: item.title,
          quantity: 1, // Assuming you add one item at a time
          image: item.image,
          price: item.price,
        },
      };

      // Send the cart item data to the backend
      try {
        const response = await fetch(
          "https://srs-publications-server.vercel.app/api/cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItemData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Cart item saved to database:", data);
      } catch (error) {
        console.log("Error saving cart item:", error);
      }
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 w-2/3 mx-auto">
      {item && (
        <div className="rounded-md text-center border-2 p-2 mt-28 md:w-2/3 mx-auto bg-[#f1efef] shadow-lg">
          <h1 className="text-3xl font-bold my-2">Item Detail</h1>
          <img
            className="rounded-md w-1/2 mx-auto"
            src={item.image}
            alt={item.title}
          />
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <h2 className="text-xl font-semibold">Category: {item.category}</h2>
          <p className="font-semibold">Quantity: {item.quantity}</p>
          <p className="font-semibold">Price: BDT {item.price}</p>
          <p className="font-semibold">Author: {item.author}</p>
          <p className="font-semibold">
            Description: <br /> {item.description}
          </p>
          <Button className="my-3" onClick={handleAddToCart}>
            {user ? "Add to Cart" : "Login to Add to Cart"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
