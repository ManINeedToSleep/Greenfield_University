"use client";

import React from "react";
import Link from "next/link";
import QuickLinks from "@/components/QuickLinks";

export default function InternationalAdmissions() {
  const quickLinks = [
    {
      imagePath: "/images/news/alumni.jpg",
      altText: "Campus Visit",
      title: "Visit Campus",
      description: "Schedule a campus visit and experience our international community firsthand.",
      linkHref: "/visit/open-houses",
      linkText: "Schedule a Visit"
    },
    {
      imagePath: "/images/virtual/virtual-tour.jpg",
      altText: "Virtual Tour",
      title: "Virtual Tours",
      description: "Take a virtual tour of our campus from anywhere in the world.",
      linkHref: "/visit/virtual",
      linkText: "Take the Tour"
    },
    {
      imagePath: "/images/news/enrollment.jpg",
      altText: "Application Portal",
      title: "Apply Now",
      description: "Ready to join our global community? Start your application here.",
      linkHref: "/apply/international",
      linkText: "Begin Application"
    }
  ];

  return (
    <div className="bg-emerald-50 min-h-screen">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">International Students</h1>
        <p className="text-lg text-gray-700">
          Join our diverse community and bring your global perspective to Greenfield University.
          Explore the steps to apply as an international student.
        </p>
      </header>

      <QuickLinks links={quickLinks} />

      {/* Steps to Apply Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">How to Apply</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            Submit your online application through our{" "}
            <Link
              href="/apply/international"
              className="text-emerald-600 font-bold hover:underline"
            >
              Admissions Portal
            </Link>
          </li>
          <li>
            Pay the non-refundable application fee of $75.
          </li>
          <li>
            Submit official transcripts (translated into English, if necessary).
          </li>
          <li>
            Provide proof of English proficiency (TOEFL, IELTS, or equivalent).
          </li>
          <li>
            Submit additional documents such as a statement of purpose and letters of recommendation.
          </li>
          <li>
            Apply for a student visa (F-1 or J-1) after receiving your acceptance letter and I-20 form.
          </li>
        </ol>
      </section>

      {/* Requirements Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Application Requirements</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>Official transcripts from all secondary and post-secondary institutions attended.</li>
          <li>Proof of English proficiency (TOEFL: 80+, IELTS: 6.5+, or equivalent).</li>
          <li>Personal statement or essay (500-700 words).</li>
          <li>Two letters of recommendation.</li>
          <li>Copy of your passport.</li>
          <li>Financial documentation showing ability to cover tuition and living expenses.</li>
        </ul>
      </section>

      {/* Visa Information Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Student Visa Information</h2>
        <p className="text-gray-700 mb-4">
          International students admitted to Greenfield University must apply for an F-1 or J-1 student visa.
          After receiving your acceptance letter and I-20 form, you can complete the following steps:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>Pay the SEVIS I-901 fee.</li>
          <li>Schedule a visa interview at your local U.S. embassy or consulate.</li>
          <li>Bring required documents to your visa interview, including your I-20 form, acceptance letter, and financial proof.</li>
          <li>Receive your student visa and prepare for your journey to Greenfield University.</li>
        </ul>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "What is the application deadline for international students?",
              answer: "The priority deadline is March 1 for Fall semester and November 1 for Spring semester.",
            },
            {
              question: "Can I work while studying in the U.S.?",
              answer: "Yes, international students on an F-1 visa can work on-campus up to 20 hours per week during the semester.",
            },
            {
              question: "Is financial aid available for international students?",
              answer: "Yes, Greenfield University offers merit-based scholarships for international students. Visit our Financial Aid page for details.",
            },
            {
              question: "What if I don't meet the English proficiency requirement?",
              answer: "Students who do not meet the English proficiency requirement may enroll in our Intensive English Program before starting their degree.",
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
