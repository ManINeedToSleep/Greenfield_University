"use client";

import React, { useState } from "react";

export default function FAQPage() {
  // FAQs grouped by categories
  const faqs = [
    {
      category: "Admissions",
      questions: [
        {
          question: "What is the application deadline for undergraduate programs?",
          answer:
            "The application deadline for undergraduate programs is March 1 for the Fall semester and November 1 for the Spring semester.",
        },
        {
          question: "How can I apply to Greenfield University?",
          answer:
            "You can apply online through our Admissions Portal. Be sure to review all the required documents before submitting your application.",
        },
        {
          question: "Does Greenfield University offer early decision?",
          answer:
            "Yes, we offer an early decision application option. The deadline for early decision is November 15, and decisions are released by December 15.",
        },
      ],
    },
    {
      category: "Financial Aid",
      questions: [
        {
          question: "What types of financial aid are available?",
          answer:
            "We offer need-based grants, merit-based scholarships, federal loans, and work-study opportunities. Visit our Financial Aid page for details.",
        },
        {
          question: "How do I apply for financial aid?",
          answer:
            "Complete the FAFSA form and include Greenfield University's code to be considered for federal and institutional aid.",
        },
        {
          question: "Are there scholarships for international students?",
          answer:
            "Yes, we offer merit-based scholarships for international students. Visit our Scholarships page for more information.",
        },
      ],
    },
  ];

  // Common Questions
  const commonQuestions = [
        {
          question: "What is the application deadline for undergraduate programs?",
          answer:
            "The application deadline for undergraduate programs is March 1 for the Fall semester and November 1 for the Spring semester.",
        },
        {
          question: "How can I schedule a campus tour?",
          answer:
            "You can schedule a campus tour by visiting our Visit page or contacting the admissions office at admissions@greenfield.edu.",
        },
        {
          question: "Are there scholarships available for international students?",
          answer:
            "Yes, Greenfield University offers several merit-based and need-based scholarships for international students. Check the Scholarships section on our website for more details.",
        },
        {
          question: "What are the housing options available for students?",
          answer:
            "Greenfield University provides on-campus housing options, including dormitories and apartments, as well as resources for finding off-campus housing.",
        },
        {
          question: "Can I transfer credits from another university?",
          answer:
            "Yes, transfer credits are accepted for courses completed at accredited institutions, provided they meet our transfer requirements.",
        },
        {
          question: "Does Greenfield University have an early decision application process?",
          answer:
            "Yes, Greenfield University offers an early decision option with a deadline of November 15. Early decision applicants receive their admissions decisions by mid-December.",
        },
        {
          question: "What support services are available for students?",
          answer:
            "We offer a wide range of support services, including academic advising, mental health counseling, career services, and peer mentoring programs.",
        },
        {
          question: "What is the average class size at Greenfield University?",
          answer:
            "The average class size at Greenfield University is 25 students, ensuring personalized attention and an engaging learning environment.",
        },
        {
          question: "What is the cost of tuition, and are payment plans available?",
          answer:
            "The cost of tuition varies by program. Payment plans are available to help manage tuition costs. Visit our Financial Aid page or contact our Student Accounts Office for more information.",
        },
        {
          question: "Are there opportunities for undergraduate research?",
          answer:
            "Absolutely! Greenfield University encourages undergraduate research across all disciplines, offering funding and mentorship through the Research and Innovation Center.",
        },
      ];

  // State to track expanded questions
  const [expandedQuestion, setExpandedQuestion] = useState<{ categoryIndex: number; questionIndex: number } | null>(null);

  const toggleExpand = (categoryIndex: number, questionIndex: number) => {
    if (
      expandedQuestion &&
      expandedQuestion.categoryIndex === categoryIndex &&
      expandedQuestion.questionIndex === questionIndex
    ) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion({ categoryIndex, questionIndex });
    }
  };

  return (
    <div className="bg-emerald-50">
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">FAQs and Common Questions</h1>
        <p className="text-lg text-gray-700">
          Find answers to frequently asked questions about Greenfield University&apos;s admissions, financial aid, and more.
        </p>
      </header>

      {/* FAQ Section */}
      <section className="container mx-auto p-6 space-y-8">
        {faqs.map((faqCategory, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h2 className="text-2xl font-bold text-emerald-800 mb-4">{faqCategory.category}</h2>
            {faqCategory.questions.map((faq, questionIndex) => (
              <div
                key={questionIndex}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600"
              >
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleExpand(categoryIndex, questionIndex)}
                >
                  <h3 className="text-xl font-bold text-emerald-800">{faq.question}</h3>
                  <span className="text-emerald-600 text-2xl">
                    {expandedQuestion &&
                    expandedQuestion.categoryIndex === categoryIndex &&
                    expandedQuestion.questionIndex === questionIndex
                      ? "−"
                      : "+"}
                  </span>
                </button>
                {expandedQuestion &&
                  expandedQuestion.categoryIndex === categoryIndex &&
                  expandedQuestion.questionIndex === questionIndex && (
                    <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                  )}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Common Questions Section */}
      <section className="container mx-auto p-6 space-y-8">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Common Questions</h2>
        {commonQuestions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600"
          >
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleExpand(index, index)}
            >
              <h3 className="text-xl font-bold text-emerald-800">{item.question}</h3>
              <span className="text-emerald-600 text-2xl">
                {expandedQuestion && expandedQuestion.questionIndex === index && expandedQuestion.categoryIndex === index
                  ? "−"
                  : "+"}
              </span>
            </button>
            {expandedQuestion &&
              expandedQuestion.questionIndex === index &&
              expandedQuestion.categoryIndex === index && (
                <p className="mt-4 text-gray-700 leading-relaxed">{item.answer}</p>
              )}
          </div>
        ))}
      </section>
    </div>
  );
}
