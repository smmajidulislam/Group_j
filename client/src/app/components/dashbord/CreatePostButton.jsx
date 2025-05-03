"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useCreatePostMutation } from "@/app/features/api/postSlice/postSlice";
import { useUploadImageMutation } from "@/app/features/api/imageuoloadoncloud/img";
import {
  setOpenPostModal,
  setImage,
  resetPostData,
  setImageLoading,
  setImageUploadStatus,
  setPreviewImage,
} from "@/app/features/slice/createPostSlice/createPostSlice";

export default function CreatePostButton() {
  const dispatch = useDispatch();
  const {
    openPostModal,
    image,
    previewImage,
    isLoading,
    isErrorImage,
    errorImage,
  } = useSelector((state) => state.createPost);

  const [createPost] = useCreatePostMutation();
  const [imageUpload] = useUploadImageMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(setPreviewImage(imageUrl));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Practis");

      try {
        dispatch(setImageLoading(true));
        const res = await imageUpload(formData).unwrap();
        dispatch(setImage(res?.secure_url));
        dispatch(setImageUploadStatus({ isSuccess: true, isError: false }));
      } catch (err) {
        dispatch(
          setImageUploadStatus({
            isSuccess: false,
            isError: true,
            error: err.message,
          })
        );
      } finally {
        dispatch(setImageLoading(false));
      }
    }
  };

  const onSubmit = async (data) => {
    const postData = {
      title: data.title,
      content: data.content,
      imageUrl: image,
    };

    try {
      await createPost(postData).unwrap();
      reset();
      dispatch(resetPostData());
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = openPostModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPostModal]);

  return (
    <div className="text-right">
      <button
        onClick={() => dispatch(setOpenPostModal(true))}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ➕ Create New Post
      </button>

      {openPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required.</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Content
                </label>
                <textarea
                  {...register("content", { required: true })}
                  rows="4"
                  className="w-full border rounded p-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.content && (
                  <p className="text-red-500 text-sm">Content is required.</p>
                )}
              </div>

              {/* Image Input */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Image Preview or Skeleton */}
              <div className="flex justify-center my-3">
                {previewImage ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border shadow">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : isLoading ? (
                  <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse"></div>
                ) : null}
              </div>

              {/* Status messages */}
              {isLoading && (
                <p className="text-blue-600 text-sm text-center">
                  Uploading image...
                </p>
              )}
              {isErrorImage && (
                <p className="text-red-600 text-sm text-center">
                  Failed to upload image: {errorImage || "Unknown error"}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => dispatch(resetPostData())}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {isLoading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
