import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/router";
// import { useState } from "react";

const JobDetails = () => {
  const router = useRouter();
  const { job_id } = router.query; // Lấy job_id từ URL

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);


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

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Job Details</h3>

                {/* Form chỉnh sửa */}
                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={mockJobData.title}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, title: e.target.value })
                    }
                    className="w-full border p-2 rounded-md mb-3"
                  />

                  {/* Employment Type */}
                  <label className="block mb-2">Employment Type</label>
                  <select
                    defaultValue={mockJobData.employmentType}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        employmentType: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded-md mb-3"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>

                  {/* Salary Range */}
                  <label className="block mb-2">Salary Range</label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="number"
                      placeholder="Min Salary"
                      defaultValue={mockJobData.salaryMin}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          salaryMin: e.target.value,
                        })
                      }
                      className="w-1/2 border p-2 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max Salary"
                      defaultValue={mockJobData.salaryMax}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          salaryMax: e.target.value,
                        })
                      }
                      className="w-1/2 border p-2 rounded-md"
                    />
                  </div>

                  {/* Categories */}
                  <label className="block mb-2">Categories</label>
                  <textarea
                    defaultValue={mockJobData.categories.join(", ")}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        categories: e.target.value
                          .split(",")
                          .map((cat) => cat.trim()),
                      })
                    }
                    className="w-full border p-2 rounded-md mb-3"
                  />

                  {/* Required Skills */}
                  <label className="block mb-2">Required Skills</label>
                  <textarea
                    defaultValue={mockJobData.requiredSkills.join(", ")}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        requiredSkills: e.target.value
                          .split(",")
                          .map((skill) => skill.trim()),
                      })
                    }
                    className="w-full border p-2 rounded-md mb-3"
                  />

                  {/* Job Description */}
                  <label className="block mb-2">Job Description</label>
                  <textarea
                    defaultValue={mockJobData.jobDescription}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        jobDescription: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded-md mb-3"
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
