"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CampusTours() {
  return (
    <div className="bg-emerald-50 min-h-screen">
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Campus Tours</h1>
        <p className="text-lg text-gray-700">
          Discover the heart of Greenfield University with a guided tour. Explore classrooms, labs, and the vibrant campus life that makes Greenfield University unique.
        </p>
      </header>

      {/* Highlights Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">What You&apos;ll Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "State-of-the-Art Facilities",
              description: "Tour our cutting-edge laboratories, modern classrooms, and research centers.",
              imagePath: "/images/campus-tours/facilities.jpg",
              altText: "Modern university facilities",
            },
            {
              title: "Campus Life",
              description: "Visit key spots like the student center, dormitories, and recreational areas.",
              imagePath: "/images/campus-tours/campus-life.jpg",
              altText: "Students enjoying campus life",
            },
            {
              title: "Personalized Guidance",
              description: "Our friendly guides will answer all your questions and share insider tips.",
              imagePath: "/images/campus-tours/tour-guide.jpg",
              altText: "Campus tour guide with students",
            },
          ].map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
            >
              <div className="relative w-full h-48 mb-4 bg-emerald-100 rounded-md overflow-hidden">
                <Image
                  src={highlight.imagePath}
                  alt={highlight.altText}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{highlight.title}</h3>
              <p className="text-gray-700">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="container mx-auto p-6 bg-gradient-to-b from-white to-emerald-50">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Book Your Tour</h2>
        <p className="text-lg text-gray-700 mb-4">
          Booking a campus tour is easy! Visit our{" "}
          <Link href="/visit/schedules" className="text-emerald-600 font-bold hover:underline">
            Visit Schedules
          </Link>{" "}
          page to find available dates and times. Select the option that works best for you, and we&apos;ll handle the rest.
        </p>
        <div className="text-center">
          <Link
            href="/visit/schedules"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-bold hover:bg-emerald-700 transition"
          >
            View Visit Schedules
          </Link>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How long does a campus tour take?",
              answer: "Campus tours typically last around 90 minutes, including a Q&A session.",
            },
            {
              question: "Can I bring family or friends?",
              answer: "Absolutely! We encourage you to bring family or friends to experience Greenfield University together.",
            },
            {
              question: "Is there parking available?",
              answer: "Yes, free parking is available near the main entrance. Our guides will provide directions upon arrival.",
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
    </div>
  );
}
