"use client";

import React from "react";
import LoginForm from "@/components/LoginForm";

export default function AdminLoginPage() {
  const adminFields = (
    <div className="mb-4">
      <label htmlFor="adminId" className="block text-gray-700 font-bold mb-2">
        Admin ID
      </label>
      <input
        type="text"
        id="adminId"
        name="adminId"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="Enter your admin ID"
        required
      />
    </div>
  );

  return <LoginForm role="admin" additionalFields={adminFields} />;
}