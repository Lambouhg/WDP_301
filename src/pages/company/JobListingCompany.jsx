import React, { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/navigation";

const JobListingPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch dữ liệu từ API
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/job");
      if (!response.ok)
        throw new Error("You have no company exist let create one");
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const goToApplicants = (job) => {
    if (!job || !job._id) {
      console.error("Job data is missing:", job);
      return;
    }
    router.push(`/company/JobDetails?job_id=${job._id}`);
  };

  return (
    <div className="mx-auto h-screen w-screen flex overflow-hidden">
      <SidebarCompany />
      <div className="w-full px-10 pt-5 h-full overflow-y-auto">
        <HeaderCompany />
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold mb-1">Job Listing</h1>
            <p className="text-gray-500 text-sm">
              Here is your jobs listing status.
            </p>
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg">
            Jul 19 - Jul 25
            <ChevronDown className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* Hiển thị trạng thái tải dữ liệu */}
        {loading && (
          <p className="text-center text-gray-500">Loading jobs...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Hiển thị bảng công việc */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Job List</h2>
              <button className="flex items-center px-3 py-1.5 border rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date Posted</th>
                  <th className="text-left p-4">Due Date</th>
                  <th className="text-left p-4">Job Type</th>
                  <th className="text-left p-4">Applicants</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => goToApplicants(job)}
                  >
                    <td className="p-4">{job.title}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-green-600 bg-green-100 rounded-full text-sm">
                        {job.status || "Live"}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {new Date(job.dueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full text-sm">
                        {job.jobType || "Fulltime"}
                      </span>
                    </td>
                    <td className="p-4">{job.applicants?.length || 0}</td>
                    <td className="p-4">
                      <button>
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-4 border-t">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">View</span>
                <select className="border rounded px-2 py-1">
                  <option>10</option>
                </select>
                <span className="text-sm text-gray-500">
                  Applicants per page
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-lg hover:bg-gray-100">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-blue-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-100">
                  2
                </button>
                <button className="p-1 rounded-lg hover:bg-gray-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;
