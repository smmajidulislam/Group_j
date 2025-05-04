// app/verify-email/page.jsx
"use client";
import { useSearchParams } from "next/navigation";
import { useVerifyEmailQuery } from "../features/api/loginSlice/loginApiSlice";
import Link from "next/link";
const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, error, isLoading } = useVerifyEmailQuery(token, {
    skip: !token,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-xl p-6 rounded-xl bg-gray-800 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          Email Verification
        </h1>

        <div className="mt-6 text-center">
          {isLoading && (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          )}

          {error && (
            <p className="text-red-400 mt-4">
              Something went wrong. Please try again.
            </p>
          )}

          {!isLoading && !error && (
            <p className="text-green-400 text-lg font-medium mt-4">
              {data?.message}
            </p>
          )}
          <button className="mt-4 inline-block px-4 py-2 bg-white text-black rounded-lg">
            <Link href="/login">Login</Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
