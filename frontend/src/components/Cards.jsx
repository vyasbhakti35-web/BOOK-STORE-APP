import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./cartprovider";
import { useAuth } from "./context/Authprovider";
import toast from "react-hot-toast";
import axios from "axios";

function Cards({ item }) {
  const isFree = item.price === 0 || item.category === "Free";

  const { addToCart } = useCart();
  const [authUser] = useAuth();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const handleAddToCart = () => {
    addToCart(item);
    toast.success("Book added to cart");
  };

  const getRecommendations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/book/recommend/${item.category}`
      );

      const filteredBooks = res.data.filter((book) => book._id !== item._id);
      setRecommendedBooks(filteredBooks);

      toast.success("Recommended books loaded");
    } catch (error) {
      console.log("Recommendation error:", error);
      toast.error("Failed to load recommendations");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl dark:bg-slate-900 dark:text-white dark:border">
      <figure className="p-4 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
        />
      </figure>

      <div className="card-body pt-0">
        <h2 className="card-title flex justify-between items-center">
          {item.name}
          <span className="badge badge-secondary">{item.category}</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300">{item.title}</p>

        <div className="card-actions justify-between items-center mt-3">
          <span className="badge badge-outline">
            {isFree ? "Free" : `$${item.price}`}
          </span>

          {isFree ? (
            <Link to={`/book/${item._id}`}>
              <button className="px-4 py-1 border-2 rounded-full text-sm hover:bg-pink-500 hover:text-white transition duration-200">
                Read
              </button>
            </Link>
          ) : authUser ? (
            <button
              onClick={handleAddToCart}
              className="px-4 py-1 border-2 rounded-full text-sm hover:bg-pink-500 hover:text-white transition duration-200"
            >
              Add to Cart
            </button>
          ) : (
            <Link to="/signup">
              <button className="px-4 py-1 border-2 rounded-full text-sm hover:bg-pink-500 hover:text-white transition duration-200">
                Buy Now
              </button>
            </Link>
          )}
        </div>

        <button
          onClick={getRecommendations}
          className="btn btn-sm btn-primary mt-4"
        >
          Show Recommendations
        </button>

        {recommendedBooks.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h3 className="font-bold text-lg mb-2">Recommended Books</h3>

            <div className="space-y-2">
              {recommendedBooks.map((book) => (
                <div
                  key={book._id}
                  className="border rounded-lg p-2 dark:border-gray-600"
                >
                  <h4 className="font-semibold">{book.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {book.category}
                  </p>
                  <p className="text-sm">
                    {book.price === 0 ? "Free" : `$${book.price}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;