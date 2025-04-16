"use client";

import { useState } from "react";
import { register } from "@/actions/auth";
import Link from "next/link";

export default function Registers() {

  



  const [state, setState] = useState<{ errors?: Record<string, string[]>; success?: boolean }>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    

    try {
      const result = await register(formData);

      if (result.errors) {
        const normalizedErrors: Record<string, string[]> = {};
        Object.entries(result.errors).forEach(([key, value]) => {
          normalizedErrors[key] = Array.isArray(value) ? value : [value];
        });

        setState({ errors: normalizedErrors });
       
      } else {
        setState({ success: true, errors: {} });
        
      }
    } catch (error) {
      console.error("Registration error:", error);
      setState({ errors: { general: ["Something went wrong."] } });
    }
  }
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input type="text" name="email" className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email.join(", ")}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input type="name" name="name" className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name.join(", ")}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input type="password" name="password" className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {state.errors?.password && (
              <ul className="text-red-500 text-sm mt-1 list-disc list-inside">
                {state.errors.password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm Password</label>
            <input type="password" name="confirmPassword" className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {state.errors?.confirmPassword && <p className="text-red-500 text-sm mt-1">{state.errors.confirmPassword.join(", ")}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}