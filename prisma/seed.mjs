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
    prisma.user.deleteMany({}),      // Delete users before calendars
    prisma.calendar.deleteMany({}),   // Delete calendars last
  ]);

  // Create users (admin, faculty, students)
  const password = await bcrypt.hash('password123', 10);

  // Create Admin
  const adminCalendar = await prisma.calendar.create({ data: {} });
  const admin = await prisma.user.create({
    data: {
      email: 'admin@school.edu',
      password,
      role: 'ADMIN',
      firstName: 'Adam',
      lastName: 'Admin',
      roleId: generateRoleId('ADMIN', 'Adam', 'Admin'),
      calendarId: adminCalendar.id,
    },
  });

  // Create Faculty
  const facultyCalendar = await prisma.calendar.create({ data: {} });
  const faculty = await prisma.user.create({
    data: {
      email: 'faculty@school.edu',
      password,
      role: 'FACULTY',
      firstName: 'Frank',
      lastName: 'Faculty',
      roleId: generateRoleId('FACULTY', 'Frank', 'Faculty'),
      calendarId: facultyCalendar.id,
    },
  });

  // Create Students
  const student1Calendar = await prisma.calendar.create({ data: {} });
  const student1 = await prisma.user.create({
    data: {
      email: 'student1@school.edu',
      password,
      role: 'STUDENT',
      firstName: 'Sam',
      lastName: 'Student',
      roleId: generateRoleId('STUDENT', 'Sam', 'Student'),
      calendarId: student1Calendar.id,
    },
  });

  const student2Calendar = await prisma.calendar.create({ data: {} });
  const student2 = await prisma.user.create({
    data: {
      email: 'student2@school.edu',
      password,
      role: 'STUDENT',
      firstName: 'Sarah',
      lastName: 'Smith',
      roleId: generateRoleId('STUDENT', 'Sarah', 'Smith'),
      calendarId: student2Calendar.id,
    },
  });

  // Create Courses
  const mathCourse = await prisma.course.create({
    data: {
      code: 'MATH101',
      name: 'Basic Mathematics',
      description: 'Introduction to Mathematics',
      instructor: { connect: { id: faculty.id } },
      students: { connect: [{ id: student1.id }, { id: student2.id }] },
      schedule: {
        create: {
          dayOfWeek: 'MONDAY',
          startTime: new Date('2024-01-01T09:00:00'),
          endTime: new Date('2024-01-01T10:30:00'),
          room: 'Room 101',
        },
      },
    },
  });

  // Create Assignment
  const assignment = await prisma.assignment.create({
    data: {
      title: 'Math Homework 1',
      description: 'Complete exercises 1-10',
      dueDate: new Date('2024-12-31'),
      course: { connect: { id: mathCourse.id } },
    },
  });

  // Create Submission and Grade
  const submission = await prisma.submission.create({
    data: {
      content: 'My homework submission',
      assignment: { connect: { id: assignment.id } },
      student: { connect: { id: student1.id } },
    },
  });

  await prisma.grade.create({
    data: {
      score: 95,
      feedback: 'Excellent work!',
      submission: { connect: { id: submission.id } },
      gradedBy: { connect: { id: faculty.id } },
      gradedFor: { connect: { id: student1.id } },
    },
  });

  // Create Announcement
  await prisma.announcement.create({
    data: {
      title: 'Welcome to Math 101',
      content: 'Welcome to the new semester!',
      course: { connect: { id: mathCourse.id } },
      author: { connect: { id: faculty.id } },
    },
  });

  // Create Events
  // System Event (by admin)
  await prisma.event.create({
    data: {
      title: 'School Holiday',
      description: 'National Holiday',
      startTime: new Date('2024-12-25T00:00:00'),
      endTime: new Date('2024-12-25T23:59:59'),
      type: 'SYSTEM',
      calendar: { connect: { id: adminCalendar.id } },
      creator: { connect: { id: admin.id } },
    },
  });

  // Academic Event (by faculty)
  await prisma.event.create({
    data: {
      title: 'Math Quiz',
      description: 'Chapter 1 Quiz',
      startTime: new Date('2024-12-20T09:00:00'),
      endTime: new Date('2024-12-20T10:30:00'),
      type: 'ACADEMIC',
      calendar: { connect: { id: facultyCalendar.id } },
      creator: { connect: { id: faculty.id } },
    },
  });

  console.log('Seed data created successfully!');
  console.log('\nTest Account Credentials:');
  console.log('-------------------------');
  console.log('Admin Email: admin@school.edu');
  console.log('Faculty Email: faculty@school.edu');
  console.log('Student1 Email: student1@school.edu');
  console.log('Student2 Email: student2@school.edu');
  console.log('Password for all accounts: password123');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 