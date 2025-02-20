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

  useEffect(() => {
    if (user) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch("/api/auth/callback/route", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();

          if (data.user && data.user.role) {
            setRole(data.user.role); // Cập nhật role vào state
            // if (data.user.role !== "company") {
            //   router.push("/"); // Nếu không phải admin, điều hướng về trang chủ
            // }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };
      fetchUserRole();
    }
  }, [user, router]);

  const toUserProfile = () => {
    router.push({
      pathname: "/users/UserProfile",
      query: { role },
    });
  };
  const applicants = [
    {
      id: 1,
      name: "Jake Gyll",
      score: 0.0,
      stage: "Shortlisted",
      date: "13 July, 2021",
      role: "Designer",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      score: 0.0,
      stage: "Shortlisted",
      date: "13 July, 2021",
      role: "JavaScript Dev",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      score: 4.5,
      stage: "Shortlisted",
      date: "12 July, 2021",
      role: "Golang Dev",
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      score: 3.75,
      stage: "Shortlisted",
      date: "11 July, 2021",
      role: ".NET Dev",
    },
    {
      id: 5,
      name: "Leif Floyd",
      score: 4.8,
      stage: "Shortlisted",
      date: "11 July, 2021",
      role: "Graphic Design",
    },
    {
      id: 6,
      name: "Jenny Wilson",
      score: 4.6,
      stage: "Shortlisted",
      date: "9 July, 2021",
      role: "Designer",
    },
    {
      id: 7,
      name: "Jerome Bell",
      score: 4.0,
      stage: "Shortlisted",
      date: "5 July, 2021",
      role: "Designer",
    },
    {
      id: 8,
      name: "Eleanor Pena",
      score: 3.9,
      stage: "Shortlisted",
      date: "5 July, 2021",
      role: "Designer",
    },
    {
      id: 9,
      name: "Darrell Steward",
      score: 4.2,
      stage: "Shortlisted",
      date: "3 July, 2021",
      role: "Designer",
    },
  ];

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-white rounded-lg shadow-sm  mx-auto">
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

            <div className="flex gap-2">
              <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
                Caption
              </button>
              <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
                Caption
              </button>
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-4 font-medium">
                <input type="checkbox" className="mr-4" />
                Full Name <ChevronDown className="w-4 h-4 inline-block ml-1" />
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
                key={applicant.id}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="py-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-4 h-4 w-4" />
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    {applicant.name}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{applicant.score.toFixed(1)}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {applicant.stage}
                  </span>
                </td>
                <td className="py-4">{applicant.date}</td>
                <td className="py-4">{applicant.role}</td>
                <td className="py-4">
                  <button
                    className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg"
                    onClick={toUserProfile}
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
      </div>
    </div>
  );
};

export default ApplicantList;
