import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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
    
    const userData = {
      email: body.email,
      password: hashedPassword,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role,
      isActive: true,
      studentId: body.role === 'STUDENT' ? body.studentId : null,
      facultyId: body.role === 'FACULTY' ? body.facultyId : null,
      adminId: body.role === 'ADMIN' ? body.adminId : null,
    };

    console.log('Creating user with data:', { ...userData, password: '[HIDDEN]' });

    const newUser = await prisma.user.create({
      data: userData
    });

    console.log('User created successfully:', { id: newUser.id, email: newUser.email });

    const { password: _password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
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