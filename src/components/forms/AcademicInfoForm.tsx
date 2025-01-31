import React from 'react';
import { FormData } from '@/types/application';

interface AcademicInfoFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function AcademicInfoForm({ formData, handleInputChange, setFormData }: AcademicInfoFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-800">Intended Major</label>
        <input
          type="text"
          name="intendedMajor"
          value={formData.intendedMajor}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
          required
          placeholder="e.g., Computer Science"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-800">GPA</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            name="gpa"
            value={formData.gpa}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
            placeholder="e.g., 3.75"
          />
        </div>

        {(formData.type === 'UNDERGRADUATE' || formData.type === 'TRANSFER') && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-800">SAT Score (optional)</label>
              <input
                type="number"
                name="satScore"
                value={formData.satScore}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                placeholder="e.g., 1400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800">ACT Score (optional)</label>
              <input
                type="number"
                name="actScore"
                value={formData.actScore}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                placeholder="e.g., 28"
              />
            </div>
          </>
        )}

        {formData.type === 'INTERNATIONAL' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-800">TOEFL Score</label>
              <input
                type="number"
                name="toeflScore"
                value={formData.toeflScore}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                placeholder="e.g., 100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800">IELTS Score</label>
              <input
                type="number"
                step="0.5"
                name="ieltsScore"
                value={formData.ieltsScore}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                placeholder="e.g., 7.5"
              />
            </div>
          </>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Previous Schools</h3>
        {formData.previousSchools.map((school, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-800">School Name</label>
                <input
                  type="text"
                  value={school.name}
                  onChange={(e) => {
                    const newSchools = [...formData.previousSchools];
                    newSchools[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, previousSchools: newSchools }));
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-800">Location</label>
                <input
                  type="text"
                  value={school.location}
                  onChange={(e) => {
                    const newSchools = [...formData.previousSchools];
                    newSchools[index].location = e.target.value;
                    setFormData(prev => ({ ...prev, previousSchools: newSchools }));
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-800">Start Date</label>
                <input
                  type="date"
                  value={school.startDate}
                  onChange={(e) => {
                    const newSchools = [...formData.previousSchools];
                    newSchools[index].startDate = e.target.value;
                    setFormData(prev => ({ ...prev, previousSchools: newSchools }));
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-800">End Date</label>
                <input
                  type="date"
                  value={school.endDate}
                  onChange={(e) => {
                    const newSchools = [...formData.previousSchools];
                    newSchools[index].endDate = e.target.value;
                    setFormData(prev => ({ ...prev, previousSchools: newSchools }));
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                  required
                />
              </div>

              {(formData.type === 'GRADUATE' || formData.type === 'TRANSFER') && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-800">Degree Earned</label>
                  <input
                    type="text"
                    value={school.degree}
                    onChange={(e) => {
                      const newSchools = [...formData.previousSchools];
                      newSchools[index].degree = e.target.value;
                      setFormData(prev => ({ ...prev, previousSchools: newSchools }));
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                    placeholder="e.g., Bachelor of Science in Computer Science"
                  />
                </div>
              )}
            </div>

            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  const newSchools = formData.previousSchools.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, previousSchools: newSchools }));
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove School
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              previousSchools: [...prev.previousSchools, {
                name: '',
                location: '',
                startDate: '',
                endDate: '',
                degree: '',
              }]
            }));
          }}
          className="text-emerald-600 hover:text-emerald-700 text-sm"
        >
          + Add Another School
        </button>
      </div>
    </div>
  );
} 