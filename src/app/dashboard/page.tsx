"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const handleHomepage = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Welcome to Your Dashboard</h1>
        <p className="text-gray-600">
          This is your personal space where you can manage your profile, view job posts, or explore opportunities.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleHomepage}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition duration-300"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
