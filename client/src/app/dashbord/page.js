"use client";
import CreatePostButton from "../components/dashbord/CreatePostButton";
import ProfileSummary from "../components/dashbord/ProfileSummary";
import Link from "next/link";

export default function DashboardPage() {
  const posts = [
    {
      _id: "1a2b3c",
      title: "How to Learn React in 2025",
      excerpt: "React শেখার সবচেয়ে সহজ ও কার্যকর উপায়গুলো জানুন এই লেখায়।",
    },
    {
      _id: "4d5e6f",
      title: "Next.js App Router Explained",
      excerpt: "Next.js এর নতুন App Router নিয়ে বিস্তারিত আলোচনা।",
    },
    {
      _id: "7g8h9i",
      title: "Mastering Tailwind CSS",
      excerpt: "দ্রুত এবং রেসপনসিভ UI বানাতে Tailwind CSS এর টিপস ও ট্রিকস।",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto p-4">
        <ProfileSummary />
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl text-gray-200 font-bold mb-4">My Posts</h2>
            <CreatePostButton />
          </div>
          {posts.length === 0 ? (
            <p className="text-gray-200">No posts available.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <Link key={idx} href={`/posts/${post._id}`}>
                  <div className="bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200 transition">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-700">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
