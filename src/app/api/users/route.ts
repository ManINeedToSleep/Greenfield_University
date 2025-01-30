import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'FACULTY' | 'STUDENT';
  isActive: boolean;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate roleId
    const currentYear = new Date().getFullYear();
    
    // Get role prefix (ST for STUDENT, FA for FACULTY, AD for ADMIN)
    const rolePrefix = data.role.substring(0, 2).toUpperCase();
    
    // Get initials from first and last name
    const firstInitial = data.firstName.charAt(0).toUpperCase();
    const lastInitial = data.lastName.charAt(0).toUpperCase();
    
    // Get count of users with same role for this year
    const userCount = await prisma.user.count({
      where: {
        role: data.role,
        roleId: {
          startsWith: `${rolePrefix}${firstInitial}${lastInitial}${currentYear}`
        }
      }
    });

    // Format the counter with leading zeros (3 digits)
    const counterString = String(userCount + 1).padStart(3, '0');
    
    // Construct the roleId: e.g., "STSS2025002"
    const roleId = `${rolePrefix}${firstInitial}${lastInitial}${currentYear}${counterString}`;

    // Create user with generated roleId
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        roleId: roleId,
        isActive: data.isActive
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        roleId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true,
        roleId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Don't remove passwords this time since we need them
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const userId = data.id;

    // Prepare update data with proper typing
    const updateData: UpdateUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
    };

    // Only update password if it's provided and not empty
    if (data.password && data.password.trim() !== '') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        roleId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 