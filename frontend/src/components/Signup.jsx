import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./context/authprovider";

function Signup() {
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4001/user/signup", data);
      console.log(res.data);

      localStorage.setItem("Users", JSON.stringify(res.data.user));
      setAuthUser(res.data.user);

      toast.success("Signup successful");
      reset();

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error: " + (error.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-md border-2 shadow-md rounded-md bg-base-100 text-base-content">
        <Link
          to="/"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 text-base-content"
        >
          ✕
        </Link>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <h3 className="font-bold text-lg text-base-content">Sign up</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 space-y-2">
              <span className="text-base-content">Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-80 px-3 py-1 border rounded-md outline-none bg-base-200 text-base-content"
                {...register("fullname", { required: true })}
              />
              <br />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span className="text-base-content">Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none bg-base-200 text-base-content"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span className="text-base-content">Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none bg-base-200 text-base-content"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex justify-around mt-4 items-center">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Sign up
              </button>

              <p className="text-base-content">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3")?.showModal()
                  }
                >
                  Login
                </button>
              </p>
            </div>
          </form>

          <Login />

          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}

export default Signup;