"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import img1 from "../assets/image.png";

export default function FindJob() {
  const router = useRouter();
  const toDashboard = () => {
    router.push("/index");
  };

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/job/all?page=${page}&limit=10`);
      const data = await response.json();

      if (response.ok) {
        const { jobs, totalPages } = data;
        setJobs(jobs);
        setTotalPages(totalPages);
      } else {
        console.error("Error fetching jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page); // Call API when page changes
  }, [page]);

  const toDetailJob = () => {
    router.push("/JobDetail");
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-6">
      {/* Header */}
      <nav className="flex justify-between items-center mb-12 ml-6 mr-5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span
            className="font-bold text-3xl"
            style={{ cursor: "pointer" }}
            onClick={toDashboard}
          >
            Job Finder
          </span>
          <span
            className="text-1xl pl-9 cursor-pointer"
            onClick={() => router.push("/FindJob")}
          >
            Find Jobs
          </span>
          <span
            className="text-1xl pl-2 cursor-pointer"
            onClick={() => router.push("/company/companydashboard")}
          >
            Browse Companies
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mb-5 ml-9 mr-5">
        <h1 className="text-8xl font-bold pb-9">
          <span className="pr-4">Find your</span>
          <span className="text-blue-500 border-b-2 border-blue-500 height-full">
            dream jobs
          </span>
        </h1>
        <p className="text-gray-400 mb-8 text-xl">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>
      </div>

      <div className="ml-6">
        {/* Search Bar */}
        <div className="flex items-center gap-4 border-2 border-gray-300 p-3 rounded-lg w-full max-w-6xl mx-auto">
          {/* Job Title */}
          <div className="flex items-center relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={24}
            />
            <Input
              className="pl-10 w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job title or keyword"
            />
          </div>

          {/* Location */}
          <div className="flex items-center relative flex-grow border-l border-gray-200 pl-4">
            <MapPin
              className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={24}
            />
            <Input
              className="pl-10 w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Florence, Italy"
            />
          </div>

          {/* Search Button */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 rounded-md">
            Search
          </Button>
        </div>

        <div className="text-md text-gray-500 mb-3 mt-5">
          Popular: UI Designer, UX Researcher, Android, Admin
        </div>

        {/* Filters and Job Listings */}
        <div className="flex gap-8 mt-3 overflow-y-auto">
          {/* Filters */}
          <div className="w-58">
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-md">Type of Employment</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2 ">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="full-time" className="text-md">
                    Full-Time (2)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="part-time" className="text-md">
                    Part-Time (5)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="remote" className="text-md">
                    Remote (2)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="remote" className="text-md">
                    Internship (24)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="remote" className="text-md">
                    Contract (3)
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6 scroll-y">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="design" className="text-md">
                    Design (24)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="sales" className="text-md">
                    Sales (5)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1 ml-8">
            <div className="flex justify-between items-center pr-9">
              <div>
                <h2 className="text-3xl font-semibold text-blue-500">All Jobs</h2>
                <p className="text-sm text-gray-500">Showing {jobs.length} results</p>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                jobs.map((job, index) => (
                  <Card key={index} className="gap-1">
                    <div
                      className="flex justify-between items-start border-2 border-gray-200 p-4 cursor-pointer hover:border-blue-300"
                      onClick={toDetailJob}
                    >
                      <div className="flex gap-4 ">
                        <div className="w-18 h-18 bg-gray-100 rounded-lg">
                          <img
                            src={job.img || img1}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-gray-600">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            {job.companyId?.name} • {job.location}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {job.tags?.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={`text-xs px-3 py-1 rounded-full ${tag === "Full-time"
                                  ? "border-r-2 border-green-200 text-green-500 font-bold"
                                  : tag === "Marketing"
                                    ? "border border-orange-200 text-orange-500 font-bold"
                                    : "border border-blue-200 text-blue-500 font-bold"
                                  }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="ghost"
                className="h-10 w-10 text-gray-800 font-bold"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </Button>

              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={page === index + 1 ? "default" : "ghost"}
                  className={page === index + 1 ? "bg-blue-600 hover:bg-blue-700 h-10 w-10 text-white rounded-md" : ""}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="ghost"
                className="h-10 w-10 text-gray-800 font-bold"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
