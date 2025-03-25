//src/pages/company/AllApplication.jsx
"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, ChevronDown } from "lucide-react";
import DasborderHeader from "../../components/HeaderCompany";
import SidebarCompany from "../../components/SidebarCompany";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

const ApplicantList = () => {
  const router = useRouter();
  const { user } = useUser();
  const [role, setRole] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch("/api/auth/callback/route");
          const data = await response.json();

          if (data.user?.role) {
            setRole(data.user.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };
      fetchUserRole();
    }
  }, [user]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/company/applicant");
        const data = await response.json();

        // Kiểm tra nếu không có applicants hoặc là null
        if (data?.applicants && data.applicants.length > 0) {
          setApplicants(data.applicants);
        } else {
          setApplicants([]); // Nếu không có applicants, trả về mảng rỗng
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  // Handle "See Application" button click
  const handleSeeApplication = (applicantId) => {
    // Navigate to ApplicantDetails page with applicantId as query parameter
    router.push(`/company/applicant-details?applicantId=${applicantId}`);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-white rounded-lg shadow-sm mx-auto">
      <SidebarCompany />
      <div className="overflow-y-auto w-full p-6">
        <DasborderHeader />
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold">
            Total Applicants : {applicants.length}
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Applicants"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading applicants...</p>
        ) : applicants.length === 0 ? (
          <p>Chưa có Applicant nào</p> // Hiển thị khi không có ứng viên
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium">
                  <input type="checkbox" className="mr-4" />
                  Full Name{" "}
                  <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
                <th className="pb-4 font-medium">
                  Score <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
                <th className="pb-4 font-medium">
                  Hiring Stage{" "}
                  <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
                <th className="pb-4 font-medium">
                  Applied Date{" "}
                  <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
                <th className="pb-4 font-medium">
                  Job Role <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
                <th className="pb-4 font-medium">
                  Action <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
                <th className="pb-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-4 h-4 w-4" />
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                      {applicant.fullName}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">
                        {(applicant.score || 0).toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      {applicant.status}
                    </span>
                  </td>
                  <td className="py-4">
                    {new Date(applicant.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-4">{applicant.currentJobTitle || "N/A"}</td>
                  <td className="py-4">
                    <button
                      className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg"
                      onClick={() => handleSeeApplication(applicant._id)}
                    >
                      See Application
                    </button>
                  </td>
                  <td className="py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicantList;
