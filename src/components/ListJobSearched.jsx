import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import img1 from "../assets/image.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function ListJobSearched() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobType, setSelectedJobType] = useState("");

  // Fetch jobs from API
  const fetchJobs = async (page = 1, jobType = "") => {
    try {
      const query = `/api/job/all?page=${page}&limit=5${jobType ? `&jobType=${jobType}` : ""}`;
      const res = await fetch(query);
      const data = await res.json();

      setJobs(data.jobs);
      setTotalJobs(data.totalJobs);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Load jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle changing job type filter
  const handleJobTypeChange = (jobType) => {
    setSelectedJobType(jobType);
    fetchJobs(1, jobType);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Ngăn lỗi vượt giới hạn trang
    fetchJobs(page, selectedJobType);
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

        {/* Other filters (Static Data) */}
        {/* Categories, Job Level - Giữ nguyên */}
        <div className="mb-6 scroll-y">
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              {/* <Checkbox id="design" /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="design" className="text-md">
                Design (24)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="sales" /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="sales" className="text-md">
                Sales (5)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Marketing (3)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Finance (3)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Business (3)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Human Resource (6)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Engineering (4)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Technology (5)
              </label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Job Level</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              {/* <Checkbox id="design" /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="design" className="text-md">
                Entry Level (57)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="sales" /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="sales" className="text-md">
                Mid Level (3)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Senior Level (5)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                Director (12)
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* <Checkbox id="marketing" checked /> */}
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <label htmlFor="marketing" className="text-md">
                VP or above (8)
              </label>
            </div>
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
              <div
                className="flex justify-between items-start border border-gray-200 p-6 cursor-pointer hover:border-blue-400 transition duration-200 rounded-md"
                onClick={() => router.push("/JobDetail")}
              >
                <div className="flex gap-4">
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
                      {job.categories.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-2">
                    Apply
                  </Button>
                  <div className="relative w-full bg-gray-300 rounded h-2 mb-2">
                    <div className="absolute h-full bg-green-500 rounded" style={{ width: `calc(${job?.applicants ?? 0} / 10 * 100%)` }}></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">{job?.applicants ?? 0} applied</span> of {job?.needs ?? 10} capacity
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="ghost" className="h-10 w-10 text-gray-800 font-bold" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </Button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button key={page} onClick={() => handlePageChange(page)} variant={page === currentPage ? "default" : "ghost"} className={page === currentPage ? "bg-blue-600 text-white h-10 w-10 rounded-lg" : "h-10 w-10"}>
              {page}
            </Button>
          ))}

          <Button variant="ghost" className="h-10 w-10 text-gray-800 font-bold" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ListJobSearched;
