import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { Input, Button } from "../../components/ui";
import { Logo } from "../../components/shared";
import authService from "../../appwrite/auth";
import { login as authLogin } from "./authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const login = async (data) => {
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
      setError("root", { type: "server", message: error.message });
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
        {errors.root && (
          <p className="mt-8 text-red-600 text-center">{errors.root.message}</p>
        )}
        <form
          className="mt-8 flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(login)}
        >
          <div className="flex flex-col items-center gap-1 w-full">
            <Input
              label="Email: "
              type="text"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-md text-red-500 text-center">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-1 w-full">
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-md text-red-500 text-center">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
