"use client";

import React from "react";
import LoginForm from "@/components/LoginForm";

export default function FacultyLoginPage() {
  const facultyFields = (
    <div className="mb-4">
      <label htmlFor="facultyId" className="block text-gray-700 font-bold mb-2">
        Faculty ID
      </label>
      <input
        type="text"
        id="facultyId"
        name="facultyId"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="Enter your faculty ID"
        required
      />
    </div>
  );

  return <LoginForm role="faculty" additionalFields={facultyFields} />;
}