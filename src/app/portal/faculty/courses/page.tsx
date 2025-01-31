"use client";

import React, { useState } from "react";
import { FaUsers, FaGraduationCap, FaEdit, FaTimes, FaBullhorn, FaFileAlt } from "react-icons/fa";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CourseCard from "@/components/courses/CourseCard";
import AssignmentModal from "@/components/courses/modals/AssignmentModal";
import AnnouncementModal from "@/components/courses/modals/AnnouncementModal";
import { Course, AssignmentFormData } from "@/types/course";

interface ModalTab {
  id: string;
  label: string;
  icon: React.ComponentType;
}

export default function FacultyCourses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const modalTabs: ModalTab[] = [
    { id: 'details', label: 'Course Details', icon: FaEdit },
    { id: 'students', label: 'Students', icon: FaUsers },
    { id: 'grades', label: 'Grades', icon: FaGraduationCap },
    { id: 'announcements', label: 'Announcements', icon: FaBullhorn },
    { id: 'assignments', label: 'Assignments', icon: FaFileAlt },
  ];

  // Dummy data for courses
  const courses: Course[] = [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Computer Science",
      schedule: {
        day: "Monday/Wednesday",
        time: "09:00 AM - 10:30 AM",
        room: "Room 301"
      },
      enrolledCount: 35,
      nextClass: "2024-03-25",
      averageGrade: "B+"
    },
    {
      id: "2",
      code: "CS201",
      name: "Data Structures",
      schedule: {
        day: "Tuesday/Thursday",
        time: "11:00 AM - 12:30 PM",
        room: "Lab 2B"
      },
      enrolledCount: 28,
      nextClass: "2024-03-26",
      averageGrade: "B"
    }
  ];

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setActiveTab('details');
  };

  const handleAssignmentSubmit = (data: AssignmentFormData) => {
    console.log('Assignment submitted:', data);
    setIsAssignmentModalOpen(false);
  };

  const handleAnnouncementSubmit = (data: { title: string; content: string }) => {
    console.log('Announcement submitted:', data);
    setIsAnnouncementModalOpen(false);
  };

  const renderModalContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-800">Course Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                value={selectedCourse?.name}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800">Schedule</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                value={`${selectedCourse?.schedule.day} - ${selectedCourse?.schedule.time}`}
                readOnly
              />
            </div>
          </div>
        );
      case 'students':
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-800">Enrolled Students ({selectedCourse?.enrolledCount})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Students list would go here */}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'grades':
        return (
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">Grade Management</h3>
            {/* Grade management interface would go here */}
          </div>
        );
      case 'announcements':
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-800">Course Announcements</h3>
              <button 
                onClick={() => setIsAnnouncementModalOpen(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <FaBullhorn /> New Announcement
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Announcements list would go here */}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-800">Course Assignments</h3>
              <button 
                onClick={() => setIsAssignmentModalOpen(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <FaFileAlt /> New Assignment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Assignments list would go here */}
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
        role="FACULTY"
        userName="Dr. Smith"
        currentPath="/portal/faculty/courses"
      />
      
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Current Semester Courses</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onEdit={handleEditCourse}
            />
          ))}
        </div>

        {/* Main Course Modal */}
        {isModalOpen && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
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
                {modalTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'border-b-2 border-emerald-500 text-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
                {renderModalContent()}
              </div>
            </div>
          </div>
        )}

        {/* Secondary Modals */}
        <AssignmentModal 
          isOpen={isAssignmentModalOpen}
          onClose={() => setIsAssignmentModalOpen(false)}
          onSubmit={handleAssignmentSubmit}
        />
        <AnnouncementModal 
          isOpen={isAnnouncementModalOpen}
          onClose={() => setIsAnnouncementModalOpen(false)}
          onSubmit={handleAnnouncementSubmit}
        />
      </main>
    </div>
  );
} 