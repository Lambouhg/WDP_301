import React from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
const UserMyApplication = () => {
  const tabs = [
    { name: "All", count: 45 },
    { name: "In Review", count: 34 },
    { name: "Interviewing", count: 18 },
    { name: "Assessment", count: 5 },
    { name: "Offered", count: 2 },
    { name: "Hired", count: 1 },
  ];

  const applications = [
    {
      id: 1,
      company: "Nomad",
      role: "Social Media Assistant",
      date: "24 July 2021",
      status: "In Review",
    },
    {
      id: 2,
      company: "Udacity",
      role: "Social Media Assistant",
      date: "20 July 2021",
      status: "In Review",
    },
    {
      id: 3,
      company: "Packer",
      role: "Social Media Assistant",
      date: "16 July 2021",
      status: "In Review",
    },
    {
      id: 4,
      company: "Divvy",
      role: "Social Media Assistant",
      date: "14 July 2021",
      status: "Interviewing",
    },
    {
      id: 5,
      company: "DigitalOcean",
      role: "Social Media Assistant",
      date: "10 July 2021",
      status: "In Review",
    },
  ];

  return (
    <div className="bg-white flex overflow-hidden rounded-lg shadow-lg w-screen h-screen">
      <Sidebar />
      <div className="w-full overflow-y-auto pb-6">
        <div className="w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
          <DashboardHeader dashboardHeaderName={"My Applications"} />
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Keep it up, Jake</h1>
          <select className="border rounded-md px-3 py-1">
            <option>Jul 19 - Jul 25</option>
          </select>
        </div>

        {/* New Feature Notice */}
        <div className="bg-purple-50 p-4 rounded-lg mb-6 relative">
          <div className="flex gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded-lg"></div>
            </div>
            <div>
              <h3 className="text-purple-600 font-medium mb-1">New Feature</h3>
              <p className="text-gray-600 text-sm">
                You can request a follow-up 7 days after applying for a job if
                the application status is in review. Only one follow-up is
                allowed per job.
              </p>
            </div>
          </div>
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`pb-4 px-1 ${
                  tab.name === "All"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500"
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Applications History</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-9 pr-3 py-2 border rounded-lg"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead className="text-left text-gray-500 text-sm">
              <tr>
                <th className="py-2">#</th>
                <th>Company Name</th>
                <th>Roles</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="py-4">{app.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-emerald-500 rounded-sm"></div>
                      </div>
                      {app.company}
                    </div>
                  </td>
                  <td>{app.role}</td>
                  <td>{app.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        app.status === "Interviewing"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            ‹
          </button>
          <button className="px-3 py-1 bg-purple-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            4
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            5
          </button>
          <span className="px-3 py-1">...</span>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            33
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMyApplication;
