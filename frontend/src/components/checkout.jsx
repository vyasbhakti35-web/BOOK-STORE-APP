import React, { useState } from "react";
import { useCart } from "./cartprovider";
import { useAuth } from "./context/Authprovider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const userId = authUser?._id || authUser?.user?._id;

      if (!userId) {
        toast.error("Please login first");
        return;
      }

      if (cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      if (paymentMethod === "Card") {
        if (!cardNumber || !expiry || !cvv) {
          toast.error("Please enter card details");
          return;
        }
      }

      if (paymentMethod === "UPI") {
        if (!upiId) {
          toast.error("Please enter UPI ID");
          return;
        }
      }

      setLoading(true);

      const orderData = {
        userId,
        items: cartItems,
        totalAmount,
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
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50 dark:bg-slate-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Secure Checkout</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Review your order and choose your payment method.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white dark:bg-slate-800 shadow-xl p-6 rounded-2xl border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex justify-between items-center border-b dark:border-gray-700 pb-4"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ${Number(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

              <select
                className="select select-bordered w-full dark:bg-slate-900"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash on delivery">Cash on Delivery</option>
                <option value="Card">Card Payment</option>
                <option value="UPI">UPI</option>
              </select>

              {paymentMethod === "Card" && (
                <div className="mt-5 space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="input input-bordered w-full dark:bg-slate-900"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input input-bordered w-full dark:bg-slate-900"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      className="input input-bordered w-full dark:bg-slate-900"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Demo payment only. No real payment is processed.
                  </p>
                </div>
              )}

              {paymentMethod === "UPI" && (
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    className="input input-bordered w-full dark:bg-slate-900"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />

                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                    Example: username@upi
                  </p>
                </div>
              )}

              {paymentMethod === "COD" && (
                <div className="mt-5 bg-pink-50 dark:bg-slate-900 border border-pink-200 dark:border-gray-700 rounded-xl p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    You will pay when the order is delivered. Payment status
                    will remain pending.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 shadow-xl p-6 rounded-2xl border dark:border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-5">Payment Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span>Payment</span>
                <span>{paymentMethod}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className="w-full mt-6 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Secure checkout demo for academic project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;