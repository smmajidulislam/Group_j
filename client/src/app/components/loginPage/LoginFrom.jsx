"use client";
import { useState } from "react";
import jsCookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/authContext/AuthContext";
import { useLoginMutation } from "@/app/features/api/loginSlice/loginApiSlice";
import Link from "next/link";

const LoginFrom = () => {
  const [customError, setCustomError] = useState("");
  const { setUser } = useAuth();
  const navigate = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setCustomError("");
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      jsCookies.set("user", JSON.stringify(res), {
        expires: new Date(res.expire),
      });
      setUser(res);
      navigate.push("/");
    } catch (err) {
      if (err?.data?.error) {
        setCustomError(err.data.error);
      } else {
        setCustomError("Something went wrong. Please try again.");
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {customError && (
            <p className="text-sm text-red-500 mt-1">{customError}</p>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don't have a account?{' '}
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Signup
              </Link>
            </p>
          </div>

      </div>
    </div>
  );
};

export default LoginFrom;
