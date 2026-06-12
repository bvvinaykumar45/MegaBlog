import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Logo from "./shared/Logo";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import Input from "./ui/Input";
import Button from "./ui/Button";

function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full mx-auto max-w-lg bg-gray-100 rounded-xl p-10 boder border-black/10 flex flex-col items-center">
        <div className="flex justify-center mb-3">
          <span className="inline-block w-full max-w-300px">
            <Logo type="full" width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your Account
        </h2>
        <p className="mt-2 flex flex-col text-center text-base text-black/60">
          Don't have any account?
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-8 text-red-600 text-center">{error}</p>}
        <form
          className="mt-8 flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(login)}
        >
          <Input
            label="Email: "
            type="text"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
