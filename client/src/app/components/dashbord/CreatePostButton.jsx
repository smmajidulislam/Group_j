"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useCreatePostMutation } from "@/app/features/api/postSlice/postSlice";
import { useUploadImageMutation } from "@/app/features/api/imageuoloadoncloud/img";

export default function CreatePostButton() {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [
    imageUpload,
    {
      isLoading: isLoadingImage,
      isSuccess: isSuccessImage,
      isError: isErrorImage,
      error: errorImage,
    },
  ] = useUploadImageMutation();

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
      setPreviewImage(imageUrl);
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

  const onSubmit = async (data) => {
    const postData = {
      title: data.title,
      content: data.content,
      imageUrl: image,
    };

    try {
      await createPost(postData).unwrap();
      reset(); // reset the form
      setImage(null);
      setPreviewImage("");
      setOpenPostModal(false); // close modal
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  useEffect(() => {
    if (openPostModal) {
      // Disable body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable body scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup: Reset body overflow when component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPostModal]);

  return (
    <div className="text-right">
      <button
        onClick={() => setOpenPostModal(true)}
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

              {isLoadingImage && (
                <p className="text-blue-600 text-sm mt-1">Uploading image...</p>
              )}

              {isSuccessImage && (
                <p className="text-green-600 text-sm mt-1">
                  Image uploaded successfully.
                </p>
              )}

              {isErrorImage && (
                <p className="text-red-600 text-sm mt-1">
                  Failed to upload image:{" "}
                  {errorImage?.data?.error?.message || "Unknown error"}
                </p>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenPostModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isLoadingImage}
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
