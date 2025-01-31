import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

let counters = {
  ADMIN: 1,
  FACULTY: 1,
  STUDENT: 1
};

// Helper function to generate roleId
function generateRoleId(role, firstName, lastName) {
  const year = new Date().getFullYear();
  const rolePrefix = role.substring(0, 2).toUpperCase();
  const counter = counters[role]++;
  return `${rolePrefix}${firstName[0]}${lastName[0]}${year}${counter.toString().padStart(3, '0')}`;
}

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.grade.deleteMany({}),
    prisma.submission.deleteMany({}),
    prisma.assignment.deleteMany({}),
    prisma.announcement.deleteMany({}),
    prisma.event.deleteMany({}),
    prisma.schedule.deleteMany({}),
    prisma.course.deleteMany({}),
    prisma.user.deleteMany({}),
    prisma.calendar.deleteMany({}),
  ]);

  const password = await bcrypt.hash('password123', 10);

  // Create Admin Accounts
  const adminAccounts = [
    {
      email: 'admin@school.edu',
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN'
    },
    {
      email: 'registrar@school.edu',
      firstName: 'Academic',
      lastName: 'Registrar',
      role: 'ADMIN'
    }
  ];

  const admins = await Promise.all(
    adminAccounts.map(async (admin) => {
      const calendar = await prisma.calendar.create({ data: {} });
      return prisma.user.create({
        data: {
          ...admin,
          password,
          roleId: generateRoleId(admin.role, admin.firstName, admin.lastName),
          calendarId: calendar.id,
        },
      });
    })
  );

  // Create Faculty Accounts with their respective departments
  const facultyAccounts = [
    {
      email: 'math.prof@school.edu',
      firstName: 'Robert',
      lastName: 'Thompson',
      department: 'Mathematics'
    },
    {
      email: 'physics.prof@school.edu',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      department: 'Physics'
    },
    {
      email: 'cs.prof@school.edu',
      firstName: 'James',
      lastName: 'Wilson',
      department: 'Computer Science'
    },
    {
      email: 'biology.prof@school.edu',
      firstName: 'Sarah',
      lastName: 'Chen',
      department: 'Biology'
    },
    {
      email: 'chemistry.prof@school.edu',
      firstName: 'David',
      lastName: 'Kumar',
      department: 'Chemistry'
    }
  ];

  const faculty = await Promise.all(
    facultyAccounts.map(async (faculty) => {
      const calendar = await prisma.calendar.create({ data: {} });
      return prisma.user.create({
        data: {
          email: faculty.email,
          password,
          firstName: faculty.firstName,
          lastName: faculty.lastName,
          role: 'FACULTY',
          roleId: generateRoleId('FACULTY', faculty.firstName, faculty.lastName),
          calendarId: calendar.id,
        },
      });
    })
  );

  // Create Student Accounts
  const studentAccounts = [
    {
      email: 'emma.davis@student.edu',
      firstName: 'Emma',
      lastName: 'Davis',
      year: '1st'
    },
    {
      email: 'alex.wang@student.edu',
      firstName: 'Alex',
      lastName: 'Wang',
      year: '2nd'
    },
    {
      email: 'sophia.patel@student.edu',
      firstName: 'Sophia',
      lastName: 'Patel',
      year: '1st'
    },
    {
      email: 'marcus.brown@student.edu',
      firstName: 'Marcus',
      lastName: 'Brown',
      year: '3rd'
    },
    {
      email: 'isabella.garcia@student.edu',
      firstName: 'Isabella',
      lastName: 'Garcia',
      year: '2nd'
    }
  ];

  const students = await Promise.all(
    studentAccounts.map(async (student) => {
      const calendar = await prisma.calendar.create({ data: {} });
      return prisma.user.create({
        data: {
          email: student.email,
          password,
          firstName: student.firstName,
          lastName: student.lastName,
          role: 'STUDENT',
          roleId: generateRoleId('STUDENT', student.firstName, student.lastName),
          calendarId: calendar.id,
        },
      });
    })
  );

  // Create Courses with real course codes and descriptions
  const courses = [
    {
      code: 'MATH201',
      name: 'Calculus I',
      description: 'Introduction to differential and integral calculus of functions of one variable.',
      instructorId: faculty[0].id // Math professor
    },
    {
      code: 'PHYS101',
      name: 'Introduction to Physics',
      description: 'Fundamental concepts of physics including mechanics, waves, and thermodynamics.',
      instructorId: faculty[1].id // Physics professor
    },
    {
      code: 'CS150',
      name: 'Programming Fundamentals',
      description: 'Introduction to programming concepts using Python, including data structures and algorithms.',
      instructorId: faculty[2].id // CS professor
    },
    {
      code: 'BIO101',
      name: 'General Biology',
      description: 'Basic principles of biology including cell structure, genetics, and evolution.',
      instructorId: faculty[3].id // Biology professor
    },
    {
      code: 'CHEM201',
      name: 'Organic Chemistry',
      description: 'Study of structure, properties, and reactions of organic compounds.',
      instructorId: faculty[4].id // Chemistry professor
    }
  ];

  // Create courses and their schedules
  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: {
        ...courseData,
        students: {
          connect: students.slice(0, 3).map(student => ({ id: student.id })) // Enroll first 3 students in each course
        }
      }
    });

    // Create schedule for each course
    await prisma.schedule.create({
      data: {
        courseId: course.id,
        dayOfWeek: 'MONDAY',
        startTime: new Date('2024-01-01T09:00:00'),
        endTime: new Date('2024-01-01T10:30:00'),
        room: `Room ${Math.floor(Math.random() * 500) + 100}` // Random room number between 100-599
      }
    });

    // Create sample assignment for each course
    const assignment = await prisma.assignment.create({
      data: {
        title: `${courseData.code} Midterm Project`,
        description: `Complete the midterm project for ${courseData.name}`,
        dueDate: new Date('2024-12-31'),
        courseId: course.id
      }
    });

    // Create sample announcement for each course
    await prisma.announcement.create({
      data: {
        title: `Welcome to ${courseData.code}`,
        content: `Welcome to ${courseData.name}! Please review the syllabus and course materials.`,
        courseId: course.id,
        authorId: courseData.instructorId
      }
    });
  }

  console.log('Seed data created successfully!');
  console.log('\nTest Account Credentials:');
  console.log('-------------------------');
  console.log('Admin Email: admin@school.edu');
  console.log('Faculty Emails:');
  facultyAccounts.forEach(f => console.log(`- ${f.email} (${f.department})`));
  console.log('\nStudent Emails:');
  studentAccounts.forEach(s => console.log(`- ${s.email} (${s.year} year)`));
  console.log('\nPassword for all accounts: password123');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 