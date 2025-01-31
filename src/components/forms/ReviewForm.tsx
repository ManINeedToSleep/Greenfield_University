import React from 'react';
import { FormData } from '@/types/application';

interface ReviewFormProps {
  formData: FormData;
}

export default function ReviewForm({ formData }: ReviewFormProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Review Your Application</h3>
        <p className="text-sm text-gray-500 mb-6">
          Please review all information carefully before submitting. You cannot edit your application after submission.
        </p>

        {/* Personal Information */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-slate-800 font-medium mb-3">Personal Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Application Type:</span>
              <p className="text-slate-800">{formData.type}</p>
            </div>
            <div>
              <span className="text-gray-500">Start Term:</span>
              <p className="text-slate-800">{formData.startTerm}</p>
            </div>
            <div>
              <span className="text-gray-500">Full Name:</span>
              <p className="text-slate-800">{`${formData.firstName} ${formData.lastName}`}</p>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <p className="text-slate-800">{formData.email}</p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-slate-800 font-medium mb-3">Academic Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Intended Major:</span>
              <p className="text-slate-800">{formData.intendedMajor}</p>
            </div>
            <div>
              <span className="text-gray-500">GPA:</span>
              <p className="text-slate-800">{formData.gpa}</p>
            </div>
            {formData.satScore && (
              <div>
                <span className="text-gray-500">SAT Score:</span>
                <p className="text-slate-800">{formData.satScore}</p>
              </div>
            )}
            {formData.actScore && (
              <div>
                <span className="text-gray-500">ACT Score:</span>
                <p className="text-slate-800">{formData.actScore}</p>
              </div>
            )}
            {formData.type === 'INTERNATIONAL' && (
              <>
                {formData.toeflScore && (
                  <div>
                    <span className="text-gray-500">TOEFL Score:</span>
                    <p className="text-slate-800">{formData.toeflScore}</p>
                  </div>
                )}
                {formData.ieltsScore && (
                  <div>
                    <span className="text-gray-500">IELTS Score:</span>
                    <p className="text-slate-800">{formData.ieltsScore}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Previous Schools */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-slate-800 font-medium mb-3">Previous Schools</h4>
          <div className="space-y-4">
            {formData.previousSchools.map((school, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <p className="text-slate-800 font-medium">{school.name}</p>
                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="text-slate-800">{school.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Dates:</span>
                    <p className="text-slate-800">
                      {new Date(school.startDate).toLocaleDateString()} - {new Date(school.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  {school.degree && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Degree:</span>
                      <p className="text-slate-800">{school.degree}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-slate-800 font-medium mb-3">Uploaded Documents</h4>
          <div className="space-y-2">
            {formData.documents.map((doc, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  doc.status === 'uploaded' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="text-gray-500">{doc.type}:</span>
                <span className="text-slate-800 ml-2">
                  {doc.file ? doc.file.name : 'Not uploaded'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Essay Preview */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-slate-800 font-medium mb-3">Personal Statement</h4>
          <p className="text-slate-800 whitespace-pre-wrap">{formData.essay}</p>
        </div>
      </div>
    </div>
  );
} 