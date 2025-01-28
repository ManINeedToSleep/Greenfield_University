import React from "react";
import { FaBell } from "react-icons/fa";

interface DashboardHeaderProps {
  title: string;
  role: 'ADMIN' | 'FACULTY' | 'STUDENT';
  userName: string;
  currentPath: string;
}

export default function DashboardHeader({ title, role, userName, currentPath }: DashboardHeaderProps) {
  const getNavLinks = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return [
          { href: "/portal/admin/dashboard", label: "Dashboard" },
          { href: "/portal/admin/user-management", label: "User Management" },
          { href: "/portal/admin/courses", label: "Course Management" },
          { href: "/portal/admin/report-systems", label: "Report Systems" }
        ];
      case 'FACULTY':
        return [
          { href: "/portal/faculty/dashboard", label: "Dashboard" },
          { href: "/portal/faculty/courses", label: "My Courses" },
          { href: "/portal/faculty/grades", label: "Grade Management" },
          { href: "/portal/faculty/schedule", label: "Schedule" }
        ];
      case 'STUDENT':
        return [
          { href: "/portal/student/dashboard", label: "Dashboard" },
          { href: "/portal/student/courses", label: "My Courses" },
          { href: "/portal/student/grades", label: "My Grades" },
          { href: "/portal/student/schedule", label: "My Schedule" }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks(role);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-emerald-900">
        {title}
        <span className="ml-2 text-sm px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full">
          {role}
        </span>
      </h1>
      <nav className="flex space-x-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-gray-700 hover:text-emerald-600 ${
              currentPath === link.href ? "font-bold text-emerald-600" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-emerald-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
        <span className="text-gray-700">{userName}</span>
      </div>
    </header>
  );
} 