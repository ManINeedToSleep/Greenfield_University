import { Student } from "@/types/course";

interface StudentsTabProps {
  students: Student[];
  enrolledCount: number;
  onRemoveStudent: (studentId: string) => void;
}

export default function StudentsTab({ 
  students,
  enrolledCount,
  onRemoveStudent 
}: StudentsTabProps) {
  if (students.length === 0) {
    return <div className="text-slate-800">No students enrolled</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-800">
          Enrolled Students ({enrolledCount})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map(student => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => onRemoveStudent(student.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 