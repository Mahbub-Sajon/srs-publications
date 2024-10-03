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
import { useNavigate } from "react-router-dom";

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

const PlaceOrderModal = ({ cartItem, isOpen, onClose }: PlaceOrderModalProps) => {
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(
    cartItem.item.price * cartItem.item.quantity
  );
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!address || !phone) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
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

      await axios.post("http://localhost:5000/api/orders", orderData);
      navigate("/payment");
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
          <Button type="submit" onClick={handleSubmit}>
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceOrderModal;
