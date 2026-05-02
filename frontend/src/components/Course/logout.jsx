import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/authprovider";

function Logout() {
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setAuthUser(undefined);
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
    >
      Logout
    </button>
  );
}

export default Logout;