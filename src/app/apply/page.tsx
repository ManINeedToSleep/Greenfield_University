import React from "react";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div>
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Apply to Greenfield University</h1>
        <p className="text-lg text-gray-700">
          Start your journey at Greenfield University. Follow the steps below to apply as an
          undergraduate, transfer, or graduate student.
        </p>
      </header>

      {/* Application Options Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Undergraduate Admissions</h3>
            <p className="text-gray-700 mb-4">
              Explore our undergraduate programs and begin your academic journey.
            </p>
            <Link
              href="/apply/undergraduate"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              Learn More →
            </Link>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Transfer Admissions</h3>
            <p className="text-gray-700 mb-4">
              Continue your education by transferring to Greenfield University.
            </p>
            <Link
              href="/apply/transfer"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              Learn More →
            </Link>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Graduate Admissions</h3>
            <p className="text-gray-700 mb-4">
              Advance your career with our master&apos;s and doctoral programs.
            </p>
            <Link
              href="/apply/graduate"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              Learn More →
            </Link>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">International Students</h3>
            <p className="text-gray-700 mb-4">
              Join our diverse community and bring your global perspective to Greenfield University.
            </p>
            <Link
              href="/apply/international"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4 text-center">
            Questions? We&apos;re Here to Help
          </h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            Contact our admissions team for assistance with your application.
          </p>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Email</p>
              <p className="text-emerald-600">admissions@greenfield.edu</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Phone</p>
              <p className="text-emerald-600">(123) 456-7890</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Office Hours</p>
              <p className="text-emerald-600">Mon-Fri: 9 AM - 5 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
