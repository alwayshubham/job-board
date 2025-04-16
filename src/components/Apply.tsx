// "use client"
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useRouter } from "next/navigation";

// interface FormData {
//   name: string;
//   email: string;
//   contact: string;
//   address: string;
//   resume: FileList;
// }

// export default function Apply() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const router = useRouter();

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("contact", data.contact);
//     formData.append("address", data.address);
//     formData.append("resume", data.resume[0]);
  
//     const res = await fetch("/api/apply", {
//       method: "POST",
//       body: formData,
//     });
  
//     if (res.ok) {
//       alert("Application submitted successfully!");
//       router.push("/");
//     } else {
//       const error = await res.json();
//       alert("Error: " + error.error);
//     }
//   };
  

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Continue apply Form</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             {...register('name', { required: 'Name is required' })}
//             className="w-full border p-2 rounded"
//           />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             {...register('email', { required: 'Email is required' })}
//             className="w-full border p-2 rounded"
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Contact Number</label>
//           <input
//             type="tel"
//             {...register('contact', { required: 'Contact number is required' })}
//             className="w-full border p-2 rounded"
//           />
//           {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Address</label>
//           <textarea
//             {...register('address', { required: 'Address is required' })}
//             className="w-full border p-2 rounded"
//           />
//           {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Upload Resume (PDF)</label>
//           <input
//             type="file"
//             {...register('resume', {
//               required: 'Resume is required',
//               validate: (value) =>
//                 value && value[0]?.type === 'application/pdf' || 'Only PDF files are allowed',
//             })}
//             className="w-full border p-2 rounded"
//             accept="application/pdf"
//           />
//           {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Apply
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  contact: string;
  address: string;
  resume: FileList;
};

export default function Apply() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("address", data.address);
    formData.append("resume", data.resume[0]);

    const res = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Application submitted!");
      router.push("/");
    } else {
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply Now</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("contact", { required: "Contact is required" })}
            placeholder="Contact"
            className="w-full p-2 border rounded"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>

        <div>
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div>
          <input
            {...register("resume", {
              required: "Resume is required",
              validate: (files) =>
                files && files[0]?.type === "application/pdf" || "Only PDF files allowed",
            })}
            type="file"
            accept="application/pdf"
            className="w-full p-2 border rounded"
          />
          {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
