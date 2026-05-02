import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Authprovider from "./components/context/Authprovider";
import { CartProvider } from "./components/cartprovider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authprovider>
        <CartProvider>
          <div className="dark:bg-slate-900 dark:text-white">
            <App />
          </div>
        </CartProvider>
      </Authprovider>
    </BrowserRouter>
  </React.StrictMode>
);