import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./context/Authprovider";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = authUser?._id || authUser?.user?._id;
        if (!userId) return;

        const res = await axios.get(`http://localhost:4001/order/${userId}`, {
          withCredentials: true,
        });

        setOrders(res.data || []);
      } catch (error) {
        console.log("Fetch orders error:", error);
      }
    };

    fetchOrders();
  }, [authUser]);

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:4001/order/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: "Cancelled" }
            : order
        )
      );

      toast.success(res.data.message || "Order cancelled successfully");
    } catch (error) {
      console.log("Cancel order error:", error);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="max-w-screen-lg container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-6 rounded-xl shadow">
              <p className="font-semibold">Order ID: {order._id}</p>

              <p>
                Order Status:{" "}
                <span
                  className={
                    order.orderStatus === "Cancelled"
                      ? "text-red-500 font-semibold"
                      : "text-green-500 font-semibold"
                  }
                >
                  {order.orderStatus}
                </span>
              </p>

              <p>Payment Status: {order.paymentStatus}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p className="font-bold">Total: ${order.totalAmount}</p>

              <div className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="border-b pb-2">
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>

              {order.orderStatus !== "Cancelled" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;