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
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        ➕ Create New Post
      </button>

      {openPostModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              style={{ maxHeight: "calc(90vh - 2rem)" }}
            >
              <div>
                <label className="block mb-1 font-bold text-left">Title</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full border rounded p-2 mt-1"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required.</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-bold text-left">
                  Content
                </label>
                <textarea
                  {...register("content", { required: true })}
                  rows="6"
                  className="w-full border p-2 rounded"
                ></textarea>
                {errors.content && (
                  <p className="text-sm text-red-500 mt-1">
                    Content is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-bold text-left">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border p-2 rounded"
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

              {isLoading && (
                <p className="text-blue-600 text-sm mt-1">Uploading image...</p>
              )}

              {isErrorImage && (
                <p className="text-red-600 text-sm mt-1">
                  Failed to upload image: {errorImage || "Unknown error"}
                </p>
              )}

              <div className="flex justify-end gap-4 mt-6">
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
