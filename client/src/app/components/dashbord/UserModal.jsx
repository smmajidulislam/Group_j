import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserModal({ setIsModalOpen }) {
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null)

  const {register, handleSubmit} = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async(data)=>{
console.log(data)
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
