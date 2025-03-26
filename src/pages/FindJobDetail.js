"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardHeader from "../components/DashboardHeader";
import Image from "next/image";
import img1 from "../assets/the-simpsons-electric-chair.gif";
import JobApplicationPopup from "../components/PopupApply_user";
import CompanySidebar from "../components/SidebarCompany";
import Sidebar from "../components/Sidebar";

export default function FindJobDetail() {
  const router = useRouter();
  const { jobId } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserRole(parsedUser.role);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!jobId) return;
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`/api/job/all?jobId=${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [jobId]);

  const handleBack = () => router.back();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500 bg-red-50 rounded-lg mx-auto max-w-md mt-20">
        {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center p-6 text-gray-500 bg-gray-50 rounded-lg mx-auto max-w-md mt-20">
        Job not found.
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      {userRole === "company" && (
        <CompanySidebar className="w-[250px] shrink-0" />
      )}
      {userRole === "user" && <Sidebar className="w-[250px] shrink-0" />}

      {/* Main Content */}
      <div className="overflow-y-auto w-full h-screen pb-12 px-8">
        {" "}
        {/* Tăng px-6 thành px-8 */}
        <main className="flex-1">
          {/* Header */}
          <div className="w-full mt-8 border-b-2 border-gray-200/50 pb-4 mb-10">
            <DashboardHeader
              dashboardHeaderName={"Job Detail"}
              onBack={handleBack}
            />
          </div>

          {/* Job Header */}
          <div className="max-w-7xl mx-auto">
            {" "}
            {/* Tăng từ max-w-5xl lên max-w-7xl */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Image
                  src={job.companyId?.logo || img1}
                  alt="Company logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-4 border-blue-100 p-1 object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    <span className="text-blue-600 font-semibold">
                      {job.companyId?.name}
                    </span>{" "}
                    •{" "}
                    <span className="text-green-600 font-semibold">
                      {job.jobType}
                    </span>
                  </p>
                </div>
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsOpen(true)}
                >
                  Apply Now
                </button>
              </div>
            </div>
            {/* Job Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <StatCard title="Description" value={job.jobDescription} />
                <StatCard
                  title="Responsibilities"
                  value={job.responsibilities
                    ?.split("\n")
                    .map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                />
                <StatCard
                  title="Who You Are"
                  value={job.whoYouAre?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                />
                <StatCard
                  title="Nice-To-Haves"
                  value={job.niceToHaves?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Job Overview */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Job Overview
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <span className="font-medium text-blue-600">
                      {job.applicants}
                    </span>{" "}
                    applied of <span className="font-medium">{job.needs}</span>{" "}
                    capacity
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(job.applicants / job.needs) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Apply Before:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(job.dueDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Job Posted On:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Job Type:</span>
                      <span className="text-gray-900 font-medium">
                        {job.jobType}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Salary:</span>
                      <span className="text-gray-900 font-medium">
                        ${job.salaryMin} - ${job.salaryMax}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.categories?.map((category, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-200 transform hover:scale-105 transition-all duration-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-200 transform hover:scale-105 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Popup */}
      <JobApplicationPopup job={job} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      {Array.isArray(value) ? (
        <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
          {value}
        </ul>
      ) : (
        <p className="text-gray-700 leading-relaxed">{value}</p>
      )}
    </div>
  );
}
