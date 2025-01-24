"use client";

import React from "react";
import DashboardHeader from "@/components/DashboardHeader";

export default function StudentDashboard() {
  return (
    <div>
      <DashboardHeader 
        title="Student Dashboard"
        role="STUDENT"
        userName="Student User"
        currentPath="/portal/student/dashboard"
      />
      {/* Student dashboard content */}
    </div>
  );
}
