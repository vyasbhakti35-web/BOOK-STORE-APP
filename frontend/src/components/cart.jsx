import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./cartprovider";
import axios from "axios";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    getBooks();
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const recommendedBooks = books.filter(
    (book) =>
      cartItems.some((cartItem) => cartItem.category === book.category) &&
      !cartItems.some((cartItem) => cartItem._id === book._id)
  );

  return (
    <div className="max-w-screen-lg container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id || item.id}
              className="flex justify-between items-center border p-4 rounded-xl mb-4 bg-white dark:bg-slate-900"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>{Number(item.price) === 0 ? "Free" : `$${item.price}`}</p>
                <p>Quantity: {item.quantity}</p>

                {Number(item.price) === 0 && (
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/read-book/${item._id || item.id}`}
                      state={{ book: item }}
                    >
                      <button className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                        Read
                      </button>
                    </Link>

                    {item.pdfUrl && (
                      <a
                        href={item.pdfUrl}
                        download
                        className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
                      >
                        Download
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => decreaseQty(item._id || item.id)}
                  className="px-3 py-1 border rounded-md bg-white text-black hover:bg-gray-100"
                >
                  -
                </button>

                <button
                  onClick={() => increaseQty(item._id || item.id)}
                  className="px-3 py-1 border rounded-md bg-white text-black hover:bg-gray-100"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item._id || item.id)}
                  className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-6">Total: ${totalPrice}</h2>

          <Link
            to="/checkout"
            className="inline-block px-5 py-3 rounded-md bg-pink-500 hover:bg-pink-600 text-white mt-6"
          >
            Proceed to Checkout
          </Link>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recommended Books</h2>

            {recommendedBooks.length === 0 ? (
              <p>No recommendations available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedBooks.map((book) => (
                  <div
                    key={book._id || book.id}
                    className="card bg-base-100 shadow-xl p-4 border"
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      className="h-40 object-cover rounded-lg"
                    />

                    <h3 className="font-bold mt-3">{book.name}</h3>
                    <p>{book.category}</p>
                    <p>{Number(book.price) === 0 ? "Free" : `$${book.price}`}</p>

                    {Number(book.price) === 0 ? (
                      <Link
                        to={`/read-book/${book._id || book.id}`}
                        state={{ book }}
                        className="inline-block px-4 py-2 mt-3 rounded-md bg-pink-500 text-white"
                      >
                        Read Book
                      </Link>
                    ) : (
                      <button className="px-4 py-2 mt-3 rounded-md bg-pink-500 text-white">
                        Add to Cart
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;