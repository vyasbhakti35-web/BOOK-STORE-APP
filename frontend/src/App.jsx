import React from "react";
import Home from "./Home/Home";
import Course from "./components/Course/Course";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import AdminBooks from "./components/AdminBooks";
import AdminOrders from "./components/AdminOrders";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./components/context/Authprovider";
import ReadBook from "./components/ReadBook";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Orders from "./components/order";


function App() {
  const [authUser] = useAuth();

  const adminEmail = "jayshihora802@gmail.com";
  const userEmail = authUser?.email || authUser?.user?.email;
  const isAdmin = userEmail === adminEmail;

  const location = useLocation();
  const hideLayout = location.pathname.toLowerCase() === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />

      {!hideLayout && <Navbar />}

      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/courses"
            element={authUser ? <Course /> : <Navigate to="/signup" />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<ReadBook />} />

          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/signup" />}
          />

          <Route
            path="/checkout"
            element={authUser ? <Checkout /> : <Navigate to="/signup" />}
          />

          <Route
            path="/orders"
            element={authUser ? <Orders /> : <Navigate to="/signup" />}
          />

          <Route
            path="/admin"
            element={isAdmin ? <Admin /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/books"
            element={isAdmin ? <AdminBooks /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/orders"
            element={isAdmin ? <AdminOrders /> : <Navigate to="/" />}
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;