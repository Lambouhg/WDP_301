import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/router";

const JobDetails = () => {
  const router = useRouter();
  const { job_id } = router.query; // Lấy job_id từ URL

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job data
  useEffect(() => {
    if (!job_id) return;

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/job/${job_id}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  // Điều hướng sang các trang khác
  const handleNavigation = (path) => {
    router.push(path);
  };

  if (loading) return <p className="text-center text-gray-500">Loading job details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mx-auto h-screen w-screen flex overflow-hidden">
      <SidebarCompany />
      <div className="w-full px-10 pt-5 h-full overflow-y-auto">
        <HeaderCompany />
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">{job.title}</h1>
              <p className="text-gray-500">{job.categories.join(", ")} • {job.jobType} • {job.applicants || 0} Applicants</p>
            </div>
          </div>
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2">
            More Action
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex mt-6 space-x-1 bg-gray-100 p-1 rounded-xl">
            <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600"
              onClick={() => handleNavigation("/company/ApplicantsTracking")}>
              Applicants
            </button>
            <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-white text-blue-600 shadow-sm">
              Job Details
            </button>
            <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600"
              onClick={() => handleNavigation("/company/Analytics")}>
              Analytics
            </button>
          </nav>
        </div>

        {/* Job Content */}
        <div className="flex gap-8">
          <div className="flex-1">
            {/* Job Title Section */}
            <div className="flex items-start justify-between mb-8">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg">
                + Edit Job Details
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-600">{job.jobDescription}</p>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Responsibilities</h3>
              <p className="text-gray-600">{job.responsibilities}</p>
            </div>

            {/* Who You Are */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Who You Are</h3>
              <p className="text-gray-600">{job.whoYouAre}</p>
            </div>

            {/* Perks & Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Perks & Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {job.perksAndBenefits.map((perk, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">About this role</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Applicants</div>
                  <div>{job.applicants || 0}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Apply Before</div>
                  <div>{new Date(job.dueDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Job Posted On</div>
                  <div>{new Date(job.datePosted).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Job Type</div>
                  <div>{job.jobType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Salary</div>
                  <div>${job.salaryMin} - ${job.salaryMax} USD</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {job.categories.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
