import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CourseFormData {
  code: string;
  name: string;
  description?: string;
  instructorId: string;
}

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
}

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => void;
  initialData?: CourseFormData;
  mode: 'create' | 'edit';
}

export default function CourseFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  mode 
}: CourseFormModalProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    code: '',
    name: '',
    description: '',
    instructorId: '',
  });
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    // Update to use faculty-specific endpoint
    const fetchInstructors = async () => {
      try {
        const response = await fetch('/api/faculty');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Failed to fetch faculty members:', error);
      }
    };

    if (isOpen) {
      fetchInstructors();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {mode === 'create' ? 'Create New Course' : 'Edit Course'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-800">Course Code</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
              placeholder="e.g., CS101"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Course Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
              placeholder="e.g., Introduction to Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
              rows={3}
              placeholder="Course description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Instructor</label>
            <select
              required
              value={formData.instructorId}
              onChange={(e) => setFormData(prev => ({ ...prev, instructorId: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
            >
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {`${instructor.firstName} ${instructor.lastName}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              {mode === 'create' ? 'Create Course' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 