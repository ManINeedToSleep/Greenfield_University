import React from 'react';
import { FormData } from '@/types/application';

interface DocumentsFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function DocumentsForm({ formData, handleInputChange, setFormData }: DocumentsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-4">
          Personal Statement / Essay
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Tell us about yourself, your academic goals, and why you chose our institution. 
          (500-700 words recommended)
        </p>
        <textarea
          name="essay"
          value={formData.essay}
          onChange={handleInputChange}
          rows={8}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
          required
          placeholder="Write your essay here..."
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Required Documents</h3>
        <p className="text-sm text-gray-500">
          Please upload the following documents in PDF format. Each file should not exceed 5MB.
        </p>

        <div className="space-y-4">
          {/* Official Transcripts */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-slate-800 font-medium mb-2">Official Transcripts</h4>
            <p className="text-sm text-gray-500 mb-3">
              Upload official transcripts from all previously attended institutions.
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const newDocs = [...formData.documents];
                  const index = newDocs.findIndex(doc => doc.type === 'transcript');
                  if (index !== -1) {
                    newDocs[index] = { ...newDocs[index], file, status: 'uploaded' };
                    setFormData(prev => ({ ...prev, documents: newDocs }));
                  }
                }
              }}
              className="block w-full text-sm text-slate-800
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100
              "
            />
          </div>

          {/* Letters of Recommendation */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-slate-800 font-medium mb-2">Letters of Recommendation</h4>
            <p className="text-sm text-gray-500 mb-3">
              Upload letters of recommendation from academic or professional references.
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const newDocs = [...formData.documents];
                  const index = newDocs.findIndex(doc => doc.type === 'recommendation');
                  if (index !== -1) {
                    newDocs[index] = { ...newDocs[index], file, status: 'uploaded' };
                    setFormData(prev => ({ ...prev, documents: newDocs }));
                  }
                }
              }}
              className="block w-full text-sm text-slate-800
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100
              "
            />
          </div>

          {/* Identification */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-slate-800 font-medium mb-2">Government-Issued ID</h4>
            <p className="text-sm text-gray-500 mb-3">
              Upload a copy of your passport or government-issued ID.
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const newDocs = [...formData.documents];
                  const index = newDocs.findIndex(doc => doc.type === 'identification');
                  if (index !== -1) {
                    newDocs[index] = { ...newDocs[index], file, status: 'uploaded' };
                    setFormData(prev => ({ ...prev, documents: newDocs }));
                  }
                }
              }}
              className="block w-full text-sm text-slate-800
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100
              "
            />
          </div>

          {/* Conditional Documents based on application type */}
          {formData.type === 'INTERNATIONAL' && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-slate-800 font-medium mb-2">English Proficiency Test Results</h4>
              <p className="text-sm text-gray-500 mb-3">
                Upload your TOEFL or IELTS score report.
              </p>
              <input
                type="file"
                accept=".pdf"
                className="block w-full text-sm text-slate-800
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100
                "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 