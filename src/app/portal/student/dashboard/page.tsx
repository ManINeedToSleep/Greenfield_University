"use client";

import React from "react";
import { FaBook, FaCalendarAlt, FaGraduationCap, FaClock, FaBell, FaCheckCircle } from "react-icons/fa";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

interface Course {
  id: string;
  name: string;
  code: string;
  progress: number;
  grade: string;
  nextAssignment?: {
    title: string;
    dueDate: string;
  };
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

export default function StudentDashboard() {
  // Dummy data for statistics
  const stats = [
    { 
      title: "Current Courses", 
      value: 5, 
      icon: FaBook 
    },
    { 
      title: "Assignments Due", 
      value: 3, 
      icon: FaClock,
      trend: { value: 2, isUpward: false }
    },
    { 
      title: "GPA", 
      value: "3.8", 
      icon: FaGraduationCap, 
      trend: { value: 0.2, isUpward: true } 
    },
    { 
      title: "Attendance Rate", 
      value: "95%", 
      icon: FaCalendarAlt,
      trend: { value: 5, isUpward: true }
    },
  ];

  // Dummy data for courses
  const courses: Course[] = [
    {
      id: "1",
      name: "Introduction to Computer Science",
      code: "CS101",
      progress: 75,
      grade: "A",
      nextAssignment: {
        title: "Binary Search Implementation",
        dueDate: "2024-03-25"
      }
    },
    {
      id: "2",
      name: "Calculus I",
      code: "MATH201",
      progress: 60,
      grade: "B+",
      nextAssignment: {
        title: "Integration Practice Set",
        dueDate: "2024-03-23"
      }
    },
    {
      id: "3",
      name: "Physics Mechanics",
      code: "PHY101",
      progress: 85,
      grade: "A-",
      nextAssignment: {
        title: "Force Analysis Lab Report",
        dueDate: "2024-03-28"
      }
    }
  ];

  // Dummy data for upcoming assignments
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Binary Search Implementation",
      course: "CS101",
      dueDate: "2024-03-25",
      status: "pending"
    },
    {
      id: "2",
      title: "Integration Practice Set",
      course: "MATH201",
      dueDate: "2024-03-23",
      status: "submitted"
    },
    {
      id: "3",
      title: "Force Analysis Lab Report",
      course: "PHY101",
      dueDate: "2024-03-28",
      status: "graded",
      grade: "A"
    }
  ];

  // Dummy data for recent activities
  const recentActivities = [
    {
      id: "1",
      title: "New Grade Posted: CS101 Quiz",
      timestamp: "2 hours ago",
      icon: FaGraduationCap,
    },
    {
      id: "2",
      title: "Assignment Submitted: MATH201",
      timestamp: "5 hours ago",
      icon: FaCheckCircle,
    },
    {
      id: "3",
      title: "New Assignment Posted: PHY101",
      timestamp: "1 day ago",
      icon: FaBell,
    }
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      <DashboardHeader 
        title="Student Dashboard"
        role="STUDENT"
        userName="John Doe"
        currentPath="/portal/student/dashboard"
      />
      
      <main className="container mx-auto p-6">
        {/* Statistics Overview */}
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
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.code}</p>
                      </div>
                      <span className="text-lg font-bold text-emerald-600">{course.grade}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-emerald-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    {course.nextAssignment && (
                      <p className="text-sm text-gray-600 mt-2">
                        Next due: {course.nextAssignment.title} ({new Date(course.nextAssignment.dueDate).toLocaleDateString()})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Assignments */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Assignments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-800">Assignment</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-800">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-800">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-800">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {assignments.map(assignment => (
                      <tr key={assignment.id} className="hover:bg-emerald-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{assignment.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{assignment.course}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            {assignment.grade && ` - ${assignment.grade}`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
