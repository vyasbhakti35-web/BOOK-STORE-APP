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
    (total, item) => total + item.price * item.quantity,
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
              key={item._id}
              className="flex justify-between items-center border p-4 rounded-xl mb-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>{item.price === 0 ? "Free" : `$${item.price}`}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => decreaseQty(item._id)} className="btn btn-sm">
                  -
                </button>

                <button onClick={() => increaseQty(item._id)} className="btn btn-sm">
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn btn-error btn-sm text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-6">Total: ${totalPrice}</h2>

          <Link
            to="/checkout"
            className="btn bg-pink-500 hover:bg-pink-600 text-white border-none mt-6"
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
                  <div key={book._id} className="card bg-base-100 shadow-xl p-4 border">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="h-40 object-cover rounded-lg"
                    />

                    <h3 className="font-bold mt-3">{book.name}</h3>
                    <p>{book.category}</p>
                    <p>{book.price === 0 ? "Free" : `$${book.price}`}</p>

                    <Link
                      to={`/book/${book._id}`}
                      className="btn btn-sm mt-3 bg-pink-500 text-white border-none"
                    >
                      View Book
                    </Link>
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

