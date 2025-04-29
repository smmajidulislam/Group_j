import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreatePostButton() {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (image) {
      formData.append("image", image);
    }
  };

  return (
    <div className="text-right">
      <div>
        <button
          onClick={() => setOpenPostModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Create New Post
        </button>
      </div>

      {openPostModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block mb-1 font-bold text-left">
                    Title
                  </label>
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
                  <label className="block text-left mb-1 font-bold">
                    Content
                  </label>
                  <textarea
                    {...register("content", {
                      required: true,
                    })}
                    rows="6"
                    className="w-full border p-2 rounded"
                  ></textarea>
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1">
                      Content is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-left mb-1 font-bold">
                    Image
                  </label>
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
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setOpenPostModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
