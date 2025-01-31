"use client";

import React from "react";
import Link from "next/link";
import QuickLinks from "@/components/QuickLinks";

export default function UndergraduateAdmissions() {
  const quickLinks = [
    {
      imagePath: "/images/news/alumni.jpg",
      altText: "Campus Visit",
      title: "Visit Campus",
      description: "Experience our campus in person through guided tours and open houses.",
      linkHref: "/visit/open-houses",
      linkText: "Schedule a Visit"
    },
    {
      imagePath: "/images/virtual/virtual-tour.jpg",
      altText: "Virtual Tour",
      title: "Virtual Tours",
      description: "Can't visit in person? Take a virtual tour of our campus.",
      linkHref: "/visit/virtual",
      linkText: "Take the Tour"
    },
    {
      imagePath: "/images/news/enrollment.jpg",
      altText: "Application Portal",
      title: "Apply Now",
      description: "Ready to apply? Start your application process here.",
      linkHref: "/apply/application",
      linkText: "Begin Application"
    }
  ];

  return (
    <div className="bg-emerald-50 min-h-screen">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Undergraduate Admissions</h1>
        <p className="text-lg text-gray-700">
          Explore our undergraduate programs and begin your academic journey at Greenfield University.
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
              href="/apply/undergraduate"
              className="text-emerald-600 font-bold hover:underline"
            >
              Admissions Portal
            </Link>
          </li>
          <li>
            Pay the non-refundable application fee of $50.
          </li>
          <li>
            Submit all required documents, including transcripts, test scores, and letters of recommendation.
          </li>
          <li>
            Attend an admissions interview (optional for most programs).
          </li>
          <li>
            Wait for your admissions decision, which will be communicated via email.
          </li>
        </ol>
      </section>

      {/* Requirements Section - removed background */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Application Requirements</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>Official high school transcript or GED.</li>
          <li>Standardized test scores (SAT or ACT, optional for some programs).</li>
          <li>Personal statement or essay (500-700 words).</li>
          <li>Two letters of recommendation.</li>
          <li>Optional: Portfolio for art, music, or design programs.</li>
        </ul>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "What is the application deadline?",
              answer: "The priority application deadline is March 1 for the Fall semester and November 1 for the Spring semester.",
            },
            {
              question: "Can I apply for early decision?",
              answer: "Yes, we offer an early decision option with a deadline of November 15. Decisions are released by December 15.",
            },
            {
              question: "Are there fee waivers available for the application?",
              answer: "Yes, fee waivers are available for eligible students. Contact our admissions office for more information.",
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
