import React from "react";

function About() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-20">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-bold">
          About <span className="text-pink-500">BookStore</span>
        </h1>

        <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
          BookStore is a platform designed to help readers discover amazing
          books easily. Explore free and premium books, browse by category,
          and find content that inspires learning and creativity.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-pink-500 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Browse Books</h2>
          <p className="text-gray-600 leading-7">
            Discover books from different categories like Adventure, Science,
            History, and more.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-pink-500 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Free & Premium</h2>
          <p className="text-gray-600 leading-7">
            Access free books instantly and unlock premium content with login
            and purchase options.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-pink-500 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Modern Technology</h2>
          <p className="text-gray-600 leading-7">
            Built using React, Tailwind CSS, DaisyUI, and Node.js to create a
            responsive and modern reading platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;