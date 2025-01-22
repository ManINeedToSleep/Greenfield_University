import React from "react";
import Link from "next/link";

export default function PoliciesPage() {
  const policies = [
    {
      title: "Privacy Policy",
      description:
        "Greenfield University is committed to protecting your privacy. We collect and use personal information in accordance with applicable laws and ensure your data is secure.",
      link: "/policies/privacy-policy",
    },
    {
      title: "Code of Conduct",
      description:
        "Our Code of Conduct outlines the behavioral expectations for students, faculty, and staff to maintain a respectful and inclusive environment.",
      link: "/policies/code-of-conduct",
    },
    {
      title: "Academic Integrity Policy",
      description:
        "We uphold the highest standards of academic honesty and integrity. Learn more about our guidelines and consequences for violations.",
      link: "/policies/academic-integrity",
    },
    {
      title: "Equal Opportunity Policy",
      description:
        "Greenfield University is an equal opportunity institution, committed to fostering diversity and inclusion across all areas.",
      link: "/policies/equal-opportunity",
    },
    {
      title: "Refund Policy",
      description:
        "Understand our refund policies for tuition, housing, and other services in case of withdrawals or cancellations.",
      link: "/policies/refund-policy",
    },
    {
      title: "Health and Safety Policy",
      description:
        "Our Health and Safety Policy ensures the well-being of our students, faculty, and staff through comprehensive safety measures and guidelines.",
      link: "/policies/health-and-safety",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">University Policies</h1>
        <p className="text-lg text-gray-700">
          Explore the key policies and guidelines that govern Greenfield University to ensure a safe,
          respectful, and inclusive environment for everyone.
        </p>
      </header>

      {/* Policies Section */}
      <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600"
          >
            <h3 className="text-xl font-bold text-emerald-800 mb-2">{policy.title}</h3>
            <p className="text-gray-700 mb-4">{policy.description}</p>
            <Link
              href={policy.link}
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              Read More →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
