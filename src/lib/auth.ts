import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      role?: string;
    }
  }
  interface User {
    id: string;
    email: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    email?: string | null;
  }
}

export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
        roleId: { label: "Role ID", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role || !credentials?.roleId) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email,
          }
        });

        if (!user) {
          return null;
        }

        // Verify password
        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          return null;
        }

        // Verify role
        if (user.role !== credentials.role) {
          return null;
        }

        // Verify role-specific ID
        const roleIdMatch = 
          (credentials.role === 'ADMIN' && user.adminId === credentials.roleId) ||
          (credentials.role === 'FACULTY' && user.facultyId === credentials.roleId) ||
          (credentials.role === 'STUDENT' && user.studentId === credentials.roleId);

        if (!roleIdMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/portal/login',
  }
} satisfies NextAuthOptions;

export const { auth } = NextAuth(config); 