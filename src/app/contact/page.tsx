"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ContactPage() {
  const departments = [
    {
      name: "Admissions Office", 
      email: "admissions@greenfield.edu",
      phone: "(123) 456-7891",
    },
    {
      name: "Financial Aid Office",
      email: "financialaid@greenfield.edu", 
      phone: "(123) 456-7892",
    },
    {
      name: "Registrar's Office",
      email: "registrar@greenfield.edu",
      phone: "(123) 456-7893",
    },
    {
      name: "Housing Services",
      email: "housing@greenfield.edu",
      phone: "(123) 456-7894",
    },
    {
      name: "IT Support",
      email: "itsupport@greenfield.edu",
      phone: "(123) 456-7895",
    },
    {
      name: "Career Services",
      email: "careers@greenfield.edu",
      phone: "(123) 456-7896",
    },
  ];

  const { register, handleSubmit, reset } = useForm<FormData>();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered departments based on search term
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add type for form data
  type FormData = {
    name: string;
    email: string;
    message: string;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        reset();
      } else {
        console.error("Error submitting form:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <header className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700">
          Have questions or need assistance? Reach out to us through any of the methods below.
        </p>
      </header>

      {/* General Contact Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">General Inquiries</h2>
        <div className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
          <p className="text-lg text-gray-700 mb-2">
            <strong>Email:</strong> info@greenfield.edu
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-lg text-gray-700">
            <strong>Address:</strong> 123 Greenfield Way, Greenfield Valley, VT 05678
          </p>
        </div>
      </section>

      {/* Department-Specific Contacts Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Department Contacts</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a department..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600"
              >
                <h3 className="text-xl font-bold text-emerald-800 mb-2">{dept.name}</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> {dept.email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {dept.phone}
                </p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700 col-span-full text-center">
              No departments match your search. Please try a different term.
            </p>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Send Us a Message</h2>
        <form className="bg-white p-6 shadow-md rounded-xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-lg font-bold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Your Name"
              required
              {...register("name")}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-bold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Your Email"
              required
              {...register("email")}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-bold text-gray-700">Message</label>
            <textarea
              id="message"
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
              placeholder="Your Message"
              required
              {...register("message")}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}