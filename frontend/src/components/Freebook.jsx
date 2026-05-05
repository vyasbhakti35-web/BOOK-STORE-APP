import React, { useEffect, useState } from "react";
import list from "../list.json";
import Cards from "./Cards";

function Freebook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const freeBooks = list
      .filter((book) => book.category === "Free" || Number(book.price) === 0)
      .slice(0, 6);

    setBooks(freeBooks);
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10 bg-base-100 dark:bg-slate-900 dark:text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Free Books Available</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore our free books and start learning without any cost.
        </p>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No free books found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((item) => (
            <Cards item={item} key={item.id || item._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Freebook;