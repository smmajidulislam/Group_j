import React from 'react'
import ContactForm from './ContactForm';

export default function Modal({onClose,isOpen,title}) {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
    <div className="bg-white mt-4 rounded-xl shadow-lg w-full max-w-2xl relative animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold ">{title}</h2>
      <div className="mb-2 text-gray-600">
        <ContactForm/>
        </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Confirm
        </button> */}
      </div>
    </div>
  </div>
  )
}
