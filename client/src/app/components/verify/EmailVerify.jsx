"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useVerifyEmailQuery } from "@/app/features/api/loginSlice/loginApiSlice";

const VerifyEmailWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data, error, isLoading } = useVerifyEmailQuery(token, {
    skip: !token,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-xl p-6 rounded-xl bg-gray-800 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Email Verification
        </h1>

        {isLoading && <p className="text-white">Loading...</p>}
        {error && (
          <p className="text-red-400 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
        {data && (
          <p className="text-green-400 text-lg font-medium mt-2">
            {data?.message}
          </p>
        )}

        <Link href="/login" passHref>
          <button className="mt-6 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailWrapper;
