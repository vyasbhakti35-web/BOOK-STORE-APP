import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Admin() {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("books");

  const [form, setForm] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    content: "",
  });

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4001/book");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching books");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4001/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4001/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching users");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:4001/admin/messages");
      setMessages(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchOrders();
    fetchUsers();
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4001/admin/books", form);
      toast.success("Book added successfully");

      setForm({
        name: "",
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
        content: "",
      });

      fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/admin/books/${id}`);
      toast.success("Book deleted");
      fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <aside className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              Admin Panel
            </h2>

            <ul className="space-y-3">
              {["books", "orders", "users", "messages"].map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-xl cursor-pointer capitalize ${
                    activeTab === tab
                      ? "bg-pink-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab === "books" ? "Book Management" : tab}
                </li>
              ))}
            </ul>
          </aside>

          <main className="lg:col-span-4 space-y-6">
            {activeTab === "books" && (
              <>
                <h1 className="text-4xl font-bold">Book Management</h1>

                <form
                  onSubmit={handleAddBook}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6"
                >
                  <h2 className="text-2xl font-bold mb-5">Add New Book</h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Book Name" className="input input-bordered w-full" required />
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input input-bordered w-full" required />
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="input input-bordered w-full" required />
                    <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input input-bordered w-full" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="input input-bordered w-full" />
                    <input name="description" value={form.description} onChange={handleChange} placeholder="Short Description" className="input input-bordered w-full" />
                  </div>

                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Book reading content"
                    className="textarea textarea-bordered w-full mt-4"
                    rows="4"
                  />

                  <button className="btn bg-pink-500 hover:bg-pink-600 text-white border-none mt-5">
                    Add Book
                  </button>
                </form>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                  <h2 className="text-2xl font-bold mb-5">All Books</h2>

                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Book</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {books.map((book) => (
                          <tr key={book._id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <img
                                  src={book.image || "/book.jpg"}
                                  alt={book.name}
                                  className="w-12 h-16 object-cover rounded"
                                />
                                <div>
                                  <p className="font-semibold">{book.name}</p>
                                  <p className="text-sm text-gray-500">{book.title}</p>
                                </div>
                              </div>
                            </td>

                            <td>{book.category}</td>
                            <td>${book.price}</td>

                            <td>
                              <button
                                onClick={() => handleDeleteBook(book._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}

                        {books.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center py-6">
                              No books found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "orders" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h1 className="text-3xl font-bold mb-4">Orders</h1>

                {orders.length === 0 ? (
                  <p>No orders found.</p>
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
            )}

            {activeTab === "users" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h1 className="text-3xl font-bold mb-4">Users</h1>

                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.fullname}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === "messages" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h1 className="text-3xl font-bold mb-4">Messages</h1>

                {messages.length === 0 ? (
                  <p>No messages found.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg._id} className="border rounded-xl p-4">
                        <p><b>Name:</b> {msg.name}</p>
                        <p><b>Email:</b> {msg.email}</p>
                        <p><b>Message:</b> {msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Admin;