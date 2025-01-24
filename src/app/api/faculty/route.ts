import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const faculty = await prisma.user.findMany({
      where: {
        role: 'FACULTY',
        isActive: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        facultyId: true
      }
    });
    
    return NextResponse.json(faculty);
  } catch (error) {
    console.error('Failed to fetch faculty:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculty members' },
      { status: 500 }
    );
  }
} 