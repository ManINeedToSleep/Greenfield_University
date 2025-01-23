"use client";

import React from "react";
import Link from "next/link";

export default function VisitSchedules() {
  // Sample schedules
  const schedules = [
    { date: "March 10, 2025", time: "10:00 AM", type: "Campus Tour" },
    { date: "March 12, 2025", time: "2:00 PM", type: "Campus Tour" },
    { date: "March 15, 2025", time: "11:30 AM", type: "Campus Tour" },
    { date: "March 18, 2025", time: "3:00 PM", type: "Campus Tour" },
  ];

  return (
    <div className="bg-emerald-50 min-h-screen">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Visit Schedules</h1>
        <p className="text-lg text-gray-700">
          Explore the schedule for upcoming campus tours at Greenfield University and choose the time that works best for you.
        </p>
      </header>

      {/* Schedules Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Upcoming Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
            >
              <h3 className="text-xl font-bold text-emerald-800">{schedule.type}</h3>
              <p className="text-gray-700">
                <b>Date:</b> {schedule.date}
              </p>
              <p className="text-gray-700">
                <b>Time:</b> {schedule.time}
              </p>
              <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition">
                Reserve Spot
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Visit Information</h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">What to Expect</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>90-minute guided campus tour</li>
                <li>Meet with current students</li>
                <li>Visit academic buildings and facilities</li>
                <li>Tour residence halls</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">Important Notes</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Please arrive 15 minutes early</li>
                <li>Comfortable walking shoes recommended</li>
                <li>Tours run rain or shine</li>
                <li>Free parking available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="container mx-auto p-6 text-center">
        <p className="text-lg text-gray-700 mb-4">
          Want to learn more about our campus tours?{" "}
          <Link href="/visit/campus-tours" className="text-emerald-600 font-bold hover:underline">
            Visit our Campus Tours page
          </Link>
        </p>
        <p className="text-lg text-gray-700">
          Return to{" "}
          <Link href="/visit" className="text-emerald-600 font-bold hover:underline">
            Visit Page
          </Link>
        </p>
      </section>
    </div>
  );
}
