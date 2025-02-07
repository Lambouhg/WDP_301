"use client";
import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { useRouter } from 'next/router'; // Thêm useRouter để redirect
import { useEffect } from 'react';
import { FiMessageSquare, FiBriefcase, FiSearch, FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import './globals.css';

export default function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter(); // Khai báo useRouter để điều hướng

  useEffect(() => {
    if (!user) {
      router.push('/'); // Nếu chưa đăng nhập, chuyển hướng về trang chủ
    }
  }, [user, router]); // Chạy khi user thay đổi

  if (!user) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading trong khi chuyển hướng
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Job Finder</h2>
          <nav className="space-y-4">
            <NavItem icon={<FiHome />} label="Dashboard" active />
            <NavItem icon={<FiMessageSquare />} label="Messages" />
            <NavItem icon={<FiBriefcase />} label="My Applications" />
            <NavItem icon={<FiSearch />} label="Find Jobs" />
            <NavItem icon={<FiSettings />} label="Settings" />
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <UserButton />
            <div>
              <p className="text-sm font-semibold">{user.fullName}</p>
              <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut({ redirectUrl: "/" }); // Redirect to the homepage (index.js) after sign out
            }}
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 w-full"
          >
            <FiLogOut className="text-lg" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Chào, {user.fullName}!</h1>
        <p className="text-gray-600">Dưới đây là tổng quan về các ứng tuyển gần đây.</p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <StatCard title="Total Jobs Applied" value="45" />
          <StatCard title="Interviewed" value="18" />
          <StatCard title="Jobs Applied Status">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-blue-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="40 60"
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                40% Interviewed
              </p>
            </div>
          </StatCard>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Interviews</h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
              26
            </div>
            <div>
              <p className="text-sm text-gray-500">10:30 AM</p>
              <p className="font-semibold">Joe Bartmann</p>
              <p className="text-sm text-gray-500">HR Manager at Divvy</p>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Applications History</h2>
          <div className="divide-y">
            {[ 
              { job: "Social Media Assistant", company: "Nomad", location: "Paris, France", date: "24 July 2021" }, 
              { job: "Social Media Assistant", company: "Udacity", location: "New York, USA", date: "23 July 2021" }, 
              { job: "Social Media Assistant", company: "Packer", location: "Madrid, Spain", date: "22 July 2021" } 
            ].map((app, index) => (
              <ApplicationItem key={index} job={app.job} company={app.company} location={app.location} date={app.date} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300
        ${active ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-200"}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// Statistic Card Component
function StatCard({ title, value, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      {children || <p className="text-3xl font-bold">{value}</p>}
    </div>
  );
}

// Application Item Component
function ApplicationItem({ job, company, location, date }) {
  return (
    <div className="py-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{job}</h3>
        <p className="text-sm text-gray-500">{company} • {location}</p>
      </div>
      <p className="text-sm text-gray-500">{date}</p>
      <span className="px-3 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">In Review</span>
    </div>
  );
} 
