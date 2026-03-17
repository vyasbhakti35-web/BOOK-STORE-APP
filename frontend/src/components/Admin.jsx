import React from "react";

function Admin() {
  return (
    <div className="p-10 mt-16 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Admin Panel
      </h1>

      <div className="flex gap-4 justify-center">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Book
        </button>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Update Book
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete Book
        </button>
      </div>
    </div>
  );
}

export default Admin;