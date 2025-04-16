"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Banknote,  LocateIcon, Type, Users  } from "lucide-react";

interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  locationType: string;
  location: string;
  duration: string;
  salary: number;
  createdAt: string;
  type: number;
  applicants: number;
  applyBy: string;
}

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchJob() {
      try {
        if (!id) throw new Error("Invalid job ID");

        const res = await fetch(`/api/jobs/${id}`, { cache: "no-store" });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch job details");
        }

        const data: Job = await res.json();
        setJob(data);
      } catch (err) {
        console.error("❌ Error fetching job data:", err);
        setError("Error fetching job data");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchJob();
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!job) return <p className="text-center text-lg mt-10">Job not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {job.title} Internship
            </h1>
            <p className="text-gray-500 text-lg">{job.companyName}</p>
          </div>
          <div className="w-20 h-20 relative">
            <Image
              src={job.companyLogoUrl || "/placeholder-logo.png"}
              alt={`${job.companyName} logo`}
              layout="fill"
              objectFit="contain"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 text-gray-700 mb-6">
          <Info icon={<Calendar />} label="Start Date" value="Immediately" />
          <Info icon={<Clock />} label="Duration" value={job.duration || "6 month" } />
          <Info icon={<Banknote />} label="Stipend" value={`₹ ${job.salary} / month`} />
          <Info icon={<LocateIcon />} label="Location" value={job.location} />
          <Info icon={<Type />} label="Type" value={`${job.type}`} />
          <Info icon={<Users />} label="Applicants" value={`${job.applicants || "10"} applicants`} />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">About the Internship</h2>
          <p className="text-gray-600 leading-relaxed">
            This is an exciting opportunity to work in <strong>{job.title}</strong> at <strong>{job.companyName}</strong>.
            You will be working remotely and contributing to marketing efforts, gaining valuable hands-on experience.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/apply")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl shadow-sm">
      <div className="text-blue-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
