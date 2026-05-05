import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.log("Book details error:", error);
      }
    };

    getBook();
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading book...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-20 bg-base-100 text-base-content">
      <Link to="/courses" className="btn btn-primary btn-sm mb-5">
        Back
      </Link>

      <div className="card bg-base-200 shadow-xl p-6">
        <img
          src={book.image}
          alt={book.name}
          className="w-60 h-80 object-cover rounded-xl mx-auto mb-5"
        />

        <h1 className="text-3xl font-bold text-center">{book.name}</h1>

        <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
          {book.title}
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Read Book</h2>

        <p className="leading-8 whitespace-pre-line">
          {book.content || "No reading content available."}
        </p>

        {book.pdfUrl && (
          <a
            href={book.pdfUrl}
            download
            className="btn btn-success mt-6"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}

export default BookDetails;