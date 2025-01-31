# Greenfield University Portal

A comprehensive university management system built with Next.js, Prisma, and PostgreSQL. This application serves as a central hub for students, faculty, and administrators to manage academic activities and institutional operations.

## 🎓 Features

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

### Public Pages
- University information
- Admission details
- Campus tour scheduling
- Open house information
- Contact forms

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Hosting**: Vercel

## 📦 Installation

1. Clone the repository:

bash
git clone [[repository-url](https://github.com/ManINeedToSleep/Greenfield_University)]
cd greenfield-university

2. Install dependencies:

bash
npm install

3. Set up environment variables:
Create a `.env` file in the root directory with the following:

DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"

4. Set up the database:

bash
npx prisma generate
npx prisma db push

5. Seed the database:

bash
npm run seed

6. Run the development server:

bash
npm run dev

## 🔑 Test Accounts

After seeding the database, you can use these test accounts:

```
Admin:
- Email: admin@school.edu
- Password: password123

Faculty:
- Email: faculty@school.edu
- Password: password123

Students:
- Email: student1@school.edu
- Password: password123
- Email: student2@school.edu
- Password: password123
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── portal/            # Protected routes
│   └── ...                # Public pages
├── components/            # Reusable components
├── lib/                   # Utility functions
└── styles/               # Global styles
prisma/
├── schema.prisma         # Database schema
└── seed.mjs             # Seed script
public/                  # Static assets
```

## 🔐 Security

- HTTP-only cookies for JWT storage
- Password hashing with bcrypt
- Role-based access control
- Protected API routes

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

