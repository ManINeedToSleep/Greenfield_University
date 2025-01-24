"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Course, FilterOptions } from "@/types/course";

interface CourseModalProps {
  onClose: () => void;
  onSave: (course: Course | Omit<Course, 'id'>) => void;
  course?: Course;
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    department: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
    searchTerm: '',
  });

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  const handleEditCourse = useCallback((course: Course) => {
    setEditingCourse(course);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete course');
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
    }
  }, []);

  const addCourse = useCallback(async (courseData: Omit<Course, 'id'>) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to add course');
      const newCourse = await response.json();
      setCourses(prevCourses => [...prevCourses, newCourse]);
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add course');
    }
  }, []);

  const saveCourse = useCallback(async (courseData: Course | Omit<Course, 'id'>) => {
    if (!('id' in courseData)) return;  // Handle new course case
    
    try {
      const response = await fetch(`/api/courses/${courseData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to update course');
      const updatedCourse = await response.json();
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === updatedCourse.id ? updatedCourse : course
        )
      );
      setIsEditModalOpen(false);
      setEditingCourse(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
    }
  }, []);

  return (
    <div className="bg-emerald-50 min-h-screen">
      <DashboardHeader 
        role="ADMIN" 
        userName="John Doe" 
        currentPath="/portal/admin/courses"
        title="Course Management"
      />

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">Course Management</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Add New Course
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-600"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
          {/* ... Add more filters as needed ... */}
        </div>

        {/* Course Table */}
        {courses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-slate-800">No courses found in the system.</p>
            <p className="text-slate-700 mt-2">Click &quot;Add New Course&quot; to create one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-800">Course Name</th>
                  <th className="px-6 py-4 text-left text-slate-800">Code</th>
                  <th className="px-6 py-4 text-left text-slate-800">Faculty</th>
                  <th className="px-6 py-4 text-left text-slate-800">Department</th>
                  <th className="px-6 py-4 text-left text-slate-800">Status</th>
                  <th className="px-6 py-4 text-left text-slate-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-t border-emerald-100 hover:bg-emerald-50">
                    <td className="px-6 py-4 text-slate-800">{course.name}</td>
                    <td className="px-6 py-4 text-slate-800">{course.code}</td>
                    <td className="px-6 py-4 text-slate-800">{course.faculty}</td>
                    <td className="px-6 py-4 text-slate-800">{course.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        course.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {course.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                          title="Edit course"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete course"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modals */}
      {isAddModalOpen && (
        <CourseModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={addCourse}
        />
      )}

      {isEditModalOpen && editingCourse && (
        <CourseModal
          onClose={() => setIsEditModalOpen(false)}
          onSave={saveCourse}
          course={editingCourse}
        />
      )}

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

function CourseModal({ onClose, onSave, course }: CourseModalProps) {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    code: course?.code || '',
    faculty: course?.faculty || '',
    department: course?.department || '',
    credits: course?.credits || 3,
    capacity: course?.capacity || 30,
    isActive: course?.isActive ?? true
  });
  
  const [facultyMembers, setFacultyMembers] = useState<Array<{
    id: string;
    name: string;
    department: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch('/api/users/faculty');
        if (!response.ok) throw new Error('Failed to fetch faculty members');
        const data = await response.json();
        setFacultyMembers(data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchFaculty();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-emerald-900">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
        </div>
        
        {/* Form Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Course Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter course name"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Course Code</label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter course code"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Faculty</label>
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 bg-white"
                required
                disabled={loading}
              >
                <option value="">
                  {loading ? 'Loading faculty...' : 'Select Faculty Member'}
                </option>
                {facultyMembers.map(faculty => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name} - {faculty.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Credits</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                min="1"
                max="6"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label className="text-sm font-medium text-slate-700">Active Course</label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            {course ? 'Save Changes' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
