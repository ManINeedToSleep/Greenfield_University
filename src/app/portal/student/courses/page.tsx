"use client";

import React, { useState } from "react";
import { FaBook, FaUserTie, FaFileAlt, FaBullhorn, FaTimes } from "react-icons/fa";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: {
    name: string;
    email: string;
  };
  schedule: {
    day: string;
    time: string;
    room: string;
  };
  grade: string;
  progress: number;
  announcements: Announcement[];
  assignments: Assignment[];
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  description: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function StudentCourses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Dummy data for courses with announcements and assignments
  const courses: Course[] = [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: {
        name: "Dr. Smith",
        email: "smith@university.edu"
      },
      schedule: {
        day: "Monday/Wednesday",
        time: "09:00 AM - 10:30 AM",
        room: "Room 301"
      },
      grade: "A",
      progress: 75,
      announcements: [
        {
          id: "1",
          title: "Midterm Date Announced",
          content: "The midterm exam will be held on March 25th",
          date: "2024-03-10"
        }
      ],
      assignments: [
        {
          id: "1",
          title: "Binary Search Implementation",
          dueDate: "2024-03-25",
          status: "pending",
          description: "Implement binary search algorithm in Python"
        }
      ]
    },
    {
      id: "2",
      code: "MATH201",
      name: "Calculus I",
      instructor: {
        name: "Dr. Johnson",
        email: "johnson@university.edu"
      },
      schedule: {
        day: "Tuesday/Thursday",
        time: "11:00 AM - 12:30 PM",
        room: "Room 205"
      },
      grade: "B+",
      progress: 60,
      announcements: [],
      assignments: []
    }
  ];

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setActiveTab('details');
  };

  const renderModalContent = () => {
    if (!selectedCourse) return null;

    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">Course Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-800">Instructor</label>
                  <p className="text-slate-800">{selectedCourse.instructor.name}</p>
                  <p className="text-sm text-slate-600">{selectedCourse.instructor.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800">Schedule</label>
                  <p className="text-slate-800">{selectedCourse.schedule.day}</p>
                  <p className="text-slate-800">{selectedCourse.schedule.time}</p>
                  <p className="text-slate-800">{selectedCourse.schedule.room}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800">Progress</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-emerald-600 h-2.5 rounded-full"
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-emerald-600">{selectedCourse.grade}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">Course Announcements</h3>
            <div className="space-y-4">
              {selectedCourse.announcements.map(announcement => (
                <div key={announcement.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-slate-800">{announcement.title}</h4>
                    <span className="text-sm text-slate-600">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-700">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">Course Assignments</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Assignment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedCourse.assignments.map(assignment => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                        {assignment.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          {assignment.grade && ` - ${assignment.grade}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-emerald-600 hover:text-emerald-800">
                          {assignment.status === 'pending' ? 'Submit' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <DashboardHeader 
        title="My Courses"
        role="STUDENT"
        userName="John Doe"
        currentPath="/portal/student/courses"
      />
      
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Current Semester Courses</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800">{course.name}</h3>
                <p className="text-slate-800">{course.code}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaUserTie className="text-emerald-600" />
                  <span className="text-slate-800">{course.instructor.name}</span>
                </div>
                <p className="text-sm text-slate-600 ml-6">{course.instructor.email}</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-800">Course Progress</span>
                  <span className="text-lg font-bold text-emerald-600">{course.grade}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => handleViewCourse(course)}
                className="w-full bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                View Course Details
              </button>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {isModalOpen && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedCourse.name} ({selectedCourse.code})
                  </h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>

              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-b-2 border-emerald-500 text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaBook /> Course Details
                </button>
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                    activeTab === 'announcements'
                      ? 'border-b-2 border-emerald-500 text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaBullhorn /> Announcements
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                    activeTab === 'assignments'
                      ? 'border-b-2 border-emerald-500 text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaFileAlt /> Assignments
                </button>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
                {renderModalContent()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 