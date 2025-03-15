import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardHeader from "../components/DashboardHeader";
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
    const [userRole, setUserRole] = useState(null); // User role state

    // Fetch user role from localStorage on component mount
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUserRole(parsedUser.role); // Set user role (company/user)
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

    if (loading) return <p className="text-center text-gray-500">Loading job details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!job) return <p className="text-center text-gray-500">Job not found.</p>;

    return (
        <div className="flex">
            {/* Dynamically Load Sidebar Based on Role */}
            {userRole === "company" && <CompanySidebar />}
            {userRole === "user" && <Sidebar />}

            <div className="flex-1 p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="border-b pb-4">
                    <DashboardHeader dashboardHeaderName={"Job Detail"} />
                </div>

                {/* Job Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 flex items-center mt-6">
                    <img
                        src="https://placehold.co/80x80"
                        alt="Company logo"
                        className="w-20 h-20 rounded-full mr-6"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{job.title}</h2>
                        <p className="text-gray-500">
                            {job.companyId?.name} • {job.location || "Remote"} • {job.jobType}
                        </p>
                    </div>
                    <button
                        className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                        onClick={() => setIsOpen(true)}
                    >
                        Apply Now
                    </button>
                    <JobApplicationPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
                </div>

                {/* Job Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    {/* Left Column - Job Description */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{job.jobDescription}</p>

                        {/* Responsibilities */}
                        <h3 className="text-xl font-semibold mt-6 mb-3">Responsibilities</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            {job.responsibilities?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        {/* Who You Are */}
                        <h3 className="text-xl font-semibold mt-6 mb-3">Who You Are</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            {job.whoYouAre?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        {/* Nice-To-Haves */}
                        <h3 className="text-xl font-semibold mt-6 mb-3">Nice-To-Haves</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            {job.niceToHaves?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column - Job Info */}
                    <div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
                            <p className="text-gray-700">
                                <span className="font-semibold">{job.applicants}</span> applied of{" "}
                                {job.needs} capacity
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-blue-500 h-2.5 rounded-full"
                                    style={{ width: `${(job.applicants / job.needs) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-700">
                                <span className="font-semibold">Apply Before:</span>{" "}
                                {new Date(job.dueDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Job Posted On:</span>{" "}
                                {new Date(job.datePosted).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Job Type:</span> {job.jobType}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Salary:</span> ${job.salaryMin} - ${job.salaryMax}
                            </p>
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.categories?.map((category, index) => (
                                    <span
                                        key={index}
                                        className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.requiredSkills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}