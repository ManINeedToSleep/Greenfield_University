import React from "react";
import Link from "next/link";

export default function PortalPage() {
  return (
    <div>
      {/* Login Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-emerald-900 mb-6 text-center">GU Portal Login</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="username@greenfield.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-between items-center">
              <Link 
                href="/portal/reset-password" 
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Forgot Password?
              </Link>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Need help? Contact{" "}
              <Link 
                href="/contact" 
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                IT Support
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 