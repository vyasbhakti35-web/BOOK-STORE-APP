import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/Authprovider";

function AdminOrders() {
  const [authUser] = useAuth();
  const [orders, setOrders] = useState([]);

  const adminEmail = "jayshihora802@gmail.com";
  const userEmail = authUser?.email || authUser?.user?.email;
  const isAdmin = userEmail === adminEmail;

  useEffect(() => {
    axios
      .get("http://localhost:4001/admin/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Orders error:", err);
      });
  }, []);

  if (!authUser) {
    return <Navigate to="/signup" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-screen-xl container mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Orders</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            View and manage all bookstore orders here.
          </p>
        </div>

        <Link to="/admin" className="btn btn-outline">
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-base-100 shadow-md rounded-2xl p-6 border">
        <h2 className="text-2xl font-semibold mb-4">All Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.userId?.fullname || "Unknown User"}
                      <br />
                      <span className="text-sm text-gray-500">
                        {order.userId?.email}
                      </span>
                    </td>

                    <td>
                      {order.items?.map((item) => (
                        <div key={item._id}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>

                    <td>${order.totalAmount}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;