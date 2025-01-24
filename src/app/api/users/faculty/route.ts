import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const facultyMembers = await prisma.user.findMany({
      where: {
        role: 'FACULTY',
        isActive: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        facultyId: true,
        teaching: {
          select: {
            id: true,
            name: true,
            code: true
          }
        }
      },
      orderBy: {
        firstName: 'asc'
      }
    });

    return NextResponse.json(facultyMembers);
  } catch (error) {
    console.error('Failed to fetch faculty:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculty members' },
      { status: 500 }
    );
  }
} 