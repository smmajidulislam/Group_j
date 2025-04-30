"use client";
import { useAuth } from "@/app/contexts/authContext/AuthContext";
import { useUploadImageMutation } from "@/app/features/api/imageuoloadoncloud/img";
import { useUpdateUserMutation } from "@/app/features/api/userSlice/userSlice";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserModal({ setIsModalOpen, onPrvImage }) {
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    imageUpload,
    {
      isLoading: isLoadingImage,
      isSuccess: isSuccessImage,
      isError: isErrorImage,
      error: errorImage,
    },
  ] = useUploadImageMutation();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const userId = user?.user?._id;

  // Success হলে modal বন্ধ ও ফর্ম reset
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      reset();
    }
  }, [isSuccess, reset, setIsModalOpen]);

  // Image preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Practis");
      try {
        const res = await imageUpload(formData).unwrap();
        setImage(res?.secure_url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }
  };

  // Form submit
  const onSubmit = async (data) => {
    const updatedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      profileImage: image,
      previouesImage: onPrvImage,
    };

    try {
      await updateUser({ id: userId, ...updatedData }).unwrap();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* General error */}
        {isError && (
          <p className="text-red-500 text-sm mb-2">
            {error?.data?.message || "Something went wrong!"}
          </p>
        )}

        {/* Image Upload Error */}
        {isErrorImage && (
          <p className="text-red-500 text-sm mb-2">
            {errorImage?.data?.message || "Image upload failed!"}
          </p>
        )}

        {/* Image Upload Success */}
        {isSuccessImage && (
          <p className="text-green-500 text-sm mb-2">
            Image uploaded successfully!
          </p>
        )}

        {/* Image Upload Loading */}
        {isLoadingImage && (
          <p className="text-blue-500 text-sm mb-2">Uploading image...</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Change Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          {previewImage && (
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white transition ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
