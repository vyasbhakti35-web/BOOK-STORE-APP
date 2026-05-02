import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ReadBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleBook();
  }, [id]);

  if (!book) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-24">
      <Link to="/courses">
        <button className="mb-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
          Back
        </button>
      </Link>

      <div className="bg-base-100 shadow-md rounded-xl p-6">
        <img
          src={book.image}
          alt={book.name}
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{book.name}</h1>

        <p className="text-lg mb-4">Category: {book.category}</p>

        <p className="mb-4">{book.description}</p>

        <div className="leading-8 whitespace-pre-line">
          {book.content}
        </div>
      </div>
    </div>
  );
}

export default ReadBook;