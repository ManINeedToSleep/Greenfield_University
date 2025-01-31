# Greenfield University Portal

A comprehensive university management system built with Next.js, Prisma, and PostgreSQL. This application serves as a central hub for students, faculty, and administrators to manage academic activities and institutional operations.

## 🎓 Features

### Application Management
- Multi-step application process for different student types:
  - Undergraduate
  - Graduate
  - Transfer
  - International
- Document upload and management
- Application status tracking
- Automated email notifications

### User Management
- Role-based authentication (Student, Faculty, Admin)
- Secure login system with JWT
- User profile management

### Academic Management
- Course enrollment and management
- Assignment submission and grading
- Schedule management
- Calendar system for events and deadlines

### Administrative Tools
- User management dashboard
- System-wide announcements
- Performance monitoring
- Activity tracking
- Report generation system

## 🛠 Tech Stack

- **Frontend**: 
  - Next.js 14 with App Router
  - TailwindCSS for styling
  - Framer Motion for animations
  - React Hook Form for form management

- **Backend**: 
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Neon)
  - JWT Authentication

- **Development**:
  - TypeScript
  - ESLint
  - Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── applications/  # Application management
│   │   ├── auth/         # Authentication
│   │   ├── courses/      # Course management
│   │   └── users/        # User management
│   ├── apply/            # Application pages
│   │   ├── undergraduate/
│   │   ├── graduate/
│   │   ├── transfer/
│   │   └── international/
│   └── portal/           # Protected routes
│       ├── admin/        # Admin dashboard
│       ├── faculty/      # Faculty portal
│       └── student/      # Student portal
├── components/           # Reusable components
│   ├── forms/           # Form components
│   ├── dashboard/       # Dashboard components
│   └── ui/             # UI components
├── lib/                 # Utility functions
│   ├── prisma.ts       # Prisma client
│   └── auth.ts         # Authentication utilities
└── types/              # TypeScript types
prisma/
├── schema.prisma       # Database schema
├── migrations/        # Database migrations
└── seed.mjs          # Seed script
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/greenfield-university.git
cd greenfield-university
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

## 🔐 Authentication

The system uses JWT-based authentication with HTTP-only cookies. Different user roles (ADMIN, FACULTY, STUDENT) have access to different parts of the application.

### Test Accounts
```
Admin:
- Email: admin@school.edu
- Password: password123

Faculty:
- Email: faculty@school.edu
- Password: password123

Student:
- Email: student@school.edu
- Password: password123
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

