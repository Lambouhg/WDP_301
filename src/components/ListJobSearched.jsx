import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import img1 from "../assets/image.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ApplyJobForm from "./ApplyJobForm";
import Pagination from "./FindJobs/Pagination";
import JobFilters from "./FindJobs/JobFilters";
import JobSort from "./FindJobs/JobSort";
import JobSearchBar from "./FindJobs/JobSearchBar";

function ListJobSearched() {
  const router = useRouter();
  const [allJobs, setAllJobs] = useState([]);
  const [unfilteredJobs, setUnfilteredJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [selectedJobTypes, setSelectedJobTypes] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho search

  const fetchJobs = async (jobTypes = "", categories = "") => {
    try {
      const jobTypesQuery = jobTypes ? `jobType=${jobTypes}` : "";
      const categoriesQuery = categories ? `&categories=${categories}` : "";
      const query = `/api/job/all?${jobTypesQuery}${categoriesQuery}`;
      const res = await fetch(query);
      const data = await res.json();

      if (unfilteredJobs.length === 0) {
        setUnfilteredJobs(data.jobs);
      }
      setAllJobs(data.jobs);
      setTotalJobs(data.totalJobs || data.jobs.length);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const countJobsByType = (type) => {
    return unfilteredJobs.filter((job) => job.jobType === type).length;
  };

  const countJobsByCategory = (category) => {
    return unfilteredJobs.filter((job) => job.categories && job.categories.includes(category)).length;
  };

  const sortJobs = (jobs) => {
    const sortedJobs = [...jobs];
    const directionMultiplier = sortDirection === "desc" ? -1 : 1;

    if (sortOption === "popular") {
      sortedJobs.sort((a, b) => {
        const aRatio = (a.applicants ?? 0) / (a.needs ?? 10);
        const bRatio = (b.applicants ?? 0) / (b.needs ?? 10);
        return directionMultiplier * (bRatio - aRatio);
      });
    } else if (sortOption === "recent") {
      sortedJobs.sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const bDate = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return directionMultiplier * (bDate - aDate);
      });
    }
    return sortedJobs;
  };

  // Hàm lọc jobs theo search query
  const filterJobsBySearch = (jobs) => {
    if (!searchQuery) return jobs; // Nếu không có query, trả về toàn bộ jobs
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredJobs = filterJobsBySearch(allJobs); // Lọc theo search trước
    const sortedJobs = sortJobs(filteredJobs); // Sắp xếp sau khi lọc
    const skip = (currentPage - 1) * jobsPerPage;
    const paginatedJobs = sortedJobs.slice(skip, skip + jobsPerPage);
    setDisplayedJobs(paginatedJobs);
    setTotalJobs(filteredJobs.length); // Cập nhật tổng số jobs sau khi lọc
  }, [allJobs, currentPage, sortOption, sortDirection, searchQuery]); // Thêm searchQuery vào dependency

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    fetchJobs(selectedJobTypes, selectedCategories);
  }, [selectedJobTypes, selectedCategories]);

  const handleJobTypeChange = (jobType) => {
    setSelectedJobTypes(selectedJobTypes === jobType ? "" : jobType);
    setCurrentPage(1);
  };

  const handleCategoriesChange = (category) => {
    setSelectedCategories(selectedCategories === category ? "" : category);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleDirectionChange = (e) => {
    setSortDirection(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedJobTypes("");
    setSelectedCategories("");
    setCurrentPage(1);
  };

  const handleOpenApplyForm = (job) => {
    setSelectedJob(job);
    setIsApplyFormOpen(true);
  };

  const handleCloseApplyForm = () => {
    setIsApplyFormOpen(false);
    setSelectedJob(null);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 mt-6 px-4 md:px-10 max-w-9xl mx-auto">
      {/* Search Bar */}
      <JobSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Job Filters */}
        <JobFilters
          isJobTypeOpen={isJobTypeOpen}
          setIsJobTypeOpen={setIsJobTypeOpen}
          isCategoriesOpen={isCategoriesOpen}
          setIsCategoriesOpen={setIsCategoriesOpen}
          selectedJobTypes={selectedJobTypes}
          handleJobTypeChange={handleJobTypeChange}
          selectedCategories={selectedCategories}
          handleCategoriesChange={handleCategoriesChange}
          countJobsByType={countJobsByType}
          countJobsByCategory={countJobsByCategory}
          handleClearFilters={handleClearFilters}
        />

        <div className="flex-1">
          {/* Job Sort */}
          <JobSort
            totalJobs={totalJobs}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />

          <div className="grid grid-cols-1 gap-6">
            {/* List Jobs */}
            {displayedJobs.map((job, index) => (
              <Card key={index} className="shadow-md rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start p-6">
                  <div
                    className="flex gap-4 cursor-pointer flex-1"
                    onClick={() => router.push(`/FindJobDetail?jobId=${job._id}`)}
                  >
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={job.companyId?.logo || img1}
                        className="w-full h-full object-cover"
                        alt={job.title}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{job.companyId?.name} • {job.location || "Unknown Location"}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {job.categories && Array.isArray(job.categories) && job.categories.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Apply Button */}
                  <div className="mt-4 sm:mt-0 sm:text-right flex flex-col items-center sm:items-end gap-3">
                    <Button
                      className="w-32 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                      onClick={() => handleOpenApplyForm(job)}
                    >
                      Apply Now
                    </Button>
                    <div className="w-32 bg-gray-200 rounded-full h-2 relative">
                      <div
                        className="absolute h-full bg-indigo-500 rounded-full transition-all duration-300"
                        style={{ width: `calc(${job?.applicants ?? 0} / ${job?.needs ?? 10} * 100%)` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 tracking-tight">
                      <span className="font-semibold">{job?.applicants ?? 0}</span> applied /{" "}
                      <span className="font-semibold">{job?.needs ?? 10}</span> slots
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

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