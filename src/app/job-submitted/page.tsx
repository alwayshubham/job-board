"use client";

import H1 from "@/components/ui/h1";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle size={60} className="text-green-500" />
        </div>
        <H1 className="text-3xl font-bold text-gray-800">Job Submitted</H1>
        <p className="text-gray-600 text-lg">
          Your job has been submitted and is pending approval. We will notify you once its live.
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
