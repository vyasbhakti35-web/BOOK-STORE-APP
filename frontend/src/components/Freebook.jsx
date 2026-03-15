import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import list from "../list.json";
import Cards from "./Cards";

function Freebook() {
  const [selectedBook, setSelectedBook] = useState(null);

  const filterData = list.filter((data) => data.category === "Free");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openBook = (book) => {
    setSelectedBook(book);
    document.getElementById("free_book_modal").showModal();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
      <div className="mb-10">
        <h1 className="font-semibold text-2xl pb-3">Free Books Available</h1>
        <p className="text-gray-600">
          Descubre historias que inspiran e ideas que transforman. Encuentra
          libros que coincidan con tu curiosidad y pasión.
        </p>
      </div>

      <Slider {...settings}>
        {filterData.map((item) => (
          <div key={item.id}>
            <Cards item={item} onOpen={openBook} />
          </div>
        ))}
      </Slider>

      <dialog id="free_book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">{selectedBook?.name}</h3>
          <p className="py-2 opacity-70">{selectedBook?.title}</p>

          <div className="mt-4 flex gap-2">
            <button
              className="btn bg-pink-500 text-white hover:bg-pink-600 border-none"
              onClick={() => alert("Here you will open Reader / PDF / Book page later")}
            >
              Read Now
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById("free_book_modal").close()}
            >
              Close
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setSelectedBook(null)}>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Freebook;