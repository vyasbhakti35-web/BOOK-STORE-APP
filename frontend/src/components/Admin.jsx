import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Admin() {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("books");
  const [editingBook, setEditingBook] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    content: "",
    pdfUrl: "",
  });

  const resetForm = () => {
    setEditingBook(null);
    setForm({
      name: "",
      title: "",
      price: "",
      category: "",
      image: "",
      description: "",
      content: "",
      pdfUrl: "",
    });
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4001/admin/books");
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

  const handleSubmitBook = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        ...form,
        price: Number(form.price),
      };

      if (editingBook) {
        await axios.put(
          `http://localhost:4001/admin/books/${editingBook._id}`,
          bookData
        );

        toast.success("Book updated successfully");
      } else {
        await axios.post("http://localhost:4001/admin/books", bookData);
        toast.success("Book added successfully");
      }

      resetForm();
      fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Book action failed");
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);

    setForm({
      name: book.name || "",
      title: book.title || "",
      price: book.price ?? "",
      category: book.category || "",
      image: book.image || "",
      description: book.description || "",
      content: book.content || "",
      pdfUrl: book.pdfUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4001/admin/books/${id}`);
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 dark:text-white">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage books, orders, users, and customer messages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-300">Total Books</p>
            <h2 className="text-3xl font-bold text-pink-500">
              {books.length}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-300">Total Orders</p>
            <h2 className="text-3xl font-bold text-blue-500">
              {orders.length}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-300">Users</p>
            <h2 className="text-3xl font-bold text-green-500">
              {users.length}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-300">Messages</p>
            <h2 className="text-3xl font-bold text-purple-500">
              {messages.length}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <aside className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700 h-fit">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              Admin Menu
            </h2>

            <ul className="space-y-3">
              {["books", "orders", "users", "messages"].map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-xl cursor-pointer capitalize font-medium duration-300 ${
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
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-5">
                    {editingBook ? "Update Book" : "Add New Book"}
                  </h2>

                  <form onSubmit={handleSubmitBook}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Book Name"
                        className="input input-bordered w-full dark:bg-slate-800"
                        required
                      />

                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="input input-bordered w-full dark:bg-slate-800"
                        required
                      />

                      <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        type="number"
                        className="input input-bordered w-full dark:bg-slate-800"
                        required
                      />

                      <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="input input-bordered w-full dark:bg-slate-800"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="input input-bordered w-full dark:bg-slate-800"
                      />

                      <input
                        name="pdfUrl"
                        value={form.pdfUrl}
                        onChange={handleChange}
                        placeholder="PDF URL example: /books/javascript.pdf"
                        className="input input-bordered w-full dark:bg-slate-800"
                      />
                    </div>

                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Short Description"
                      className="input input-bordered w-full mt-4 dark:bg-slate-800"
                    />

                    <textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      placeholder="Book reading content or preview text"
                      className="textarea textarea-bordered w-full mt-4 dark:bg-slate-800"
                      rows="5"
                    />

                    <div className="flex gap-3 mt-5">
                      <button className="btn bg-pink-500 hover:bg-pink-600 text-white border-none">
                        {editingBook ? "Update Book" : "Add Book"}
                      </button>

                      {editingBook && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="btn btn-outline"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-5">All Books</h2>

                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Book</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>PDF</th>
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
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {book.title}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="badge badge-secondary">
                                {book.category}
                              </span>
                            </td>

                            <td>
                              {Number(book.price) === 0
                                ? "Free"
                                : `$${book.price}`}
                            </td>

                            <td>
                              {book.pdfUrl ? (
                                <span className="text-green-600 font-medium">
                                  view pdf
                                </span>
                              ) : (
                                <span className="text-gray-400">None</span>
                              )}
                            </td>

                            <td>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditBook(book)}
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => handleDeleteBook(book._id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {books.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-6">
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
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
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
                          <th>Payment Status</th>
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
                                <div key={item._id || item.id}>
                                  {item.name} × {item.quantity}
                                </div>
                              ))}
                            </td>

                            <td>${order.totalAmount}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  order.paymentStatus === "Paid"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  order.orderStatus === "Cancelled"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-blue-100 text-blue-600"
                                }`}
                              >
                                {order.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "users" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
                <h1 className="text-3xl font-bold mb-4">Users</h1>

                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  <div className="overflow-x-auto">
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
                  </div>
                )}
              </div>
            )}

            {activeTab === "messages" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 border dark:border-gray-700">
                <h1 className="text-3xl font-bold mb-4">Messages</h1>

                {messages.length === 0 ? (
                  <p>No messages found.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className="border dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-slate-800"
                      >
                        <p>
                          <b>Name:</b> {msg.name}
                        </p>
                        <p>
                          <b>Email:</b> {msg.email}
                        </p>
                        <p>
                          <b>Message:</b> {msg.message}
                        </p>
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