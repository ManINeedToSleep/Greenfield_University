"use client";

import React, { useState, useEffect } from "react";
import { FaDownload, FaTrash, FaPlus } from "react-icons/fa";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ReportType } from "@prisma/client";

/**
 * Report interface defining the structure of report data
 */
interface Report {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  status: string;
  data: Record<string, unknown>;
  createdAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

/**
 * ReportSystems Component
 * 
 * Admin dashboard page for generating and managing system reports.
 * Provides functionality to:
 * - Generate new reports with different types (enrollment, performance, etc.)
 * - View existing reports
 * - Download report data
 * - Delete reports
 */
export default function ReportSystems() {
  // State for managing reports list and UI state
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  /**
   * Fetches reports from the API based on selected filters
   * Memoized to prevent unnecessary re-renders
   */
  const fetchReports = React.useCallback(async () => {
    try {
      let url = '/api/reports';
      const params = new URLSearchParams();
      if (selectedType) params.append('type', selectedType);
      if (selectedPeriod) params.append('period', selectedPeriod);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedType, selectedPeriod]);

  // Fetch reports when filters change
  useEffect(() => {
    void fetchReports();
  }, [fetchReports]);

  /**
   * Generates a new report based on selected type and period
   * Uses the first admin user found as the report creator
   */
  const handleGenerateReport = async () => {
    try {
      // First get the admin user
      const adminResponse = await fetch('/api/users?role=ADMIN');
      const adminUsers = await adminResponse.json();
      const adminId = adminUsers[0]?.id;

      if (!adminId) {
        throw new Error('No admin user found');
      }

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${selectedType} Report - ${selectedPeriod}`,
          type: selectedType,
          period: selectedPeriod,
          userId: adminId,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const newReport = await response.json();
      setReports(prev => [newReport, ...prev]);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report');
    }
  };

  /**
   * Deletes a report by ID after confirmation
   */
  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      const response = await fetch(`/api/reports?id=${reportId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReports(reports.filter(report => report.id !== reportId));
      } else {
        throw new Error('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report');
    }
  };

  /**
   * Downloads report data as a JSON file
   */
  const downloadReport = (report: Report) => {
    const dataStr = JSON.stringify(report.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <DashboardHeader 
        title="Report Systems"
        role="ADMIN"
        userName="Admin User"
        currentPath="/portal/admin/report-systems"
      />

      <div className="container mx-auto p-6">
        {/* Report Generation Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select Report Type</option>
              <option value="ENROLLMENT_SUMMARY">Enrollment Summary</option>
              <option value="ACADEMIC_PERFORMANCE">Academic Performance</option>
              <option value="ATTENDANCE_SUMMARY">Attendance Summary</option>
              <option value="FACULTY_WORKLOAD">Faculty Workload</option>
              <option value="COURSE_ANALYTICS">Course Analytics</option>
              <option value="SYSTEM_USAGE">System Usage</option>
            </select>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select Period</option>
              <option value="2024-Q1">2024 Q1</option>
              <option value="2024-Q2">2024 Q2</option>
              <option value="2024-Q3">2024 Q3</option>
              <option value="2024-Q4">2024 Q4</option>
            </select>

            <button
              onClick={handleGenerateReport}
              disabled={!selectedType || !selectedPeriod}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:bg-gray-400"
            >
              <FaPlus />
              Generate Report
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading reports...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-emerald-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Generated By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800">{report.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800">{report.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800">{report.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800">
                        {`${report.createdBy.firstName} ${report.createdBy.lastName}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => downloadReport(report)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Download Report"
                          >
                            <FaDownload />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Report"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 