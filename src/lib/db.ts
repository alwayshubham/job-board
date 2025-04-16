import prisma from "./prisma";

// Function to fetch all users
export async function getUsers() {
  return await prisma.user.findMany({
    include: {
      profile: true,
      jobs: true, // 👈 changed from job → jobs
    },
  });
}

// Function to fetch a user by ID
export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, jobs: true }, // 👈 same here
  });
}

// Function to fetch all jobs
export async function getJobs() {
  return await prisma.job.findMany({
    include: {
      user: true, // ✅ This will now work
    },
  });
}

// Function to fetch a job by slug
export async function getJobBySlug(slug: string) {
  return await prisma.job.findUnique({
    where: { slug },
    include: { user: true }, // 👈 same here
  });
}

// Function to create a new user
export async function createUser(email: string, password: string, name?: string) {
  return await prisma.user.create({
    data: { email, password, name },
  });
}

// Function to create a new job
export async function createJob(data: {
  title: string;
  slug: string;
  type: string;
  locationType: string;
  salary: number;
  companyName: string;
  userId: number;
}) {
  return await prisma.job.create({
    data: {
      title: data.title,
      slug: data.slug,
      type: data.type,
      locationType: data.locationType,
      salary: data.salary,
      companyName: data.companyName,
      user: {
        connect: { id: data.userId }, // 👈 changed users → user
      },
    },
  });
}
