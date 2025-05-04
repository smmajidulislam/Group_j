"use client";
import Image from "next/image";
import UserModal from "./UserModal";
import { useAuth } from "@/app/contexts/authContext/AuthContext";
import { useGetUserByIdQuery } from "@/app/features/api/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalOpen,
  setPreviewProfileImage,
} from "@/app/features/slice/userProfileSlice/userProfileSlice";

export default function ProfileSummary() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user?.user?._id;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const isModalOpen = useSelector((state) => state.userProfile.isModalOpen);

  const handleOpenModal = () => {
    dispatch(setPreviewProfileImage(data?.profileImage));
    dispatch(setModalOpen(true));
  };

  // Skeleton UI
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col md:flex-row items-center gap-6 bg-white p-4 sm:p-6 mb-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto">
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-3 w-full">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded w-1/4 mt-2"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load profile.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 sm:p-6 mb-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto animate__animated animate__backInDown animate__duration-4000 animate__delay-1s">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
        <Image
          src={data?.profileImage || "/asests/profile.jpg"}
          alt="Profile Image"
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority
        />
      </div>

      <div className="text-center md:text-left flex-1 space-y-2">
        <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">
          👋 Welcome, {data?.name}
        </h2>
        <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
          📧 Email: {data?.email}
        </p>
        <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
          📝 Total Posts: {data?.totalPosts}
        </p>
        <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
          ❤️ Total Likes: {data?.totalLikes}
        </p>
        <button
          onClick={handleOpenModal}
          className="mt-3 sm:mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ✏️ Edit Profile
        </button>
      </div>

      {isModalOpen && <UserModal />}
    </div>
  );
}
