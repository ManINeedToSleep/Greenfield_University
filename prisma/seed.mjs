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

  // Create sample applications
  const sampleApplications = [
    {
      // Undergraduate Application
      type: 'UNDERGRADUATE',
      status: 'SUBMITTED',
      submittedAt: new Date('2024-01-15'),
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phoneNumber: '123-456-7890',
      dateOfBirth: new Date('2006-05-15'),
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
      postalCode: '62701',
      previousSchools: [
        {
          name: 'Springfield High School',
          location: 'Springfield, IL',
          startDate: '2020-09-01',
          endDate: '2024-05-30'
        }
      ],
      gpa: 3.8,
      satScore: 1400,
      actScore: 30,
      intendedMajor: 'Computer Science',
      startTerm: 'Fall 2024',
      essay: 'I am passionate about technology and its impact on society...',
    },
    {
      // Graduate Application
      type: 'GRADUATE',
      status: 'UNDER_REVIEW',
      submittedAt: new Date('2024-01-20'),
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@email.com',
      phoneNumber: '234-567-8901',
      dateOfBirth: new Date('1999-08-22'),
      address: '456 Oak Ave',
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      postalCode: '02108',
      previousSchools: [
        {
          name: 'Boston University',
          location: 'Boston, MA',
          startDate: '2019-09-01',
          endDate: '2023-05-30',
          degree: 'Bachelor of Science in Biology'
        }
      ],
      gpa: 3.9,
      intendedMajor: 'Biotechnology',
      startTerm: 'Fall 2024',
      essay: 'My research experience in molecular biology has prepared me...',
    },
    {
      // Transfer Application
      type: 'TRANSFER',
      status: 'SUBMITTED',
      submittedAt: new Date('2024-01-25'),
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phoneNumber: '345-678-9012',
      dateOfBirth: new Date('2003-03-10'),
      address: '789 Pine St',
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      postalCode: '95110',
      previousSchools: [
        {
          name: 'San Jose City College',
          location: 'San Jose, CA',
          startDate: '2022-09-01',
          endDate: '2024-05-30',
          degree: 'Associate in Computer Science'
        }
      ],
      gpa: 3.7,
      intendedMajor: 'Software Engineering',
      startTerm: 'Spring 2025',
      essay: 'My experience at community college has strengthened my desire...',
    },
    {
      // International Application
      type: 'INTERNATIONAL',
      status: 'SUBMITTED',
      submittedAt: new Date('2024-01-30'),
      firstName: 'Sofia',
      lastName: 'Martinez',
      email: 'sofia.martinez@email.com',
      phoneNumber: '+34 612 345 678',
      dateOfBirth: new Date('2005-11-28'),
      address: 'Calle Mayor 123',
      city: 'Madrid',
      state: null,
      country: 'Spain',
      postalCode: '28013',
      previousSchools: [
        {
          name: 'Instituto San Isidro',
          location: 'Madrid, Spain',
          startDate: '2020-09-01',
          endDate: '2024-06-30'
        }
      ],
      gpa: 9.2, // On 10-point scale
      toeflScore: 105,
      ieltsScore: 7.5,
      intendedMajor: 'International Business',
      startTerm: 'Fall 2024',
      essay: 'My international perspective and multicultural background...',
    }
  ];

  // Create the applications in the database
  for (const applicationData of sampleApplications) {
    const { previousSchools, ...appData } = applicationData;
    
    await prisma.application.create({
      data: {
        ...appData,
        previousSchools: previousSchools, // JSON field
      },
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
  console.log('\nSample Applications:');
  console.log('-------------------');
  sampleApplications.forEach(app => 
    console.log(`- ${app.firstName} ${app.lastName} (${app.type})`));
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 