import React from "react";
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div>
      {/* Introduction Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-emerald-900">Welcome to Greenfield University</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nestled in <b>Greenfield Valley</b>, Vermont, Greenfield University has been a beacon of
            education and innovation since <b>1875</b>. Our scenic campus offers the ideal environment
            for academic achievement and personal growth. Explore our programs, admissions, and campus life
            to see how we shape tomorrow&apos;s leaders. With a commitment to sustainability, diversity, and excellence,
            Greenfield University offers over <b>100 programs</b> in engineering, health sciences, business, and the arts.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our faculty and staff are dedicated to nurturing curiosity, fostering collaboration, and empowering
            students to excel. Whether you&apos;re exploring renewable energy or the creative arts, you&apos;ll find a program
            that inspires success. Our campus is more than just a place to learn—it&apos;s a vibrant community for cultural,
            social, and athletic activities. From the historic <b>Founders Hall</b> to the modern <b>Innovation Center</b>
            and <b>Greenfield Library</b>, our facilities support both academic and extracurricular pursuits, offering
            opportunities to connect, create, and grow within a diverse and supportive student body.
          </p>
        </div>
        <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image 
            src="/images/campus/College.jpg"
            alt="Greenfield University Campus"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Campus Highlights Section */}
      <section className="container mx-auto px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-emerald-900 text-center">Campus Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Greenfield Library</h3>
            <p className="text-gray-600 leading-relaxed">
              A state-of-the-art research facility with over 1 million books and digital resources.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Innovation Center</h3>
            <p className="text-gray-600 leading-relaxed">
              A hub for startups and entrepreneurship, helping students bring their ideas to life.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Greenfield Performing Arts Center</h3>
            <p className="text-gray-600 leading-relaxed">
              Hosting theater productions, concerts, and guest speakers throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="container mx-auto px-6 py-12 bg-gradient-to-b from-white to-emerald-50">
        <h2 className="text-3xl font-bold mb-8 text-emerald-900 text-center">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Spring 2025 Enrollment</h3>
            <p className="text-gray-600 leading-relaxed">
              Enroll now for the upcoming semester. Deadline: March 1.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Campus Expansion Plans</h3>
            <p className="text-gray-600 leading-relaxed">
              Exciting new spaces are coming to Greenfield University in 2026.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Alumni Spotlight</h3>
            <p className="text-gray-600 leading-relaxed">
              Learn about the incredible achievements of our graduates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
