"use client";

import React from "react";
import Image from "next/image";

export default function OpenHouses() {
  // Sample events for Open Houses
  const events = [
    {
      date: "March 20, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Main Campus Auditorium",
      description: "Meet faculty, explore academic programs, and tour the campus.",
    },
    {
      date: "April 5, 2025",
      time: "12:00 PM - 3:00 PM",
      location: "Science and Innovation Center",
      description: "Discover cutting-edge labs, research opportunities, and student projects.",
    },
    {
      date: "May 15, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Performing Arts Center",
      description: "Engage with faculty and students in the arts and experience live performances.",
    },
  ];

  return (
    <div className="bg-emerald-50 min-h-screen">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Open Houses</h1>
        <p className="text-lg text-gray-700">
          Attend an open house event to meet faculty, explore academic programs, and experience Greenfield University in person.
        </p>
      </header>

      {/* Why Attend Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Why Attend an Open House?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Meet Faculty and Staff",
              description: "Engage directly with our professors, admissions team, and student services staff.",
              imagePath: "/images/open-houses/faculty.jpg",
              altText: "Faculty member teaching",
            },
            {
              title: "Explore Academic Programs",
              description: "Learn about our wide range of undergraduate and graduate programs.",
              imagePath: "/images/open-houses/academics.jpg",
              altText: "Students in classroom",
            },
            {
              title: "Tour the Campus",
              description: "Experience our state-of-the-art facilities, residence halls, and vibrant campus life.",
              imagePath: "/images/open-houses/campus.jpg",
              altText: "Campus buildings and grounds",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
            >
              <div className="relative w-full h-32 mb-2">
                <Image
                  src={benefit.imagePath}
                  alt={benefit.altText}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Upcoming Open House Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
            >
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{event.date}</h3>
              <p className="text-gray-700">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "Do I need to register for an open house?",
              answer: "Yes, registration is recommended to reserve your spot. Visit the Visit Schedules page to sign up.",
            },
            {
              question: "Can I bring guests with me?",
              answer: "Yes, you're welcome to bring family or friends to the open house.",
            },
            {
              question: "Are refreshments provided?",
              answer: "Light refreshments will be available during the event.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
            >
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Links */}
      <section className="container mx-auto p-6 text-center">
        <p className="text-lg text-gray-700 mb-4">
          Looking for more ways to explore Greenfield University? Check out our{" "}
          <a
            href="/visit/campus-tours"
            className="text-emerald-600 font-bold hover:underline"
          >
            Campus Tours
          </a>{" "}
          or{" "}
          <a
            href="/visit/schedules"
            className="text-emerald-600 font-bold hover:underline"
          >
            Visit Schedules
          </a>{" "}
          pages.
        </p>
      </section>
    </div>
  );
}
