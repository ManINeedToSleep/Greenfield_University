"use client";

import React from "react";
import LoginForm from "@/components/LoginForm";

export default function StudentLoginPage() {
  const studentFields = (
    <div className="mb-4">
      <label htmlFor="studentId" className="block text-gray-700 font-bold mb-2">
        Student ID
      </label>
      <input
        type="text"
        id="studentId"
        name="studentId"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="Enter your student ID"
        required
      />
    </div>
  );

  return <LoginForm role="student" additionalFields={studentFields} />;
}