"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RoleSelection() {
  const router = useRouter();

  const roles = [
    {
      title: "Student",
      description: "Access your classes, grades, schedule, and learning resources.",
      icon: "/images/icons/student-logo.png",
      path: "student"
    },
    {
      title: "Faculty",
      description: "Manage your courses, grades, and communicate with students.",
      icon: "/images/icons/teacher-logo.png",
      path: "faculty"
    },
    {
      title: "Admin",
      description: "Oversee university operations and manage system settings.",
      icon: "/images/icons/admin-logo.png",
      path: "admin"
    }
  ];

  const handleRoleSelection = (path: string) => {
    router.push(`/portal/${path}/login`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-4/5 md:w-3/5 bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-emerald-900 text-center mb-8">
          Welcome to GU Portal
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Please select your role to continue
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              onClick={() => handleRoleSelection(role.path)}
              className="p-6 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-xl shadow-md 
                hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-300
                border-2 border-emerald-200"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 relative mb-4">
                  <Image
                    src={role.icon}
                    alt={role.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold text-emerald-800 text-center mb-3">
                  {role.title}
                </h2>
                <p className="text-gray-600 text-center text-sm">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 