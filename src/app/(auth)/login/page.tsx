"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";

// Define initial state structure for better TS inference
const initialState = {
  errors: {
    email: [] as string[],
    password: [] as string[],
  },
  email: "",
};

export default function Login() {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h1>

        <form action={action} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              defaultValue={state.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {state.errors.email.length > 0 && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.email.join(", ")}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {state.errors.password.length > 0 && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.password.join(", ")}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300 disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Link to Register */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Dont have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
