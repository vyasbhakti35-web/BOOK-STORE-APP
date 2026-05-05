import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

function ReadBook() {
  const { id } = useParams();
  const location = useLocation();

  const [book, setBook] = useState(location.state?.book || null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        // If book already came from Cards.jsx state, do not call backend
        if (location.state?.book) {
          setBook(location.state.book);
          return;
        }

        // Only call backend if id is real MongoDB ObjectId
        if (!id || id === "undefined" || id.length !== 24) {
          setError("Book not found. Please go back and select the book again.");
          return;
        }

        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
        setError("Unable to load book.");
      }
    };

    getSingleBook();
  }, [id, location.state]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 dark:bg-slate-900 dark:text-white">
        <p className="text-xl font-semibold mb-4">{error}</p>
        <Link to="/courses">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
            Back
          </button>
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-slate-900 dark:text-white">
        <p className="text-xl font-semibold">Loading book...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 dark:bg-slate-900 dark:text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/courses">
          <button className="mb-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            ← Back
          </button>
        </Link>

        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />

          <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {book.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {book.name}
          </h1>

          <p className="text-pink-500 font-semibold mb-4">
            {Number(book.price) === 0 ? "Free Book" : `$${book.price}`}
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {book.description || book.title}
          </p>

          <hr className="mb-6" />

          <h2 className="text-2xl font-semibold mb-4">Book Content</h2>

          <div className="leading-8 text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {book.content || "No content available for this book."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBook;