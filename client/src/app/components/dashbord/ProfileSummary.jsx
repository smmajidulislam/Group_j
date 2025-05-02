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

  if (isLoading) {
    return <p className="text-center">Loading profile...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load profile.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 mb-6 rounded-xl shadow-md">
      <div className="relative w-32 h-32">
        <Image
          src={data?.profileImage || "/asests/profile.jpg"}
          alt="Profile Image"
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">👋 Welcome, {data?.name}</h2>
        <p className="text-gray-700">Email: {data?.email}</p>
        <p className="text-gray-700">Total Posts: {data?.totalPosts}</p>
        <p className="text-gray-700">Total Likes: {data?.totalLikes}</p>
        <button
          onClick={handleOpenModal}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && <UserModal />}
    </div>
  );
}
