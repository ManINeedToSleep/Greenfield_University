import { NextResponse } from 'next/server'

/**
 * Configuration constants
 */
const COOKIE_NAME = 'auth_token'
const REDIRECT_URL = '/portal' // URL to redirect after logout

/**
 * POST /api/auth/logout
 * 
 * Handles user logout by clearing authentication cookie
 * and redirecting to the portal page
 * 
 * @returns
 * - 200: { message: string, redirect: string } - Logout successful
 * - 500: { error: string } - Server error
 * 
 * On successful logout:
 * - Clears auth cookie
 * - Returns redirect URL
 */
export async function POST() {
  try {
    const response = NextResponse.json({
      message: 'Logged out successfully',
      redirect: REDIRECT_URL
    });
    
    response.cookies.delete(COOKIE_NAME);
    return response;
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/auth/logout
 * 
 * Alternative endpoint for logout through GET request
 * Useful for logout links and browser navigation
 */
export async function GET() {
  return POST()
} 