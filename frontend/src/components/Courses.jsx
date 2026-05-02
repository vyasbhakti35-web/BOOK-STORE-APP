import React from "react";
import Cards from "./Cards.jsx";
import list from "../list.json";

function Courses() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {list.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Courses;