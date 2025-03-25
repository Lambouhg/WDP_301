"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "../components/Footer";
export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const saveUserToDatabase = async () => {
        try {
          const response = await fetch("/api/auth/callback/route", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          console.log("User info saved:", data);

          if (data.user) {
            // 🛑 Lưu user vào localStorage hoặc sessionStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            // Điều hướng dựa trên role
            if (data.user.role === "admin") {
              router.push("/admin/admdashboard");
            } else {
              router.push("/");
            }
          }
        } catch (error) {
          console.error("Error saving user to database:", error);
        }
      };

      saveUserToDatabase();
    }
  }, [user, router]); // Đóng useEffect đúng cách

  const dashboard = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userFromStorage = JSON.parse(savedUser);
      const role = userFromStorage.role;
      if (role === "user") {
        router.push("/users/dashboard");
      } else if (role === "company") {
        router.push("/company/companydashboard");
      }
      console.log("User role:", role);
    } else {
      document.querySelector("[data-clerk-sign-in-button]").click();
    }
  };

  const toUserSearch = () => {
    router.push({
      pathname: "/FindJob",
    });
  };
  const categories = [
    { name: "Design", count: "1.2k+ Jobs" },
    { name: "Sales", count: "800+ Jobs" },
    { name: "Marketing", count: "1.4k+ Jobs" },
    { name: "Finance", count: "900+ Jobs" },
    { name: "Technology", count: "2k+ Jobs" },
    { name: "Engineering", count: "1.5k+ Jobs" },
    { name: "Business", count: "1.1k+ Jobs" },
    { name: "Human Resource", count: "700+ Jobs" },
  ];

  const featuredJobs = [
    {
      title: "Lead Marketing",
      company: "Apple Inc.",
      location: "California, USA",
      salary: "$50k-$70k",
      type: "Full Time",
    },
    {
      title: "Brand Designer",
      company: "Google LLC",
      location: "New York, USA",
      salary: "$60k-$80k",
      type: "Full Time",
    },
    {
      title: "Front Marketing",
      company: "Netflix",
      location: "Remote",
      salary: "$45k-$65k",
      type: "Full Time",
    },
    {
      title: "Visual Designer",
      company: "Microsoft",
      location: "Seattle, USA",
      salary: "$55k-$75k",
      type: "Full Time",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-4 sm:p-6">
      {/* Header */}
      <nav className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 sm:space-x-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span
              className="font-bold text-2xl sm:text-3xl"
              onClick={() => router.push("/")}
            >
              Job Finder
            </span>
          </div>
          <div className="flex space-x-4">
            <span
              className="text-sm sm:text-base cursor-pointer"
              onClick={toUserSearch}
            >
              Find Jobs
            </span>
            <span
              className="text-sm sm:text-base cursor-pointer"
              onClick={() => router.push("/BrowseCompanies")}
            >
              Browse Companies
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span
            className="text-sm sm:text-base cursor-pointer"
            onClick={dashboard}
          >
            Dashboard
          </span>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="bg-blue-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base"
                data-clerk-sign-in-button
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mb-12 sm:mb-16 px-4 sm:px-9">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold pb-6 sm:pb-9">
          Discover
          <br />
          more than
          <br />
          <span className="text-blue-500 border-b-2 border-blue-500">
            5000+ Jobs
          </span>
        </h1>
        <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-xl">
          Great platform for the job seeker that searching for
          <br />
          new career heights and passionate about startups.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full sm:flex-1 bg-[#1C1C27] p-3 sm:p-4 rounded-lg text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full sm:flex-1 bg-[#1C1C27] p-3 sm:p-4 rounded-lg text-sm sm:text-base"
          />
          <button className="w-full sm:w-auto bg-blue-600 px-4 sm:px-8 py-3 rounded-lg cursor-pointer text-sm sm:text-base">
            Search for jobs
          </button>
        </div>

        {/* Company Logos */}
        <div className="flex flex-col space-y-4 opacity-50">
          <span className="text-base sm:text-lg">
            Companies we helped grow:
          </span>
          <div className="flex flex-wrap items-center justify-between space-x-4 sm:space-x-8 cursor-pointer">
            {["Coinbase", "Intel", "Tesla", "AMD", "Talkit"].map((company) => (
              <span
                key={company}
                className="text-2xl sm:text-4xl font-mono font-semibold tracking-widest uppercase mb-2"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12 sm:mb-16 px-4 sm:px-9">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            Explore by category
          </h2>
          <button className="text-blue-500 text-sm sm:text-base">
            Show all jobs
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-[#1C1C27] p-4 sm:p-6 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
            >
              <h3 className="font-semibold mb-2 text-sm sm:text-base">
                {category.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                {category.count}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="mb-12 sm:mb-16 px-4 sm:px-9">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            Featured jobs
          </h2>
          <button className="text-blue-500 text-sm sm:text-base">
            Show all jobs
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl cursor-pointer hover:bg-blue-600"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base text-black">
                {job.title}
              </h3>
              <p className="text-xs sm:text-sm text-black mb-4">
                {job.company} • {job.location}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-400">
                  {job.salary}
                </span>
                <span className="text-xs sm:text-sm bg-blue-600/20 text-blue-500 px-2 sm:px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
