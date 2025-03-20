"use server";

import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import path from "path";
import { nanoid } from "nanoid";

import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validations";

export async function createJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  // Validate form data
  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  // Check if companyLogo is a valid File object
  if (companyLogo instanceof File && companyLogo.size > 0) {
    const blob = await put(
      `company_logo/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    companyLogoUrl = blob.url;
  }

  // Ensure salary is always a number
  const salaryValue = salary ? parseInt(salary, 10) || 0 : 0;

  // Store job in the database
  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim() || null,
      applicationUrl: applicationUrl?.trim() || null,
      description: description?.trim(),
      salary: salaryValue, // Ensured to be a number
      approved: true,
    },
  });

  // Redirect after successful submission
  redirect("/job-submitted");
}
