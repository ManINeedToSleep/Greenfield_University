"use client";

import React from "react";
import { FaChalkboardTeacher, FaClipboardList, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default function FacultyDashboard() {
  const stats = [
    { title: "Active Courses", value: 4, icon: FaChalkboardTeacher },
    { title: "Total Students", value: 120, icon: FaUserGraduate },
    { title: "Pending Grades", value: 15, icon: FaClipboardList },
    { title: "Office Hours", value: "10hrs/week", icon: FaCalendarAlt },
  ];

  const recentActivities = [
    {
      id: "1",
      title: "New Assignment Submission - Math 101",
      timestamp: "10 minutes ago",
      icon: FaClipboardList,
    },
    {
      id: "2",
      title: "Office Hours Updated",
      timestamp: "1 hour ago",
      icon: FaCalendarAlt,
    },
    {
      id: "3",
      title: "Grade Posted for Physics Quiz",
      timestamp: "2 hours ago",
      icon: FaChalkboardTeacher,
    },
  ];

  const upcomingClasses = [
    { id: 1, course: "Mathematics 101", time: "09:00 AM", room: "Room 301", students: 35 },
    { id: 2, course: "Physics 201", time: "11:00 AM", room: "Lab 2B", students: 28 },
    { id: 3, course: "Computer Science 150", time: "02:00 PM", room: "Lab 3A", students: 42 },
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      <DashboardHeader 
        title="Faculty Dashboard"
        role="FACULTY"
        userName="Faculty User"
        currentPath="/portal/faculty/dashboard"
      />
      
      <main className="container mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">{"Today's Classes"}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-800">Course</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-800">Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-800">Room</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-800">Students</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {upcomingClasses.map((class_) => (
                      <tr key={class_.id} className="hover:bg-emerald-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{class_.course}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{class_.time}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{class_.room}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{class_.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left">
                  <h3 className="font-semibold text-emerald-800">Post Grades</h3>
                  <p className="text-sm text-gray-600">Update student grades and provide feedback</p>
                </button>
                <button className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left">
                  <h3 className="font-semibold text-emerald-800">Create Assignment</h3>
                  <p className="text-sm text-gray-600">Add new assignments or materials</p>
                </button>
                <button className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left">
                  <h3 className="font-semibold text-emerald-800">Schedule Office Hours</h3>
                  <p className="text-sm text-gray-600">Set or modify office hours</p>
                </button>
                <button className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left">
                  <h3 className="font-semibold text-emerald-800">Send Announcement</h3>
                  <p className="text-sm text-gray-600">Post updates to your classes</p>
                </button>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
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
