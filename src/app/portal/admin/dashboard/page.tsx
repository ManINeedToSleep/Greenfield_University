"use client";

import React, { useState } from "react";
import { FaUsers, FaFileAlt } from "react-icons/fa";
import DashboardHeader from "@/components/DashboardHeader";
import {FaGraduationCap, FaChalkboardTeacher, FaCalendarAlt, FaChartLine, FaExclamationTriangle } from "react-icons/fa";

interface SystemMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
}

export default function AdminDashboard() {
  const [metrics] = useState<SystemMetric[]>([
    { label: "Total Students", value: 4521, change: 12, trend: 'up' },
    { label: "Active Faculty", value: 247, change: 3, trend: 'up' },
    { label: "Course Success Rate", value: "94%", change: 2, trend: 'up' },
    { label: "System Uptime", value: "99.9%", change: 0.1, trend: 'down' },
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: "System maintenance scheduled for tonight", time: "1 hour ago" },
    { id: 2, type: 'critical', message: "3 failed login attempts detected", time: "30 mins ago" },
    { id: 3, type: 'info', message: "New faculty onboarding pending approval", time: "15 mins ago" },
  ]);

  const [quickActions] = useState([
    { id: 1, label: "Approve New Users", icon: FaUsers, count: 5 },
    { id: 2, label: "Pending Reports", icon: FaFileAlt, count: 3 },
    { id: 3, label: "System Alerts", icon: FaExclamationTriangle, count: 2 },
  ]);

  return (
    <div className="bg-emerald-50 min-h-screen">
      <DashboardHeader 
        role="ADMIN" 
        userName="John Doe" 
        currentPath="/portal/admin/dashboard"
        title="Admin Dashboard"
      />

      {/* Quick Actions Bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-3 px-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="flex items-center px-4 py-2 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <action.icon className="text-emerald-600 mr-2" />
                  <span className="text-gray-800">{action.label}</span>
                  {action.count > 0 && (
                    <span className="ml-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs">
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-700 text-sm mb-2">{metric.label}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-emerald-900">
                  {metric.value}
                </span>
                <span className={`flex items-center ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '↑' : '↓'} {metric.change}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Critical Alerts Section */}
          <section className="col-span-1 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center">
              <FaExclamationTriangle className="mr-2 text-amber-500" />
              Critical Alerts
            </h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg ${
                    alert.type === 'critical' 
                      ? 'bg-red-50 text-red-700' 
                      : alert.type === 'warning'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">{alert.time}</p>
                </div>
              ))}
            </div>
          </section>

          {/* System Performance */}
          <section className="col-span-1 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center">
              <FaChartLine className="mr-2" />
              System Performance
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="text-gray-800">CPU Usage</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-emerald-800">45%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="text-gray-800">Memory</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <span className="text-emerald-800">72%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="text-gray-800">Storage</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-emerald-800">60%</span>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="col-span-1 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-emerald-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                <FaGraduationCap className="text-emerald-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">New Student Registration</p>
                  <p className="text-sm text-gray-700">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                <FaChalkboardTeacher className="text-emerald-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Faculty Meeting Scheduled</p>
                  <p className="text-sm text-gray-700">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                <FaCalendarAlt className="text-emerald-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Exam Schedule Updated</p>
                  <p className="text-sm text-gray-700">2 hours ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 