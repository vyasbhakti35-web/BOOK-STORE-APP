import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "./context/Authprovider";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [authUser] = useAuth();

  const fetchOrders = async () => {
    try {
      const userId = authUser?._id || authUser?.user?._id;
      if (!userId) return;

      const res = await axios.get(`http://localhost:4001/order/${userId}`, {
        withCredentials: true,
      });

      setOrders(res.data);
    } catch (error) {
      console.log("Fetch orders error:", error);
      toast.error("Unable to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [authUser]);

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:4001/order/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message);

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data.order : order))
      );
    } catch (error) {
      toast.error("Cancel failed");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50 dark:bg-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-2 text-center">My Orders</h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Track your payment status, order status, and read purchased books.
      </p>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 border dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                <div>
                  <h2 className="font-bold text-xl">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Ordered on:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Date not available"}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold w-fit ${
                    order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mb-5 text-sm">
                <span className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                  Payment Method: {order.paymentMethod}
                </span>

                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  Payment Status: {order.paymentStatus}
                </span>

                <span className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                  Total: ${order.totalAmount}
                </span>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <h3 className="font-semibold mb-3">Books</h3>

                {order.items.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 py-3 border-b dark:border-gray-700 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>

                    {order.orderStatus !== "Cancelled" && (
                      <Link
                        to={`/read-book/${item._id || item.id}`}
                        state={{ book: item }}
                      >
                        <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                          Read Book
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {order.orderStatus !== "Cancelled" &&
                order.orderStatus !== "Delivered" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="mt-5 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 duration-300"
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