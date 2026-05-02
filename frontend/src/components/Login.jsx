import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./context/authprovider";

function Login() {
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
      const res = await axios.post("http://localhost:4001/user/login", data);
      console.log(res.data);

      localStorage.setItem("Users", JSON.stringify(res.data.user));
      setAuthUser(res.data.user);

      toast.success("Login successful");
      reset();

      const modal = document.getElementById("my_modal_3");
      if (modal) modal.close();

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error: " + (error.response?.data?.message || "Login failed"));
    }
  };

  const handleClose = () => {
    reset();
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.close();
    navigate("/");
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-base-100 text-base-content">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg text-base-content">Login</h3>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="mt-4 space-y-2">
              <span className="text-base-content">Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
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
                autoComplete="new-password"
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
                Login
              </button>

              <p className="text-base-content">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;