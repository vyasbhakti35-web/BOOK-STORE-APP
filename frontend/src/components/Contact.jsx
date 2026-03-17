import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-md border-2 shadow-md rounded-md bg-white p-6">

        {/* Close Button */}
        <Link
          to="/"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </Link>

        <h3 className="font-bold text-lg">Contact Us</h3>

        <form className="mt-4">

          {/* Name */}
          <div className="mt-4">
            <span>Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md outline-none mt-1"
            />
          </div>

          {/* Email */}
          <div className="mt-4">
            <span>Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none mt-1"
            />
          </div>

          {/* Message */}
          <div className="mt-4">
            <span>Message</span>
            <br />
            <textarea
              placeholder="Write your message..."
              rows="4"
              className="w-full px-3 py-2 border rounded-md outline-none mt-1"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200"
            >
              Send Message
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Contact;