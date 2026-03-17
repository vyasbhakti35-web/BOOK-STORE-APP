import React from "react";
import Home from "./Home/Home";
import Course from "./components/Course/Course";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Admin from "./components/Admin"; // 

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.toLowerCase() === "/signup"; 

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/contact" element={<Contact />} />

          {/* ✅ ADMIN ROUTE */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;