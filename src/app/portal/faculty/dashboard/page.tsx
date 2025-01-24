"use client";

import React from "react";
import DashboardHeader from "@/components/DashboardHeader";

export default function FacultyDashboard() {
  return (
    <div>
      <DashboardHeader 
        title="Faculty Dashboard"
        role="FACULTY"
        userName="Faculty User"
        currentPath="/portal/faculty/dashboard"
      />
      {/* Your dashboard content */}
    </div>
  );
}
