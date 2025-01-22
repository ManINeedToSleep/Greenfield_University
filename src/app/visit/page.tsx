import React from "react";
import Link from 'next/link';

export default function VisitingPage() {
  return (
    <div>
      {/* Introduction Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-6 text-emerald-900">
          Plan Your Visit to Greenfield University
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Visiting Greenfield University is the best way to experience our beautiful campus, vibrant
          community, and state-of-the-art facilities. Whether you prefer an in-person tour or a
          virtual opportunity, we have options to suit your needs.
        </p>
      </section>

      {/* Visit Options Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/visit/campus-tours" className="block">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Campus Tours</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a guided tour of our campus and see our classrooms, labs, and more.
              </p>
            </div>
          </Link>
          
          <Link href="/visit/schedules" className="block">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Visit Schedules</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose a date and time that works best for you and plan your visit accordingly.
              </p>
            </div>
          </Link>
          
          <Link href="/visit/open-houses" className="block">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Open Houses</h3>
              <p className="text-gray-600 leading-relaxed">
                Attend an open house event to meet faculty, students, and explore our campus.
              </p>
            </div>
          </Link>
          
          <Link href="/visit/virtual" className="block">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Virtual Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore Greenfield University from the comfort of your home through virtual tours and webinars.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Schedule and Contacts Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedules */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-emerald-900">Visit Schedules</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our visit schedules are flexible and designed to fit your needs. Click the link below to
              find a date and time that works best for you.
            </p>
            <Link
              href="/visit/schedules"
              className="text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
            >
              View Visit Schedules →
            </Link>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-emerald-900">Contact Us</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Have questions? Reach out to our Admissions Office for help with planning your visit.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> admissions@greenfield.edu
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
