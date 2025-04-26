// pages/services.tsx
"use client";

import {
  FaWrench,
  FaChartLine,
  FaSearch,
  FaHeadset,
  FaMoneyBill,
} from "react-icons/fa";
import { useState } from 'react';
import Modal from "../components/servicePage/Modal";

export default function Services() {
  const services = [
    {
      title: "Custom Blog Setup",
      description: "Personalized blog design tailored to your style and needs.",
      icon: <FaWrench className="text-blue-500 text-3xl md:text-4xl" />,
    },
    {
      title: "SEO Optimization Help",
      description: "Boost your visibility on search engines like Google.",
      icon: <FaSearch className="text-green-500 text-3xl md:text-4xl" />,
    },
    {
      title: "Content Strategy",
      description: "Plan engaging content that attracts more readers.",
      icon: <FaChartLine className="text-purple-500 text-3xl md:text-4xl" />,
    },
    {
      title: "Technical Support",
      description: "We help with any technical issues you may face.",
      icon: <FaHeadset className="text-yellow-500 text-3xl md:text-4xl" />,
    },
    {
      title: "Monetization Guidance",
      description: "Learn how to earn from your blog effectively.",
      icon: <FaMoneyBill className="text-red-500 text-3xl md:text-4xl" />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Title */}
<<<<<<< HEAD
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 text-center mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-400 text-sm sm:text-base mb-10 max-w-2xl mx-auto">
=======
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-600 text-sm sm:text-base mb-10 max-w-2xl mx-auto">
>>>>>>> 7a676556799ba78fa8ba6a9f4b8ea540dfe29418
        Discover the services we offer to help you build, grow, and monetize
        your blog journey.
      </p>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-xl transition duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-centerc flex items-center flex-col justify-center mt-12">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <div className="text-center flex items-center flex-col justify-center mt-12">
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Contact Us
        </button>
      </div>
<<<<<<< HEAD

=======
      
>>>>>>> 7a676556799ba78fa8ba6a9f4b8ea540dfe29418
      <Modal isOpen={isOpen} onClose={closeModal} title="Service Inquiry">
        {/* This is a modal component using Tailwind CSS in Next.js. */}
      </Modal>

      </div>
    </div>
  );
}
