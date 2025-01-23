"use client";

import React from "react";
import Link from "next/link";
import QuickLinks from "@/components/QuickLinks";

export default function TransferAdmissions() {
  const quickLinks = [
    {
      imagePath: "/images/news/alumni.jpg",
      altText: "Campus Visit",
      title: "Visit Campus",
      description: "Schedule a campus visit to meet with transfer advisors and tour our facilities.",
      linkHref: "/visit/open-houses",
      linkText: "Schedule a Visit"
    },
    {
      imagePath: "/images/virtual/virtual-tour.jpg",
      altText: "Virtual Tour",
      title: "Virtual Tours",
      description: "Explore our campus virtually from anywhere in the world.",
      linkHref: "/visit/virtual",
      linkText: "Take the Tour"
    },
    {
      imagePath: "/images/news/enrollment.jpg",
      altText: "Application Portal",
      title: "Apply Now",
      description: "Ready to transfer? Start your application process here.",
      linkHref: "/apply/transfer",
      linkText: "Begin Application"
    }
  ];

  return (
    <div className="bg-emerald-50 min-h-screen">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Transfer Admissions</h1>
        <p className="text-lg text-gray-700">
          Continue your academic journey by transferring to Greenfield University. We welcome transfer students from accredited institutions.
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
              href="/apply/transfer"
              className="text-emerald-600 font-bold hover:underline"
            >
              Admissions Portal
            </Link>
          </li>
          <li>
            Pay the non-refundable application fee of $50.
          </li>
          <li>
            Submit your official transcripts from all previously attended colleges or universities.
          </li>
          <li>
            Provide a course equivalency or credit evaluation if applicable.
          </li>
          <li>
            Await your admissions decision, which will be communicated via email.
          </li>
        </ol>
      </section>

      {/* Requirements Section - removed background */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Application Requirements</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>Official transcripts from all colleges and universities attended.</li>
          <li>Minimum cumulative GPA of 2.5 on a 4.0 scale (program-specific requirements may vary).</li>
          <li>Personal statement or essay (500-700 words).</li>
          <li>Letter of good standing from your current institution (if applicable).</li>
          <li>Optional: SAT or ACT scores (if applying with less than 30 college credits).</li>
        </ul>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "What is the application deadline for transfer students?",
              answer: "The priority application deadline is March 1 for the Fall semester and November 1 for the Spring semester.",
            },
            {
              question: "How many credits can I transfer to Greenfield University?",
              answer: "We accept up to 90 transfer credits for undergraduate programs. However, the final number of transferable credits will be determined after a course evaluation.",
            },
            {
              question: "Do I need to submit high school transcripts?",
              answer: "High school transcripts are required only if you have less than 30 college credits.",
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
