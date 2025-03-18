import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import img1 from "../assets/image.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ApplyJobForm from "./ApplyJobForm"; // Import the ApplyJobForm component

function ListJobSearched() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to track the selected job for applying
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false); // State to control the form visibility
  const [userRole, setUserRole] = useState(""); // State to store user role ,(user/company)

  // Fetch jobs from API
  const fetchJobs = async (jobType = "", categories = []) => {
    try {
      // Build query string for categories and jobType
      const categoriesQuery = categories.length > 0 ? `&categories=${categories.join(",")}` : "";
      const query = `/api/job/all?${jobType ? `jobType=${jobType}` : ""}${categoriesQuery}`;
      const res = await fetch(query);
      const data = await res.json();

      setJobs(data.jobs);
      setTotalJobs(data.totalJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Load jobs on component mount
  useEffect(() => {
    // Get role from somewhere (e.g., localStorage, context, etc.)
    const role = localStorage.getItem("role"); // Assuming role is saved in localStorage
    setUserRole(role); // Set the role (user or company)
    fetchJobs(); // Fetch jobs without filters initially
  }, []);

  // Handle changing job type filter
  const handleJobTypeChange = (jobType) => {
    setSelectedJobType(jobType);
    fetchJobs(jobType, selectedCategories); // Fetch jobs based on selected filters
  };

  // Handle changing categories filter
  const handleCategoriesChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    fetchJobs(selectedJobType, newCategories); // Fetch jobs based on selected filters
  };

  // Handle opening the apply form
  const handleOpenApplyForm = (job) => {
    setSelectedJob(job);
    setIsApplyFormOpen(true);
  };

  // Handle closing the apply form
  const handleCloseApplyForm = () => {
    setIsApplyFormOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="flex gap-8 mt-5 px-10 overflow-y-auto">
      {/* Filters */}
      <div className="w-64 p-5 bg-white shadow-md rounded-lg">
        {/* Type of Employment */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-lg text-gray-800">Type of Employment</h3>
          <div className="space-y-3">
            {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
              <div key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-500"
                  checked={selectedJobType === type}
                  onChange={() => handleJobTypeChange(type)}
                />
                <label className="text-md text-gray-700">{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Type of Categories */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-lg text-gray-800">Categories</h3>
          <div className="space-y-3">
            {["Design", "Sales", "Marketing", "Business", "Human Resource", "Finance", "Engineering", "Technology"].map((category) => (
              <div key={category} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoriesChange(category)}
                />
                <label className="text-md text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold text-blue-600">All Jobs</h2>
            <p className="text-sm text-gray-500">Showing {totalJobs} results</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-md text-gray-500">Sort by:</span>
            <select className="p-2 border border-gray-300 rounded-md">
              <option value="relevant">Most relevant</option>
              <option value="recent">Most recent</option>
              <option value="popular">Most popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job, index) => (
            <Card key={index} className="shadow-md rounded-lg hover:shadow-lg transition duration-300">
              <div className="flex justify-between items-start border border-gray-200 p-6 rounded-md">
                <div
                  className="flex gap-4 cursor-pointer flex-1"
                  onClick={() => router.push(`/FindJobDetail?jobId=${job._id}`)}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={job.companyId?.logo || img1}
                      className="w-full h-full object-cover rounded-lg"
                      alt={job.title}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.companyId?.name} • {job.location || "Unknown Location"}</p>
                    <div className="flex gap-2 mt-2">
                      {job.categories && Array.isArray(job.categories) && job.categories.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col text-center">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-2"
                    onClick={() => handleOpenApplyForm(job)} // Open the apply form when button is clicked
                  >
                    Apply
                  </Button>
                  <div className="relative w-full bg-gray-300 rounded h-2 mb-2">
                    <div
                      className="absolute h-full bg-green-500 rounded"
                      style={{ width: `calc(${job?.applicants ?? 0} / ${job?.needs ?? 10} * 100%)` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">{job?.applicants ?? 0} applied</span> of {job?.needs ?? 10} capacity
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Apply Job Form Dialog */}
      {selectedJob && (
        <ApplyJobForm
          job={selectedJob}
          isOpen={isApplyFormOpen}
          onClose={handleCloseApplyForm}
        />
      )}
    </div>
  );
}

export default ListJobSearched;
