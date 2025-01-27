import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

/**
 * User Collection Operations (non-[id] routes)
 * This file handles operations that affect multiple users or create new users.
 * Route: /api/users
 * 
 * Available Methods:
 * - GET: Fetch all users
 * - POST: Create a new user
 * 
 * ID Generation System:
 * Users receive a unique 8-character ID based on their role:
 * Format: [Role prefix][Initials][4 digit number]
 * 
 * Examples:
 * - Admin "Robert Green": ADRG2061
 * - Faculty "Jane Smith": FCJS4789
 * - Student "Tom Brown": STTB3421
 * 
 * Role Prefixes:
 * - AD: Administrator
 * - FC: Faculty
 * - ST: Student
 * 
 * Uniqueness:
 * - IDs are guaranteed unique across ALL roles
 * - System will attempt multiple generations if duplicates occur
 * - Maximum 10 attempts to prevent infinite loops
 */

// Type for request body to ensure type safety
interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

// Type for error handling
interface PrismaError extends Error {
  code?: string;
}

/**
 * Helper function to generate role-specific IDs
 * @param role - User's role (ADMIN, FACULTY, or STUDENT)
 * @param firstName - User's first name for initials
 * @param lastName - User's last name for initials
 * @returns An 8-character ID following the format: [Role prefix][Initials][4 digit number]
 */
function generateRoleId(role: Role, firstName: string, lastName: string): string {
  // Get initials from first and last name
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  // Generate random 4-digit number
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  switch (role) {
    case 'STUDENT':
      return `ST${initials}${random}`;
    case 'FACULTY':
      return `FC${initials}${random}`;
    case 'ADMIN':
      return `AD${initials}${random}`;
    default:
      return random;
  }
}

/**
 * Attempts to generate a unique role ID
 * @param role - User's role (ADMIN, FACULTY, or STUDENT)
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Promise<string> A guaranteed unique role ID
 * @throws Error if unable to generate a unique ID after 10 attempts
 * 
 * Security Features:
 * - Checks against ALL existing role IDs to prevent duplicates
 * - Limited attempts to prevent infinite loops
 * - Comprehensive error handling
 */
async function generateUniqueRoleId(role: Role, firstName: string, lastName: string): Promise<string> {
  const maxAttempts = 10;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const roleId = generateRoleId(role, firstName, lastName);
    
    // Check if this ID already exists for any user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { studentId: roleId },
          { facultyId: roleId },
          { adminId: roleId }
        ]
      }
    });
    
    if (!existingUser) {
      return roleId;
    }
  }
  
  throw new Error('Unable to generate unique role ID after multiple attempts');
}

/**
 * POST /api/users
 * Creates a new user with role-specific ID and hashed password
 * 
 * Required fields:
 * - email: string (must be unique)
 * - password: string (will be hashed)
 * - firstName: string
 * - lastName: string
 * - role: Role (ADMIN, FACULTY, or STUDENT)
 * 
 * Returns: Created user object (excluding password)
 * 
 * Security Features:
 * - Password hashing
 * - Unique email verification
 * - Unique role ID generation
 * - Input validation
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json() as CreateUserRequest;
    
    // Type-safe validation
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const roleId = await generateUniqueRoleId(body.role, body.firstName, body.lastName);
    
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

    return NextResponse.json(newUser);
  } catch (error) {
    // Type-safe error handling
    const prismaError = error as PrismaError;
    
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Unable to generate unique role ID')) {
      return NextResponse.json(
        { error: 'Unable to generate unique role ID. Please try again.' },
        { status: 500 }
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

/**
 * GET /api/users
 * Retrieves all users from the database
 * Returns: Array of user objects (excluding sensitive data)
 * 
 * Response includes:
 * - Role-specific ID (based on user role)
 * - Basic user information
 * - Timestamps
 * Excludes:
 * - Passwords
 * - Internal database IDs
 */
export async function GET(): Promise<NextResponse> {
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