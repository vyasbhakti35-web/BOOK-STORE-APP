import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./cartprovider";
import { useAuth } from "./context/Authprovider";
import toast from "react-hot-toast";
import axios from "axios";

function Cards({ item }) {
  const isFree = Number(item.price) === 0 || item.category === "Free";

  const { addToCart } = useCart();
  const [authUser] = useAuth();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const bookId = item._id || item.id;

  const handleAddToCart = () => {
    addToCart(item);
    toast.success("Book added to cart");
  };

  const getRecommendations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/book/recommend/${item.category}`
      );

      const filteredBooks = res.data.filter(
        (book) => (book._id || book.id) !== bookId
      );

      setRecommendedBooks(filteredBooks);
      toast.success("Recommended books loaded");
    } catch (error) {
      console.log("Recommendation error:", error);
      toast.error("Failed to load recommendations");
    }
  };

  return (
    <>
      <div className="card w-full h-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl dark:bg-slate-900 dark:text-white dark:border">
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
              <div className="flex gap-2">
                <Link
                  to={`/read-book/${bookId}`}
                  state={{ book: item }}
                >
                  <button className="px-4 py-1 border-2 rounded-full text-sm hover:bg-pink-500 hover:text-white transition duration-200">
                    Read
                  </button>
                </Link>

                {item.pdfUrl && (
                  <a
                    href={item.pdfUrl}
                    download
                    className="px-4 py-1 border-2 rounded-full text-sm hover:bg-green-500 hover:text-white transition duration-200"
                  >
                    Download
                  </a>
                )}
              </div>
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
        </div>
      </div>

      {recommendedBooks.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-slate-900 dark:text-white p-6 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">Recommended Books</h3>

              <button
                onClick={() => setRecommendedBooks([])}
                className="btn btn-sm btn-error"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {recommendedBooks.map((book) => {
                const recommendedBookId = book._id || book.id;

                return (
                  <div
                    key={recommendedBookId}
                    className="border rounded-xl p-3 dark:border-gray-600"
                  >
                    <h4 className="font-semibold">{book.name}</h4>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Category: {book.category}
                    </p>

                    <p className="text-sm">
                      Price: {Number(book.price) === 0 ? "Free" : `$${book.price}`}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Link
                        to={`/read-book/${recommendedBookId}`}
                        state={{ book }}
                      >
                        <button className="btn btn-sm btn-primary">
                          Read
                        </button>
                      </Link>

                      {book.pdfUrl && (
                        <a
                          href={book.pdfUrl}
                          download
                          className="btn btn-sm btn-success"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;