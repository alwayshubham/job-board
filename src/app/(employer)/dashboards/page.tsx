"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Profile {
  id: number;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  job: {
    title: string;
  } | null; // job can be null if no jobId
}

export default function Dashboards() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const res = await fetch("/api/profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-4xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">🎉 Dashboard</h1>
        <p className="text-gray-600 text-center">Applicants Overview</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Contact</th>
                <th className="py-3 px-6 text-left">Job Title</th>
                <th className="py-3 px-6 text-left">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{profile.name}</td>
                  <td className="py-3 px-6">{profile.email}</td>
                  <td className="py-3 px-6">{profile.contact}</td>
                  <td className="py-3 px-6">{profile.job?.title ?? "N/A"}</td>
                  <td className="py-3 px-6">{new Date(profile.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <Link href="/jobs/new">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition duration-300">
              <ArrowLeft size={20} />
              Post a Job
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
