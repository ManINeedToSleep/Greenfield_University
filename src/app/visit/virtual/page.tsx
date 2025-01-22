"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VirtualOption {
  title: string;
  description: string;
  imagePath: string;
  altText: string;
  details: string;
}

export default function VirtualOpportunities() {
  const virtualOptions = [
    {
      title: "Virtual Campus Tour",
      description: "Take a 360° tour of our campus from anywhere in the world.",
      imagePath: "/images/virtual/virtual-tour.jpg",
      altText: "Virtual campus tour interface",
      details: "Experience our campus through an immersive 360° virtual tour. Navigate through academic buildings, residence halls, recreational facilities, and outdoor spaces. Our interactive tour includes detailed information about each location and gives you a real sense of campus life at Greenfield University."
    },
    {
      title: "Live Webinars",
      description: "Join interactive sessions with faculty and current students.",
      imagePath: "/images/virtual/webinar.jpg",
      altText: "Online webinar session",
      details: "Participate in live, interactive webinars hosted by our faculty and current students. Ask questions, learn about specific programs, and get insider perspectives on academic and campus life. Our webinars cover topics from admissions and financial aid to specific academic programs and student experiences."
    },
    {
      title: "Virtual Info Sessions",
      description: "Learn about admissions, programs, and student life.",
      imagePath: "/images/virtual/info-session.jpg",
      altText: "Virtual information session",
      details: "Join our comprehensive virtual information sessions to learn everything you need to know about Greenfield University. Our admissions team covers the application process, available programs, campus life, and answers your questions live. These sessions are perfect for prospective students and their families."
    }
  ];

  const [selectedOption, setSelectedOption] = useState<VirtualOption | null>(null);

  const handleOpenModal = (option: VirtualOption) => {
    setSelectedOption(option);
  };

  const handleCloseModal = () => {
    setSelectedOption(null);
  };

  return (
    <div className="bg-emerald-50 min-h-screen">
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Virtual Opportunities</h1>
        <p className="text-lg text-gray-700">
          Experience Greenfield University from anywhere in the world through our virtual visit options.
        </p>
      </header>

      {/* Virtual Options Section */}
      <section className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {virtualOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
            >
              <div className="relative w-full h-48 mb-4 bg-emerald-100 rounded-md overflow-hidden">
                <Image
                  src={option.imagePath}
                  alt={option.altText}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{option.title}</h3>
              <p className="text-gray-700 mb-4">{option.description}</p>
              <button 
                onClick={() => handleOpenModal(option)}
                className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedOption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-emerald-900 mb-4">
              {selectedOption.title}
            </h2>
            <p className="text-gray-700 mb-6">{selectedOption.details}</p>
            <button
              onClick={handleCloseModal}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Upcoming Virtual Events</h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="space-y-4">
            {[
              {
                title: "Virtual Campus Tour - Live Guide",
                date: "March 15, 2025",
                time: "2:00 PM EST"
              },
              {
                title: "Admissions Info Session",
                date: "March 20, 2025",
                time: "4:00 PM EST"
              },
              {
                title: "Student Life Q&A",
                date: "March 25, 2025",
                time: "3:00 PM EST"
              }
            ].map((event, index) => (
              <div key={index} className="p-4 border-l-4 border-emerald-600 bg-emerald-50">
                <h3 className="text-xl font-bold text-emerald-800">{event.title}</h3>
                <p className="text-gray-700">
                  {event.date} at {event.time}
                </p>
                <button className="mt-2 text-emerald-600 font-bold hover:underline">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
