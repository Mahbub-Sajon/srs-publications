import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";

interface CartItem {
  _id: string;
  item: {
    _id: string;
    title: string;
    quantity: number;
    price: number;
    author: string;
  };
}

interface PlaceOrderModalProps {
  cartItem: CartItem;
  isOpen: boolean;
  onClose: () => void;
}

const PlaceOrderModal = ({
  cartItem,
  isOpen,
  onClose,
}: PlaceOrderModalProps) => {
  const { user } = useContext(AuthContext) || {};
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(cartItem.item.quantity);
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const originalPrice = cartItem.item.price * cartItem.item.quantity;
  const [totalPrice, setTotalPrice] = useState(originalPrice);
  const discountedPrice = totalPrice * 0.85;

  // Fetch stock quantity when modal opens
  useEffect(() => {
    if (cartItem && isOpen) {
      const fetchStockQuantity = async () => {
        try {
          const response = await axios.get(
            `https://srs-publications-server.vercel.app/api/products/${cartItem.item._id}`
          );
          const productData = response.data;
          setStockQuantity(productData.quantity);
        } catch (error) {
          console.error("Error fetching stock quantity:", error);
        }
      };

      fetchStockQuantity();
    }
  }, [cartItem, isOpen]);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < (stockQuantity || 0)) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Recalculate total price and update remaining stock dynamically
  useEffect(() => {
    const newTotalPrice = quantity * cartItem.item.price;
    setTotalPrice(newTotalPrice);
  }, [quantity, cartItem.item.price]);

  // Calculate remaining stock
  const remainingStock =
    stockQuantity !== null ? stockQuantity - quantity : null;

  // Function to update stock quantity in the database
  const updateProductStock = async () => {
    if (remainingStock !== null) {
      try {
        await axios.patch(
          `https://srs-publications-server.vercel.app/api/products/${cartItem.item._id}`,
          {
            quantity: remainingStock,
          }
        );
        console.log("Stock updated successfully");
      } catch (error) {
        console.error("Error updating stock quantity:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("User is not logged in.");
      return;
    }

    if (!address || !phone) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      const userResponse = await axios.get(
        `https://srs-publications-server.vercel.app/api/users/${user.email}`
      );
      const userData = userResponse.data;

      const orderData = {
        userId: user.uid, // user is now checked to be defined
        userName: userData.name,
        email: userData.email,
        items: [
          {
            productId: cartItem.item._id,
            title: cartItem.item.title,
            quantity: quantity,
            price: cartItem.item.price,
            author: cartItem.item.author,
          },
        ],
        address,
        phone,
        totalPrice: discountedPrice,
        createdAt: new Date(),
      };

      // Submit the order data
      await axios.post(
        "https://srs-publications-server.vercel.app/api/orders",
        orderData
      );

      // Initiate payment process
      const paymentResponse = await axios.post(
        "https://srs-publications-server.vercel.app/create-payment",
        { orderData }
      );

      const paymentUrl = paymentResponse.data.GatewayPageUrl;
      if (paymentUrl) {
        // Update stock only if payment URL is received (assuming payment initiates successfully)
        await updateProductStock();
        window.location.href = paymentUrl;
      } else {
        console.error("Payment URL not found");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Order</DialogTitle>
          <DialogDescription>
            Please provide your address and phone number to complete the order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label className="col-span-1">{cartItem.item.title}</Label>
            <div className="col-span-2 flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                variant="outline"
                onClick={() => handleQuantityChange("increase")}
                disabled={remainingStock !== null && remainingStock <= 0}
              >
                +
              </Button>
            </div>
            <p className="col-span-1">BDT {discountedPrice.toFixed(2)}</p>
          </div>
          {stockQuantity !== null && (
            <div className="text-sm text-gray-500">
              Available Stock: {remainingStock}
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Original Price</Label>
            <p className="col-span-3 line-through text-gray-500">
              BDT {originalPrice.toFixed(2)}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Author</Label>
            <p className="col-span-3">{cartItem.item.author}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Discounted Price</Label>
            <p className="col-span-3">
              BDT {discountedPrice.toFixed(2)}{" "}
              <span className="text-green-500">(15% discount)</span>
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceOrderModal;
