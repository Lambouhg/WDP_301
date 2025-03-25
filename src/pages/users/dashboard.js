/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardHeader from "../../components/DashboardHeader";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  const applications = [
    {
      id: 1,
      position: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      dateApplied: "24 July 2021",
      status: "In Review",
    },
    {
      id: 2,
      position: "Social Media Assistant",
      company: "Udacity",
      location: "New York, USA",
      type: "Full-Time",
      dateApplied: "23 July 2021",
      status: "In Review",
    },
    {
      id: 3,
      position: "Social Media Assistant",
      company: "Packer",
      location: "Madrid, Spain",
      type: "Full-Time",
      dateApplied: "22 July 2021",
      status: "In Review",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen w-full overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full overflow-y-auto md:h-screen pb-10">
        <main className="flex-1">
          <div className="w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
            <DashboardHeader dashboardHeaderName={"Dashboard"} />
          </div>
          <div className="ml-4 md:ml-6 mr-4 md:mr-6">
            <h1 className="text-xl font-bold mt-5">
              Welcome back, {user.fullName}!
            </h1>

            <p className="text-gray-600">
              Here is what is happening with your job search applications from
              today.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              <div className="flex flex-col gap-y-4 md:gap-y-16">
                <StatCard title="Total Jobs Applied" value="45" />
                <StatCard title="Interviewed" value="18" />
              </div>
              <CardChart
                title="Jobs Applied Status"
                data={[40, 60]}
                className="col-span-1 md:col-span-1"
              />
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center col-span-1 md:col-span-1">
                <h2 className="text-start font-semibold border-b-2 text-gray-500 w-full">
                  Upcoming Interviews
                </h2>
                <div className="flex items-center justify-between w-full mt-5">
                  <h2 className="text-start font-semibold">
                    Today, <span className="font-normal">26 November</span>
                  </h2>
                  <span className="ml-auto text-lg">{"<  >"}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-4">
                    <div className="w-full">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-nowrap text-sm">
                          <span className="inline-flex text-sm w-24">
                            10:00 AM
                          </span>
                          <div className="w-full border-b-2 border-gray-500 mb-2"></div>
                        </div>
                        <div className="flex flex-nowrap text-sm">
                          <span className="inline-flex text-sm w-24 items-center">
                            10:00 AM
                          </span>
                          <div className="w-full mb-2 bg-gray-200 rounded-md">
                            <div className="justify-center h-16 flex flex-row space-x-4 items-center">
                              <img
                                src="https://placehold.co/50x50"
                                alt="Square Placeholder"
                                className="w-12 h-12 rounded-full ml-3"
                              />
                              <div className="w-full flex flex-col justify-start overflow-hidden">
                                <div className="w-full flex flex-col items-start overflow-hidden">
                                  <h5 className="text-sm font-semibold truncate w-full">
                                    Job Bartmann
                                  </h5>
                                  <p className="text-xs text-gray-600 break-words w-full">
                                    HR Manager at Divvy
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-nowrap text-sm">
                          <span className="inline-flex text-sm w-24">
                            10:00 AM
                          </span>
                          <div className="w-full border-b-2 border-gray-500 mb-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">
                Recent Applications History
              </h3>

              <div className="border rounded-lg shadow-sm">
                <div className="p-0">
                  <div className="divide-y">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 flex flex-col md:grid md:grid-cols-2 gap-4 items-center justify-between"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-emerald-500 rounded" />
                          </div>
                          <div>
                            <h4 className="font-medium">{app.position}</h4>
                            <p className="text-sm text-gray-500">
                              {app.company} • {app.location} • {app.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full space-y-2 md:space-y-0">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Date Applied
                            </p>
                            <p className="text-sm">{app.dateApplied}</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-sm">
                            {app.status}
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="text-blue-700 hover:underline">
                  View all applications history →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md  cursor-pointer w-full h-full">
      <h3 className="text-xl font-semibold ">{title}</h3>
      {children || <p className="text-5xl font-bold">{value}</p>}
    </div>
  );
}

function CardChart({ title, data }) {
  const chartData = {
    labels: ["Unsuitable", "Interviewed"],
    datasets: [
      {
        data: data, // [40, 60]
        backgroundColor: ["#2563eb", "#d1d5db"], // Màu sắc
        hoverBackgroundColor: ["#1e40af", "#9ca3af"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: "70%", // Độ rỗng bên trong
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    animation: { animateRotate: true, animateScale: true },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold mb-5">{title}</h3>
      <div className="relative w-36 h-36 mx-auto">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {data[0]}%
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
          <p>Unsuitable</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
          <p>Interviewed</p>
        </div>
      </div>
      <a className="text-blue-800 font-semibold mt-5 inline-block" href="#">
        View All Applications {"->"}
      </a>
    </div>
  );
}
