"use client";
import Image from "next/image";

export default function PostPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Post Container */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Post Image */}
        <div className="relative w-full h-72 lg:h-96 overflow-hidden rounded-md">
          <Image
            src="https://via.placeholder.com/1200x800" // Valid image URL
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Post Title */}
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Beautiful Responsive Post Title
        </h1>

        {/* Post Content */}
        <div className="prose lg:prose-xl text-gray-700 mt-6">
          <p>
            Welcome to this beautiful post! This post is designed to be
            responsive across mobile, tablet, desktop, and large screens.
          </p>
          <p>
            The content adjusts depending on the screen size, and the layout is
            optimized to look great on all devices. Try resizing your browser
            window or view this on different devices to see the responsiveness
            in action.
          </p>
          <p>
            You can add more content here as needed, including images, videos,
            or any other elements. Tailwind CSS makes it super easy to ensure
            your content looks good everywhere.
          </p>
        </div>

        {/* Author Info */}
        <div className="mt-8 flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="https://via.placeholder.com/150"
              alt="Author Avatar"
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-gray-800 font-medium">John Doe</p>
            <p className="text-gray-500 text-sm">Posted on May 4, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
