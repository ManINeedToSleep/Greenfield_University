import React from 'react';
import { FormData } from '@/types/application';

interface PersonalInfoFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function PersonalInfoForm({ formData, handleInputChange }: PersonalInfoFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-800">Application Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
          required
        >
          <option value="UNDERGRADUATE">Undergraduate</option>
          <option value="GRADUATE">Graduate</option>
          <option value="TRANSFER">Transfer</option>
          <option value="INTERNATIONAL">International</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">Start Term</label>
        <select
          name="startTerm"
          value={formData.startTerm}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
          required
        >
          <option value="">Select a term</option>
          <option value="Fall 2024">Fall 2024</option>
          <option value="Spring 2025">Spring 2025</option>
          <option value="Fall 2025">Fall 2025</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
          required
        />
      </div>
    </div>
  );
} 