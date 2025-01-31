import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ReportType } from '@prisma/client';

/**
 * Report System API
 * Handles CRUD operations for system reports and analytics
 */

// Helper: Generates enrollment statistics data
function generateEnrollmentData() {
  return {
    totalStudents: Math.floor(Math.random() * 1000) + 500,
    byDepartment: {
      'Computer Science': Math.floor(Math.random() * 200) + 100,
      'Mathematics': Math.floor(Math.random() * 150) + 80,
      'Physics': Math.floor(Math.random() * 100) + 50,
      'Biology': Math.floor(Math.random() * 120) + 60,
      'Chemistry': Math.floor(Math.random() * 110) + 70,
    },
    trends: {
      previousYear: Math.floor(Math.random() * 900) + 400,
      currentYear: Math.floor(Math.random() * 1000) + 500,
      percentageChange: ((Math.random() * 20) - 10).toFixed(1),
    }
  };
}

// Helper: Generates academic performance data
function generateAcademicPerformanceData() {
  return {
    averageGPA: (Math.random() * 1 + 3).toFixed(2),
    performanceBands: {
      'A': Math.floor(Math.random() * 30) + 10,
      'B': Math.floor(Math.random() * 40) + 20,
      'C': Math.floor(Math.random() * 30) + 15,
      'D': Math.floor(Math.random() * 20) + 5,
      'F': Math.floor(Math.random() * 10) + 1,
    },
    courseSuccess: {
      passRate: Math.floor(Math.random() * 20 + 80),
      failRate: Math.floor(Math.random() * 20),
    }
  };
}

/**
 * GET /api/reports
 * Fetches reports with optional type and period filters
 * @query type - ReportType enum value
 * @query period - Time period (e.g., "2024-Q1")
 * @returns Array of reports with creator information
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const period = searchParams.get('period');

    const reports = await prisma.report.findMany({
      where: {
        ...(type && { type: type as ReportType }),
        ...(period && { period }),
      },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reports
 * Generates a new report with dummy data
 * @body {
 *   title: string,
 *   type: ReportType,
 *   period: string,
 *   userId: string
 * }
 * @returns Newly created report
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate dummy report data based on type
    let reportData;
    switch (data.type) {
      case 'ENROLLMENT_SUMMARY':
        reportData = generateEnrollmentData();
        break;
      case 'ACADEMIC_PERFORMANCE':
        reportData = generateAcademicPerformanceData();
        break;
      default:
        reportData = {};
    }

    const report = await prisma.report.create({
      data: {
        title: data.title,
        type: data.type,
        period: data.period,
        data: reportData,
        userId: data.userId,
        status: 'GENERATED',
      },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/reports
 * Deletes a specific report
 * @query id - Report ID to delete
 * @returns 204 No Content on success
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('id');

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    await prisma.report.delete({
      where: { id: reportId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    );
  }
} 