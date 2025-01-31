export interface Course {
  id: string;
  code: string;
  name: string;
  schedule: {
    day: string;
    time: string;
    room: string;
  };
  enrolledCount: number;
  nextClass: string;
  averageGrade: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  dueDate: string;
} 