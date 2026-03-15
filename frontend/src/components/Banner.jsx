import React from "react";

function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center gap-12 py-16">

      {/* LEFT SECTION */}
      <div className="w-full md:w-1/2 space-y-8">
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Hello! Welcome here to discover something{" "}
          <span className="text-pink-500">new everyday!!!</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Discover stories that inspire and ideas that transform. <br />
          Find books that match your curiosity and passion. <br />
          Let every page bring you closer to something amazing.
        </p>

        <div className="space-y-4">
          
          {/* Email Input */}
          <label className="input input-bordered input-lg flex items-center gap-2 w-full max-w-md shadow-sm">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </g>
            </svg>

            <input
              type="email"
              className="grow"
              placeholder="mail@site.com"
              required
            />
          </label>

          {/* CTA Button */}
          <button className="btn bg-pink-500 text-white border-none hover:bg-pink-600 px-12 py-3 text-lg shadow-md hover:shadow-xl transition duration-300">
            Get Started
          </button>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/banner.jpg"
          alt="banner"
          className="w-full max-w-xl object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

    </div>
  );
}

export default Banner;