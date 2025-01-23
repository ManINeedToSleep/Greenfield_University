import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || user.role !== role) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password (assuming passwords are hashed)
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return user data (exclude password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userData } = user
    return NextResponse.json(userData)

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 