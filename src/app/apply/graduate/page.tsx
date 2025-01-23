"use client";

import React from "react";
import Link from "next/link";
import QuickLinks from "@/components/QuickLinks";

export default function GraduateAdmissions() {
  const quickLinks = [
    {
      imagePath: "/images/news/alumni.jpg",
      altText: "Campus Visit",
      title: "Visit Campus",
      description: "Schedule a campus visit to meet with graduate advisors and tour our facilities.",
      linkHref: "/visit/open-houses",
      linkText: "Schedule a Visit"
    },
    {
      imagePath: "/images/virtual/virtual-tour.jpg",
      altText: "Virtual Tour",
      title: "Virtual Tours",
      description: "Explore our graduate facilities virtually from anywhere in the world.",
      linkHref: "/visit/virtual",
      linkText: "Take the Tour"
    },
    {
      imagePath: "/images/news/enrollment.jpg",
      altText: "Application Portal",
      title: "Apply Now",
      description: "Ready to start your graduate journey? Begin your application here.",
      linkHref: "/apply/graduate",
      linkText: "Begin Application"
    }
  ];

  return (
    <div className="bg-emerald-50 min-h-screen">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Graduate Admissions</h1>
        <p className="text-lg text-gray-700">
          Advance your career with a master&apos;s or doctoral degree from Greenfield University.
          Learn more about our graduate programs and application process.
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
              href="/apply/graduate"
              className="text-emerald-600 font-bold hover:underline"
            >
              Admissions Portal
            </Link>
          </li>
          <li>
            Pay the non-refundable application fee of $75.
          </li>
          <li>
            Submit official transcripts from all colleges or universities attended.
          </li>
          <li>
            Provide letters of recommendation from academic or professional references.
          </li>
          <li>
            Submit your resume or CV and a personal statement outlining your goals and qualifications.
          </li>
          <li>
            Submit GRE/GMAT scores if required by your program.
          </li>
        </ol>
      </section>

      {/* Requirements Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Application Requirements</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>Official transcripts from all colleges and universities attended.</li>
          <li>Minimum cumulative GPA of 3.0 on a 4.0 scale (program-specific requirements may vary).</li>
          <li>Personal statement or essay (500-700 words).</li>
          <li>Two or three letters of recommendation.</li>
          <li>Resume or curriculum vitae (CV).</li>
          <li>Optional: GRE or GMAT scores (required for some programs).</li>
        </ul>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "What is the application deadline for graduate programs?",
              answer: "Application deadlines vary by program. Visit the specific program page for details.",
            },
            {
              question: "Is work experience required for graduate admissions?",
              answer: "Some programs may require or prefer relevant work experience. Check the program's requirements for more details.",
            },
            {
              question: "Can I apply for financial aid as a graduate student?",
              answer: "Yes, graduate students are eligible for financial aid, including federal loans and scholarships.",
            },
            {
              question: "Are interviews required for graduate admissions?",
              answer: "Interviews may be required for certain programs. You will be notified if an interview is needed as part of your application process.",
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
