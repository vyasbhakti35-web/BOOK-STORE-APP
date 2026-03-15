import React from "react";

function Cards({ item }) {
  const isFree = item.price === 0 || item.category === "Free";

  const handleClick = () => {
    if (isFree) {
      alert(`Opening free book: ${item.name}`);
    } else {
      alert("This is a premium book. Login or purchase required.");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl dark:bg-slate-900 dark:text-white dark:border">
      <figure className="p-4 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
        />
      </figure>

      <div className="card-body pt-0">
        <h2 className="card-title flex justify-between items-center">
          {item.name}
          <span className="badge badge-secondary">{item.category}</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300">{item.title}</p>

        <div className="card-actions justify-between items-center mt-3">
          <span className="badge badge-outline">
            {isFree ? "Free" : `$${item.price}`}
          </span>

          <button
            onClick={handleClick}
            className="px-4 py-1 border-2 rounded-full text-sm hover:bg-pink-500 hover:text-white transition duration-200"
          >
            {isFree ? "Open" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;