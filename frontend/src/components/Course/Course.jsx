import React, { useState, useEffect } from "react";
import Cards from "../Cards";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Course() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, []);

  const filteredBooks = book.filter((item) => {
    const searchText = `${item.name || ""} ${item.title || ""} ${
      item.category || ""
    }`.toLowerCase();

    const searchWords = searchQuery
      .toLowerCase()
      .trim()
      .split(" ")
      .filter(Boolean);

    const matchSearch = searchWords.every((word) =>
      searchText.includes(word)
    );

    const matchCategory =
      category === "All" || item.category === category;

    const matchPrice =
      priceFilter === "All" ||
      (priceFilter === "Free" && Number(item.price) === 0) ||
      (priceFilter === "Paid" && Number(item.price) > 0);

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-20">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          We&apos;re delighted to have you{" "}
          <span className="text-pink-500">:) Here!</span>
        </h1>

        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          BookStore is your place to explore stories, ideas, and knowledge that
          truly matter. We offer a thoughtful collection of books across
          different categories so readers can easily find content that informs,
          inspires, and entertains.
        </p>

        {searchQuery && (
          <p className="mt-4 text-pink-500 font-medium">
            Showing results for: {searchQuery}
          </p>
        )}

        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
        <select
          className="select select-bordered w-full md:w-60 dark:bg-slate-800 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Free">Free</option>
          <option value="Programming">Programming</option>
          <option value="Story">Story</option>
          <option value="Novel">Novel</option>
        </select>

        <select
          className="select select-bordered w-full md:w-60 dark:bg-slate-800 dark:text-white"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="All">All Prices</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item) => (
            <Cards key={item._id || item.id} item={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500 dark:text-gray-300">
            No books found
          </p>
        )}
      </div>
    </div>
  );
}

export default Course;