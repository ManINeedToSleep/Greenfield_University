import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Parse incoming request data
    const data = await request.json();
    console.log('Received application data:', data); // Debug log

    // Basic validation for required fields
    if (!data.type || !data.firstName || !data.lastName || !data.email) {
      console.log('Missing required fields:', { 
        type: data.type, 
        firstName: data.firstName, 
        lastName: data.lastName, 
        email: data.email 
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Create new application record in database
      const application = await prisma.application.create({
        data: {
          // Basic Information
          type: data.type,
          status: 'DRAFT', // Initial status
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          
          // Optional fields with fallbacks
          phoneNumber: data.phoneNumber || '',
          dateOfBirth: new Date(data.dateOfBirth || new Date()),
          address: data.address || '',
          city: data.city || '',
          state: data.state || null,
          country: data.country || '',
          postalCode: data.postalCode || '',
          
          // Academic Information
          previousSchools: data.previousSchools || [], // JSON field for school history
          gpa: data.gpa ? parseFloat(data.gpa) : null,
          
          // Test Scores - convert strings to numbers if present
          satScore: data.satScore ? parseInt(data.satScore) : null,
          actScore: data.actScore ? parseInt(data.actScore) : null,
          toeflScore: data.toeflScore ? parseInt(data.toeflScore) : null,
          ieltsScore: data.ieltsScore ? parseFloat(data.ieltsScore) : null,
          
          // Program Information
          intendedMajor: data.intendedMajor || '',
          startTerm: data.startTerm || '',
          essay: data.essay || '',
        },
      });

      console.log('Created application:', application);
      return NextResponse.json(application, { status: 201 });
    } catch (prismaError) {
      // Handle database-specific errors
      console.error('Prisma error:', prismaError);
      return NextResponse.json(
        { error: 'Database error: ' + (prismaError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    // Handle general errors (like JSON parsing)
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Extract email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Validate email parameter
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Fetch all applications for the given email
    const applications = await prisma.application.findMany({
      where: {
        email: email,
      },
      orderBy: {
        createdAt: 'desc', // Most recent first
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    // Handle any errors during fetch
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
} 