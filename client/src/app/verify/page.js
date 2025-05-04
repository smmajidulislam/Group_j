"use client";

import { Suspense } from "react";
import VerifyEmailWrapper from "../components/verify/EmailVerify";

const Page = () => {
  return (
    <Suspense
      fallback={<div className="text-white text-center mt-10">Loading...</div>}
    >
      <VerifyEmailWrapper />
    </Suspense>
  );
};

export default Page;
