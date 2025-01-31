"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import AcademicInfoForm from '@/components/forms/AcademicInfoForm';
import DocumentsForm from '@/components/forms/DocumentsForm';
import ReviewForm from '@/components/forms/ReviewForm';
import { FormData } from '@/types/application';

export default function ApplicationForm() {
  const router = useRouter();
  // Track current step of the multi-step form
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize form data with default values
  const [formData, setFormData] = useState<FormData>({
    type: 'UNDERGRADUATE', // Default application type
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    intendedMajor: '',
    startTerm: '',
    gpa: '',
    satScore: '',
    actScore: '',
    toeflScore: '',
    ieltsScore: '',
    // Initialize with one empty school entry
    previousSchools: [{
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      degree: '',
    }],
    // Initialize required document types
    documents: [
      { type: 'transcript', status: 'pending' },
      { type: 'recommendation', status: 'pending' },
      { type: 'identification', status: 'pending' },
    ],
    essay: '',
  });

  // Generic handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send application data to the server
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Handle server-side validation errors
      if (!response.ok) {
        alert(data.error || 'Failed to submit application');
        return;
      }

      // Redirect to success page on successful submission
      if (response.ok) {
        router.push('/apply/application/success');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  // Render different form components based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <AcademicInfoForm formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />;
      case 3:
        return <DocumentsForm formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />;
      case 4:
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
            Application Form
          </h1>

          {/* Progress indicator for multi-step form */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {['Personal Info', 'Academic Info', 'Documents', 'Review'].map((step, index) => (
                <div
                  key={step}
                  className={`flex-1 text-center ${
                    index + 1 === currentStep ? 'text-emerald-600 font-bold' : 'text-gray-500'
                  }`}
                >
                  {/* Step number circle */}
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                      index + 1 === currentStep
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {/* Show Previous button if not on first step */}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              {/* Show Next button if not on last step, otherwise show Submit */}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 