import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

function generateRoleId(role: Role, firstName: string, lastName: string) {
  const year = new Date().getFullYear().toString().slice(-2);
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  switch (role) {
    case 'STUDENT':
      return `ST${year}${random}`;
    case 'FACULTY':
      return `FC${initials}${random}`;
    case 'ADMIN':
      return `AD${initials}${random}`;
    default:
      return random;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    // Validate required fields
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    // Generate role-specific ID
    const roleId = generateRoleId(body.role, body.firstName, body.lastName);
    
    // Create user with role-specific ID
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.role,
        ...(body.role === 'STUDENT' && { studentId: roleId }),
        ...(body.role === 'FACULTY' && { facultyId: roleId }),
        ...(body.role === 'ADMIN' && { adminId: roleId }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        studentId: true,
        facultyId: true,
        adminId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log('User created successfully:', { id: newUser.id, email: newUser.email });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Type guard for Prisma error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to create user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        studentId: true,
        facultyId: true,
        adminId: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}