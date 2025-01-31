import { FaUsers, FaGraduationCap, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { Course } from "@/types/course"; // We'll create this type file

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
}

export default function CourseCard({ course, onEdit }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{course.name}</h3>
          <p className="text-slate-800">{course.code}</p>
        </div>
        <button 
          onClick={() => onEdit(course)}
          className="text-emerald-600 hover:text-emerald-800"
        >
          <FaEdit size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <FaUsers className="text-emerald-600" />
          <span className="text-slate-800">{course.enrolledCount} Students</span>
        </div>
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-emerald-600" />
          <span className="text-slate-800">Avg. Grade: {course.averageGrade}</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <FaCalendarAlt className="text-emerald-600" />
          <span className="text-slate-800">{course.schedule.day}</span>
        </div>
        <p className="text-slate-800 ml-6">{course.schedule.time}</p>
        <p className="text-slate-800 ml-6">{course.schedule.room}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg hover:bg-emerald-200 text-sm">
          View Roster
        </button>
        <button className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg hover:bg-emerald-200 text-sm">
          Manage Assignments
        </button>
        <button className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg hover:bg-emerald-200 text-sm">
          Grade Book
        </button>
      </div>
    </div>
  );
} 