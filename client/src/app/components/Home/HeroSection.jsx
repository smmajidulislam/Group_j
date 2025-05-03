"use client";
import { useGetPostsQuery } from "@/app/features/api/postSlice/postSlice";
import Image from "next/image";

export default function HeroSection() {
  const { data, isLoading, isError, error } = useGetPostsQuery(1);

  if (isLoading) {
    return (
      <section className="px-4 text-gray-200 py-12 md:py-20 max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 font-semibold mb-2">Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4 ">
          Unlock the Secrets of Ddsgnr <br className="hidden md:block" />
          with Our Expert Analysis
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center ">
          {/* Image skeleton */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-full h-40 bg-gray-700 rounded-md mb-3"></div>
          </div>

          {/* Content skeleton */}
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>

            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-700"></div>
              <div className="flex flex-col gap-1">
                <div className="w-24 h-3 bg-gray-700 rounded"></div>
                <div className="w-16 h-3 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 text-gray-200 py-12 md:py-20 max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 font-semibold mb-2">Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4 ">
          Something went wrong.
        </h2>
        <p className="text-red-500">{error.message}</p>
      </section>
    );
  }

  const post = data?.posts.find((post) => post?.author?.isAdmin);
  if (!post) {
    return (
      <section className="px-4 text-gray-200 py-12 md:py-20 max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 font-semibold mb-2">Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4 thunder-effect">
          No posts available
        </h2>
      </section>
    );
  }

  const formattedDate = post?.createdAt
    ? new Date(post?.createdAt).toLocaleString()
    : "Date not available";

  return (
    <section className="px-4 text-gray-200 py-12 md:py-20 max-w-7xl mx-auto overflow-hidden">
      <p className="text-sm text-gray-500 font-semibold mb-2">Blog</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4 animate__animated animate__bounce animate__duration-4000 animate__delay-2s">
        Unlock the Secrets of Ddsgnr <br className="hidden md:block" />
        with Our Expert Analysis
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-start">
          {post?.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={400}
              height={300}
              priority
              className="w-full h-40 object-cover rounded-md mb-3 animate__animated animate__bounce"
            />
          ) : (
            <div className="w-full h-40 bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-500 text-sm">
              No post image
            </div>
          )}
        </div>

        {/* Content Card */}
        <div className="flex flex-col gap-2 w-full lg:w-1/2 animate__animated animate__jello animate__duration-4000 animate__delay-1s">
          <p className="text-sm text-gray-500 font-semibold">Business</p>
          <h3 className="text-xl font-bold text-gray-400">{post?.title}</h3>
          <p className="text-gray-500 mb-4">{post?.content}</p>

          <div className="flex items-center gap-3">
            {post?.author?.profileImage ? (
              <Image
                src={post?.author?.profileImage}
                alt={post?.author?.name}
                width={400}
                height={300}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
                No image
              </div>
            )}

            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-400">{post?.author?.name}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
