import React from "react";
import Home from "./Home/Home";
import Course from "./components/Course/Course";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.toLowerCase() === "/signup"; 

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;