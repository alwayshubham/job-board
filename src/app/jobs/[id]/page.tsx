"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Banknote, Users } from "lucide-react";

interface Job {
  id: number;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  locationType: string;
  duration: string;
  salary: number;
  createdAt: string;
  applicants: number;
  applyBy: string;
}

export default function JobDetails() {
  const { id } = useParams(); // id is a string by default
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchJob() {
      try {
        const jobId = parseInt(id as string, 10);

        if (isNaN(jobId)) {
          throw new Error("Invalid job ID");
        }

        const res = await fetch(`/api/jobs/${jobId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data: Job = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError("Error fetching job data");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Job Title */}
      <h1 className="text-3xl font-bold text-center">{job.title} Internship</h1>

      {/* Job Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <div className="flex items-center justify-between">
          {/* Company Logo & Name */}
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-500">{job.companyName}</p>
          </div>
          <div className="w-16 h-16 relative">
            <Image
              src={job.companyLogoUrl || "/placeholder-logo.png"}
              alt={`${job.companyName} logo`}
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-y-4 mt-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Start Date: <strong>Immediately</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Duration: <strong>{job.duration}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            <span>Stipend: <strong>₹ {job.salary} / month</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Apply By: <strong>{job.applyBy}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{job.applicants} applicants</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            <span>Posted On: <strong>{job.title}</strong></span>
          </div>
        </div>
      </div>

      {/* About Job Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">About the Internship</h2>
        <p className="text-gray-600 mt-2">
          This is an exciting opportunity to work in {job.title} at {job.companyName}. You will be working remotely and contributing to marketing efforts.
        </p>
      </div>

      

      {/* Apply Now Button */}
      <div className="mt-6 text-center">
        <button  className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        onClick={() => router.push("/apply")} >
          Apply Now
        </button>
      </div>
    </div>
  );
}
