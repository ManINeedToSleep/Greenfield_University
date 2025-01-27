import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

/**
 * Single User Operations ([id] routes)
 * This file handles operations for individual users, identified by their ID.
 * Route: /api/users/[id]
 * 
 * Available Methods:
 * - GET: Fetch a single user
 * - DELETE: Remove a single user
 */

/**
 * GET /api/users/[id]
 * Retrieves a specific user by their ID
 * Returns: User object with sensitive fields excluded
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    // Select specific fields to return, excluding sensitive data like password
    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Transform the response to show role-specific ID
    const transformedUser = {
      ...user,
      // Replace the 'id' field with the appropriate role-specific ID
      id: user.role === 'ADMIN' ? user.adminId : 
          user.role === 'FACULTY' ? user.facultyId : 
          user.studentId,
      // Remove the role-specific ID fields since we're using one as the main ID
      studentId: undefined,
      facultyId: undefined,
      adminId: undefined
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Removes a specific user from the database
 * Returns: Success message or error
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}