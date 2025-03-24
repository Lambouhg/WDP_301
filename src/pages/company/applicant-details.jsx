import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SidebarCompany from "../../components/SidebarCompany";

const ApplicantDetails = () => {
  const router = useRouter();
  const { applicantId } = router.query;
  const [isUpdating, setIsUpdating] = useState(false);
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("resume");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(applicant?.status);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const statuses = [
    { value: "In Review", color: "text-blue-500 bg-blue-100" },
    { value: "In Reviewing", color: "text-blue-500 bg-blue-100" },
    { value: "Shortlisted", color: "text-blue-500 bg-blue-100" },
    { value: "Hired", color: "text-gray-500 bg-gray-100" },
    { value: "Rejected", color: "text-blue bg-blue-500" },
  ];

  const getStatusColor = (status) => {
    const statusInfo = statuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color.split(" ")[1] : "bg-gray-200";
  };

  const getStatusClass = (status) => {
    const statusInfo = statuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : "text-gray-500 bg-gray-200";
  };

  // Fetch applicant data from API
  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        if (!applicantId) return;
        const response = await fetch(`/api/company/applicant/${applicantId}`);
        if (!response.ok) throw new Error("Failed to fetch applicant details");
        const data = await response.json();
        console.log("Fetched Applicant Data:", data.applicant); // Log dữ liệu từ API
        setApplicant(data.applicant);
      } catch (err) {
        setError(err.message || "Failed to load applicant details");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicant();
  }, [applicantId]);

  // Handle Schedule Interview button click
  const handleScheduleInterview = async () => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/company/applicant/${applicantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update applicant status");
      }
      const data = await response.json();
      setApplicant({
        ...applicant,
        status: data.applicant.status,
      });
      setIsUpdating(false);
    } catch (error) {
      setError(error.message);
      setIsUpdating(false);
    }
  };

  // Xử lý thay đổi trạng thái
  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/company/applicant/${applicantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update applicant status");
      }
      const data = await response.json();
      setApplicant({
        ...applicant,
        status: data.applicant.status,
      });
      setSelectedStatus(newStatus);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUpdating(false);
      setIsDropdownOpen(false);
    }
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SidebarCompany className="w-[250px] shrink-0" />
      {/* Main Content */}
      <div className="overflow-y-auto w-full h-screen pb-10 px-6">
        <main className="flex-1">
          {/* Header */}
          <div className="w-full mt-6 border-b-2 border-gray-200 mb-12">
            <button
              onClick={() => router.push("/company/AllApplication")}
              className="text-blue-500 hover:text-blue-700 mb-4 inline-flex items-center px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              <svg
                className="w-4 h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.77 5.27a1 1 0 010 1.41L9.414 10l3.353 3.354a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.41l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to All Applications
            </button>
            <h1 className="text-2xl font-bold">Applicant Details</h1>
          </div>
          {/* Main Content Area */}
          <div className="flex gap-6">
            {/* Left Section: Applicant Summary (3/10) */}
            <div className="bg-white p-6 rounded-lg shadow-md basis-3/10">
              {/* Avatar and Info */}
              <div className="flex items-center gap-4">
                {applicant && applicant.avatar ? (
                  <img
                    src={applicant.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6z" />
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm7-9a1 1 0 01-2 0V6a1 1 0 112 0v3z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">
                    {applicant?.name || "N/A"}
                  </h2>
                  <p className="text-gray-600">
                    {applicant?.currentJobTitle || "N/A"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                    </svg>
                  </div>
                </div>
              </div>
              {/* Applied Jobs */}
              <div className="mt-4">
                <p className="text-gray-600">Applied Jobs</p>
                <p className="text-gray-800">
                  {applicant?.appliedJobs?.length || "N/A"}
                </p>
              </div>
              {/* Job Details */}
              <div className="mt-4">
                <h3 className="text-lg font-bold">
                  {applicant?.title || "N/A"}
                </h3>
                <p className="text-gray-600">{`${applicant?.categories} • ${applicant?.jobType}`}</p>
              </div>
              {/* Stage */}
              <div className="mt-4 relative">
                <p className="text-gray-600">Stage</p>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${applicant?.stageProgress || 0}%`,
                        backgroundColor: getStatusColor(
                          applicant?.status || "N/A"
                        ),
                      }}
                    ></div>
                  </div>
                  <span className={getStatusClass(applicant?.status || "N/A")}>
                    {applicant?.status || "N/A"}
                  </span>
                </div>
                {/* Dropdown trạng thái */}
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white rounded shadow-lg z-10">
                    <ul>
                      {statuses.map((status) => (
                        <li
                          key={status.value}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            applicant?.status === status.value
                              ? "bg-gray-100"
                              : ""
                          }`}
                          onClick={() => handleStatusChange(status.value)}
                        >
                          <span className={status.color}>{status.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Schedule Interview Button */}
              <div className="mt-4">
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
                    isUpdating ? "cursor-not-allowed" : ""
                  }`}
                  onClick={handleScheduleInterview}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Updated Status"}
                </button>
              </div>
              {/* Contact Information */}
              <div className="mt-6">
                <h3 className="text-lg font-bold">Contact</h3>
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {/* Icon Email */}
                    </svg>
                    Email
                  </p>
                  <p className="text-gray-800">{applicant?.email || "N/A"}</p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {/* Icon Phone */}
                    </svg>
                    Phone
                  </p>
                  <p className="text-gray-800">
                    {applicant?.phoneNumber || "N/A"}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {/* Icon Instagram */}
                    </svg>
                    Instagram
                  </p>
                  <p className="text-gray-800">
                    {applicant?.socialLinks?.instagram ? (
                      <a
                        href={applicant.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.socialLinks.instagram}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {/* Icon Twitter */}
                    </svg>
                    Twitter
                  </p>
                  <p className="text-gray-800">
                    {applicant?.socialLinks?.twitter ? (
                      <a
                        href={applicant.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.socialLinks.twitter}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {/* Icon Website */}
                    </svg>
                    Facebook
                  </p>
                  <p className="text-gray-800">
                  {applicant?.socialLinks?.facebook ? (
                      <a
                        href={applicant.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.socialLinks.facebook}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* Right Section: Tabs (Resume, Hiring Progress, Interview Schedule) */}
            <div className="bg-white p-6 rounded-lg shadow-md grow">
              <div className="flex gap-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeTab === "resume"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handleTabChange("resume")}
                >
                  Resume
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeTab === "hiring-progress"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handleTabChange("hiring-progress")}
                >
                  Hiring Progress
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeTab === "interview-schedule"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handleTabChange("interview-schedule")}
                >
                  Interview Schedule
                </button>
              </div>
              {loading && (
                <div className="flex items-center justify-center h-screen">
                  <p className="text-gray-600">Loading...</p>
                </div>
              )}
              {error && (
                <div className="text-center p-6 text-red-500">{error}</div>
              )}
              {!loading && !error && applicant && (
                <div>
                  {activeTab === "resume" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold mb-4">
                        Applicant Information
                      </h2>
                      <div>
                        <p className="font-semibold">Full Name:</p>
                        <p>{applicant.fullName || "N/A"}</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Email:</p>
                        <p>{applicant.email || "N/A"}</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Phone Number:</p>
                        <p>{applicant.phoneNumber || "N/A"}</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Current Job Title:</p>
                        <p>{applicant.currentJobTitle || "N/A"}</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">LinkedIn:</p>
                        <p>
                          {applicant?.linkedinURL ? (
                            <a
                              href={applicant.linkedinURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View LinkedIn
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Portfolio:</p>
                        <p>
                          {applicant?.portfolioURL ? (
                            <a
                              href={applicant.portfolioURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Portfolio
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Additional Info:</p>
                        <p>{applicant?.additionalInfo || "N/A"}</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Resume:</p>
                        {applicant?.resume ? (
                          <a
                            href={applicant.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View Resume (
                            {new URL(applicant.resume).pathname
                              .split(".")
                              .pop()
                              .toUpperCase()}
                            )
                          </a>
                        ) : (
                          <p className="text-gray-400">No resume available</p>
                        )}
                      </div>
                    </div>
                  )}
                  {activeTab === "hiring-progress" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold mb-4">
                        Hiring Progress
                      </h2>
                      <div>
                        <p className="font-semibold">Current Stage:</p>
                        <p>{applicant?.status || "N/A"}</p>
                      </div>
                    </div>
                  )}
                  {activeTab === "interview-schedule" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold mb-4">
                        Interview Schedule
                      </h2>
                      <p className="text-gray-600">
                        No interview scheduled yet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplicantDetails;
