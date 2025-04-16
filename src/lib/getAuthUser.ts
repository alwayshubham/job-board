// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// interface AuthUser {
//   id: string;
//   email: string;
//   // Add more fields if your token includes them
// }

// export default async function getAuthUser(): Promise<AuthUser | null> {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) return null;

//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("JWT_SECRET is not defined");

//     const user = jwt.verify(token, secret) as AuthUser;
//     return user;
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error("❌ Invalid or expired token:", err.message);
//     } else {
//       console.error("❌ Unknown error during token verification");
//     }
//     return null;
//   }
// }
import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    return user;
  }
}

