import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import img1 from "../assets/image.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ApplyJobForm from "./ApplyJobForm";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";

function ListJobSearched() {
  const router = useRouter();
  const [allJobs, setAllJobs] = useState([]); // Lưu tất cả jobs từ API
  const [displayedJobs, setDisplayedJobs] = useState([]); // Jobs hiển thị trên trang hiện tại
  const [totalJobs, setTotalJobs] = useState(0);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  // Fetch tất cả jobs từ API
  const fetchJobs = async (jobType = "", categories = []) => {
    try {
      const categoriesQuery = categories.length > 0 ? `&categories=${categories.join(",")}` : "";
      const query = `/api/job/all?${jobType ? `jobType=${jobType}` : ""}${categoriesQuery}`;
      const res = await fetch(query);
      const data = await res.json();

      setAllJobs(data.jobs); // Lưu tất cả jobs
      setTotalJobs(data.totalJobs || data.jobs.length); // Tổng số jobs (dùng length nếu API không trả totalJobs)
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Cập nhật jobs hiển thị dựa trên currentPage
  useEffect(() => {
    const skip = (currentPage - 1) * jobsPerPage;
    const filteredJobs = allJobs.slice(skip, skip + jobsPerPage); // Cắt dữ liệu theo trang
    setDisplayedJobs(filteredJobs);
  }, [allJobs, currentPage]);

  // Load jobs khi component mount hoặc khi filter thay đổi
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    fetchJobs(selectedJobType, selectedCategories);
  }, [selectedJobType, selectedCategories]);

  const handleJobTypeChange = (jobType) => {
    setSelectedJobType(jobType);
    setCurrentPage(1); // Reset về trang 1
  };

  const handleCategoriesChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    setCurrentPage(1); // Reset về trang 1
  };

  const handleOpenApplyForm = (job) => {
    setSelectedJob(job);
    setIsApplyFormOpen(true);
  };

  const handleCloseApplyForm = () => {
    setIsApplyFormOpen(false);
    setSelectedJob(null);
  };

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const getPageNumbers = () => {
    const pages = [];

    // Nếu totalPages <= 3, hiển thị tất cả các trang
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Nếu totalPages > 3, hiển thị trang hiện tại và các trang gần kề
    const showEllipsisBefore = currentPage > 3; // Hiển thị ... trước trang hiện tại
    const showEllipsisAfter = currentPage < totalPages - 2; // Hiển thị ... sau trang hiện tại

    // Trang đầu tiên luôn hiển thị
    pages.push(1);

    // Thêm dấu ... nếu cần trước trang hiện tại
    if (showEllipsisBefore) {
      pages.push("...");
    }

    // Các trang gần kề (trước và sau trang hiện tại)
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Thêm dấu ... nếu cần sau trang hiện tại
    if (showEllipsisAfter) {
      pages.push("...");
    }

    // Trang cuối cùng luôn hiển thị
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-8 mt-5 px-10 overflow-y-auto">
      {/* Filters */}
      <div className="w-64 p-5 bg-white shadow-md rounded-lg">
        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-lg text-gray-800">Type of Employment</h3>
          <div className="space-y-3">
            {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
              <div key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500"
                  checked={selectedJobType === type}
                  onChange={() => handleJobTypeChange(type)}
                />
                <label className="text-md text-gray-700">{type}</label>
              </div>
            ))}
          </div>
        </div>

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
          {displayedJobs.map((job, index) => (
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
                    onClick={() => handleOpenApplyForm(job)}
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-2">
          {/* Nút First */}
          <Button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 px-3 py-1 rounded-md"
          >
            <FiChevronsLeft size={20} />
          </Button>

          {/* Nút Previous */}
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 px-3 py-1 rounded-md"
          >
            <FiChevronLeft size={20} />
          </Button>

          {/* Các số trang */}
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } px-3 py-1 rounded-md`}
            >
              {page}
            </Button>
          ))}

          {/* Nút Next */}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 px-3 py-1 rounded-md"
          >
            <FiChevronRight size={20} />
          </Button>

          {/* Nút Last */}
          <Button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 px-3 py-1 rounded-md"
          >
            <FiChevronsRight size={20} />
          </Button>


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