"use server";
// import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // Adjust if needed





import { LoginFormSchema, } from "@/lib/rule";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";
// import { cookies } from "next/headers";
import { cookies } from "next/headers";


type LoginState = {
  errors: {
    email: string[];
    password: string[];
  };
  email: string;
};

const defaultState: LoginState = {
  errors: { email: [], password: [] },
  email: "",
};

// export async function register(state, formData) {
//   // await new Promise((resolve) => setTimeout(resolve, 3000));

//   // Validate form fields
//   const validatedFields = RegisterFormSchema.safeParse({
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//   });

//   // If any form fields are invalid
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       email: formData.get("email"),
//     };
//   }

//   // Extract form fields
//   const { email, password } = validatedFields.data;

//   // Check if email is already registered
//   const userCollection = await getCollection("users");
//   if (!userCollection) return { errors: { email: "Server error!" } };

//   const existingUser = await userCollection.findOne({ email });
//   if (existingUser) {
//     return {
//       errors: {
//         email: "Email already exists in our database!",
//       },
//     };
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Save in DB
//   const results = await userCollection.insertOne({
//     email,
//     password: hashedPassword,
//   });

//   // Create a session
//   await createSession(results.insertedId);

//   // Redirect
//   redirect("/dashboard");
// }


export async function register(formData: FormData) {
  const errors: Record<string, string | string[]> = {};

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email) {
    errors.email = "Email is required";
  }
  if (!name) {
    errors.name = "Name is required";
  }

  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters"];
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Check for existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    errors.email = "Email is already registered";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Redirect on success
  redirect("/dashboard");
}


{/**Login action  */ }


export async function login(
  _prevState: LoginState, // This is needed for useActionState
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = LoginFormSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: {
        email: validatedFields.error.flatten().fieldErrors.email ?? [],
        password: validatedFields.error.flatten().fieldErrors.password ?? [],
      },
      email,
    };
  }

  const { email: validEmail, password: validPassword } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { email: validEmail } });

  if (!existingUser) {
    return {
      errors: { email: ["Invalid credentials."], password: [] },
      email: validEmail,
    };
  }

  const matchedPassword = await bcrypt.compare(validPassword, existingUser.password);

  if (!matchedPassword) {
    return {
      errors: { email: ["Invalid credentials."], password: [] },
      email: validEmail,
    };
  }

  await createSession(existingUser.id.toString());
  redirect("/dashboard");

  // Never reached, but required for TS
  return defaultState;
}


export async function registers(formData: FormData) {
  const errors: Record<string, string | string[]> = {};

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email) {
    errors.email = "Email is required";
  }
  if (!name) {
    errors.name = "Name is required";
  }

  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters"];
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Check for existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    errors.email = "Email is already registered";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Redirect on success
  redirect("/dashboards");
}

export async function logins(
  _prevState: LoginState, // This is needed for useActionState
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = LoginFormSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: {
        email: validatedFields.error.flatten().fieldErrors.email ?? [],
        password: validatedFields.error.flatten().fieldErrors.password ?? [],
      },
      email,
    };
  }

  const { email: validEmail, password: validPassword } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { email: validEmail } });

  if (!existingUser) {
    return {
      errors: { email: ["Invalid credentials."], password: [] },
      email: validEmail,
    };
  }

  const matchedPassword = await bcrypt.compare(validPassword, existingUser.password);

  if (!matchedPassword) {
    return {
      errors: { email: ["Invalid credentials."], password: [] },
      email: validEmail,
    };
  }

  await createSession(existingUser.id.toString());
  redirect("/dashboards");

  // Never reached, but required for TS
  return defaultState;
}


export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}