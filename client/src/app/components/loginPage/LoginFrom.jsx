"use client";

import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/authContext/AuthContext";
import { useLoginMutation } from "@/app/features/api/loginSlice/loginApiSlice";
import Link from "next/link";
import { toast } from "react-toastify"; // 👉 toast import

const LoginForm = () => {
  const { setUser } = useAuth();
  const navigate = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      Cookies.set("user", JSON.stringify(res), {
        expires: new Date(res.expire),
      });
      setUser(res);
      toast.success("Login successful! 🎉"); // 👉 Success toast
      navigate.push("/");
    } catch (err) {
      if (err?.data?.error) {
        toast.error(err.data.error); // 👉 Error toast
      } else {
        toast.error("Something went wrong. Please try again."); // 👉 Default error toast
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-600 border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Link to Signup */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
