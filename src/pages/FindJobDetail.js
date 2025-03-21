/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardHeader from "../components/DashboardHeader";
import Image from "next/image";
import img1 from "../assets/image.png";
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

  // Fetch user role from localStorage
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

  // Fetch job details
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

  // Handle back button
  const handleBack = () => {
    router.back(); // Quay lại trang trước
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="text-center p-6 text-gray-500">Job not found.</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      {userRole === "company" && <CompanySidebar className="w-[250px] shrink-0" />}
      {userRole === "user" && <Sidebar className="w-[250px] shrink-0" />}

      {/* Main Content */}
      <div className="overflow-y-auto w-full h-screen pb-10">
        <main className="flex-1">
          {/* Header with Back Button */}
          <div className="w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
            <DashboardHeader
              dashboardHeaderName={"Job Detail"}
              onBack={handleBack} // Truyền hàm xử lý back
            />
          </div>

          {/* Job Header */}
          <div className="ml-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <Image
                  src={job.companyId?.logo || img1}
                  alt="Company logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 mr-4 mb-4 md:mb-0"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                  <p className="text-gray-600">
                    <span className="text-blue-600 font-semibold">{job.companyId?.name}</span> •{" "}
                    <span className="text-green-600 font-semibold">{job.jobType}</span>
                  </p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300 mt-4 md:mt-0"
                  onClick={() => setIsOpen(true)}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Job Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Job Description */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <StatCard title="Description" value={job.jobDescription} />

                {/* Responsibilities */}
                <StatCard
                  title="Responsibilities"
                  value={job.responsibilities?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                />

                {/* Who You Are */}
                <StatCard
                  title="Who You Are"
                  value={job.whoYouAre?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                />

                {/* Nice-To-Haves */}
                <StatCard
                  title="Nice-To-Haves"
                  value={job.niceToHaves?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                />
              </div>

              {/* Right Column - Job Info */}
              <div className="space-y-6">
                {/* Job Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Job Overview</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">{job.applicants}</span> applied of {job.needs} capacity
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(job.applicants / job.needs) * 100}%` }}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Apply Before:</span>
                      <span className="text-gray-800">{new Date(job.dueDate).toLocaleDateString()}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Job Posted On:</span>
                      <span className="text-gray-800">{new Date(job.datePosted).toLocaleDateString()}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Job Type:</span>
                      <span className="text-gray-800">{job.jobType}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Salary:</span>
                      <span className="text-gray-800">${job.salaryMin} - ${job.salaryMax}</span>
                    </p>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.categories?.map((category, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm transition duration-300 hover:scale-110"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm transition duration-300 hover:scale-110"
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

      {/* Job Application Popup */}
      <JobApplicationPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {Array.isArray(value) ? (
        <ul className="list-disc pl-5 text-gray-700 space-y-2">{value}</ul>
      ) : (
        <p className="text-gray-700">{value}</p>
      )}
    </div>
  );
}