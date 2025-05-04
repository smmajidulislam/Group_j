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
    <div className="flex justify-center mb-4 px-4 z-50">
      <button
        onClick={() => dispatch(setOpenPostModal(true))}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        ➕ Create New Post
      </button>

      {openPostModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 overflow-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              style={{ maxHeight: "calc(90vh - 2rem)" }}
            >
              {/* Title */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    Title is required.
                  </p>
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
                  className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    Content is required.
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Image Preview / Skeleton */}
              <div className="flex justify-center mt-3">
                {previewImage ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border shadow-md">
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

              {/* Uploading or Error Message */}
              {isLoading && (
                <p className="text-center text-blue-600 text-sm">
                  Uploading image...
                </p>
              )}
              {isErrorImage && (
                <p className="text-center text-red-600 text-sm">
                  Failed to upload image: {errorImage || "Unknown error"}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => dispatch(resetPostData())}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-md text-white transition ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
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
