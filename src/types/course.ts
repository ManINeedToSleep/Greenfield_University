interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  faculty: string;
  department: string;
  credits: number;
  capacity: number;
  isActive: boolean;
  description?: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  students?: Student[];
}

export interface FilterOptions {
  department: string;
  sortBy: 'name' | 'code' | 'faculty';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
}

export interface CourseModalProps {
  onClose: () => void;
  onSave: (course: Omit<Course, 'id'> | Course) => void;
  course?: Course;
} 