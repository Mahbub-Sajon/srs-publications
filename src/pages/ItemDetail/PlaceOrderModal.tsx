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
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";

interface CartItem {
  _id: string;
  item: {
    _id: string;
    title: string;
    quantity: number;
    price: number;
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
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(
    cartItem.item.price * cartItem.item.quantity
  );

  const handleSubmit = async () => {
    if (!address || !phone) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      const orderData = {
        userId: user.uid, // Ensure user has uid from AuthContext
        items: [
          {
            productId: cartItem.item._id,
            title: cartItem.item.title,
            quantity: cartItem.item.quantity,
            price: cartItem.item.price,
          },
        ],
        address,
        phone,
        totalPrice,
        createdAt: new Date(),
      };

      // Save the order in your database first
      await axios.post("http://localhost:5000/api/orders", orderData);

      // Create a payment and get the payment URL
      const paymentResponse = await axios.post(
        "http://localhost:5000/create-payment",
        {
          amount: totalPrice, // Ensure this matches the price to be paid
          currency: "USD", // You can change currency if needed
        }
      );

      // Redirect the user to the payment gateway page
      const paymentUrl = paymentResponse.data.GatewayPageUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl; // Redirect to the payment page
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
            <p className="col-span-2">Quantity: {cartItem.item.quantity}</p>
            <p className="col-span-1">${totalPrice}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Total Price</Label>
            <p className="col-span-3">${totalPrice}</p>
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
