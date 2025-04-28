import Image from "next/image";
import { useState } from "react";
import UserModal from "./UserModal";
 
export default function ProfileSummary() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    totalPosts: 5,
    totalLikes: 125,
    profileImage: "/asests/profile.jpg",
   };
   const [isModalOpen, setIsModalOpen] = useState(false);
  
   
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 mb-6 rounded-xl shadow-md">
    <div className="relative w-32 h-32">
      <Image
        src={user?.profileImage}
        alt="Profile Image"
        fill
        className="rounded-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>

    <div className="text-center md:text-left">
      <h2 className="text-2xl font-bold mb-2">👋 Welcome, {user.name}</h2>
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-700">Total Posts: {user.totalPosts}</p>
      <p className="text-gray-700">Total Likes: {user.totalLikes}</p>
      <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
    </div>

    {isModalOpen && (
         <UserModal setIsModalOpen={setIsModalOpen} />
      )}
  </div>
  );
}
