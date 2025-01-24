"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  role: string;
  additionalFields?: React.ReactNode;
}

export default function LoginForm({ role, additionalFields }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    roleId: "", // For student/faculty/admin ID
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      // Get the roleId from the appropriate field
      const roleIdField = document.getElementById(
        role.toLowerCase() + 'Id'
      ) as HTMLInputElement;
      
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        role: role,
        roleId: roleIdField?.value || '',
        redirect: false,
      });

      if (result?.error) {
        setFormError("Invalid credentials");
        return;
      }

      // Redirect to role-specific dashboard
      router.push(`/portal/${role}/dashboard`);
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-emerald-900 text-center mb-8">
          {role.charAt(0).toUpperCase() + role.slice(1)} Login
        </h2>
        
        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
              required
            />
          </div>

          <input
            type="hidden"
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
          />

          {/* Additional fields specific to role */}
          {additionalFields}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-emerald-600 hover:text-emerald-700 text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Need help? Contact{" "}
          <a href="/contact" className="text-emerald-600 hover:text-emerald-700">
            IT Support
          </a>
        </p>
      </div>
    </div>
  );
} 