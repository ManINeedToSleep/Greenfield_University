"use client";

import React from "react";
import { FaBook, FaCalendarAlt, FaGraduationCap, FaClock } from "react-icons/fa";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default function StudentDashboard() {
  const stats = [
    { title: "Current Courses", value: 5, icon: FaBook },
    { title: "Assignments Due", value: 3, icon: FaClock },
    { title: "Average Grade", value: "87%", icon: FaGraduationCap, trend: { value: 5, isUpward: true } },
    { title: "Attendance Rate", value: "95%", icon: FaCalendarAlt },
  ];

  const recentActivities = [
    {
      id: "1",
      title: "Math Assignment Submitted",
      timestamp: "2 hours ago",
      icon: FaBook,
    },
    {
      id: "2",
      title: "New Grade Posted: Physics Quiz",
      timestamp: "5 hours ago",
      icon: FaGraduationCap,
    },
    {
      id: "3",
      title: "Course Schedule Updated",
      timestamp: "1 day ago",
      icon: FaCalendarAlt,
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      <DashboardHeader 
        title="Student Dashboard"
        role="STUDENT"
        userName="Student User"
        currentPath="/portal/student/dashboard"
      />
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Course Progress Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Course Progress</h2>
              {/* Add course progress bars here */}
            </div>
            
            {/* Upcoming Assignments */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Upcoming Assignments</h2>
              {/* Add assignment list here */}
            </div>
          </div>

          <div className="lg:col-span-1">
            <ActivityFeed 
              title="Recent Activity"
              activities={recentActivities}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
