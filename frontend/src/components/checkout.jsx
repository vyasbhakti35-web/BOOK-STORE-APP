import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "./cartprovider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/Authprovider";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const userId = authUser?._id || authUser?.user?._id;

      if (!userId) {
        toast.error("User not found. Please login again.");
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const orderData = {
        userId,
        items: cartItems,
        totalAmount: totalPrice,
        paymentMethod,
      };

      const res = await axios.post(
        "http://localhost:4001/order/create",
        orderData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Order placed successfully");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.log("Order error:", error);
      toast.error("Order failed");
    }
  };

  return (
    <div className="max-w-screen-md container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="border p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Card Payment"
              checked={paymentMethod === "Card Payment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card Payment
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
        </div>

        <h2 className="text-2xl font-bold mt-6">Total: ${totalPrice}</h2>

        <button
          onClick={handlePlaceOrder}
          className="btn bg-pink-500 hover:bg-pink-600 text-white border-none mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;