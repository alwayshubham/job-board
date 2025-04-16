import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET is not set in environment variables.");
}
const encodedKey = new TextEncoder().encode(secretKey);

interface JwtPayload extends JWTPayload {
  userId: string;
  email?: string;
}

export async function generateToken(payload: JwtPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("48h")
    .sign(encodedKey);
}

export async function decrypt(session: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JwtPayload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const session = await generateToken({ userId, exp: Math.floor(expiresAt.getTime() / 1000) });

  const cookieStore = await cookies(); // ✅ Awaiting `cookies()` before using `.set()`
  
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
