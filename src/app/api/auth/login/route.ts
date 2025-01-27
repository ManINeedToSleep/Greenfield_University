import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

/**
 * Configuration constants for authentication
 */
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const COOKIE_NAME = 'auth_token'

/**
 * POST /api/auth/login
 * 
 * Handles user authentication and login
 * 
 * @expects JSON body with:
 * - email: string - User's email address
 * - password: string - User's password
 * - role: 'STUDENT' | 'FACULTY' | 'ADMIN' - User's role
 * 
 * @returns
 * - 200: { message: string, user: UserData } - Login successful
 * - 400: { error: string } - Missing required fields
 * - 401: { error: string } - Invalid credentials (email/password/role)
 * - 403: { error: string } - Account deactivated
 * - 500: { error: string } - Server error
 * 
 * On successful login:
 * - Sets HTTP-only cookie with JWT token
 * - Returns user data (excluding sensitive information)
 */
export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    // Input validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find user and include role-specific relations
    const user = await prisma.user.findUnique({
      where: { email },
      include: role === 'STUDENT'
        ? {
            enrolledCourses: true,  // Match schema relation name
          }
        : role === 'FACULTY'
        ? {
            teachingCourses: true,  // Match schema relation name
          }
        : undefined,
    })

    // Security checks
    if (!user) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 401 }
      )
    }

    if (user.role !== role) {
      return NextResponse.json(
        { error: 'Invalid role for this account' },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      )
    }

    // Generate JWT token with user information
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Remove sensitive data before sending response
    const {
      password: _,
      ...userData
    } = user

    // Create response with cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: userData,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 