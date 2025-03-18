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
    <div className="min-h-screen bg-[#0F0F1A] text-white p-6">
      {/* Header */}
      <nav className="flex justify-between items-center mb-12 ml-6 mr-5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span
            className="font-bold text-3xl"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Job Finder
          </span>
          <span
            className="text-1xl pl-2 pt-3 cursor-pointer"
            onClick={toUserSearch}
          >
            Find Jobs
          </span>
          <span
            className="text-1xl pl-2  pt-3 cursor-pointer"
            onClick={() => router.push("/BrowseCompanies")}
          >
            Browse Companies
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-1xl pt-3 cursor-pointer" onClick={dashboard}>
            Dashboard
          </span>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="bg-blue-600 px-4 py-2 rounded-lg"
                data-clerk-sign-in-button
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mb-16 ml-9 mr-5">
        <h1 className="text-8xl font-bold pb-9">
          Discover
          <br />
          more than
          <br />
          <span className="text-blue-500 border-b-2 border-blue-500 height-full">
            5000+ Jobs
          </span>
        </h1>
        <p className="text-gray-400 mb-8 text-xl">
          Great platform for the job seeker that searching for
          <br />
          new career heights and passionate about startups.
        </p>

        {/* Search Bar */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="flex-1 bg-[#1C1C27] p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            className="flex-1 bg-[#1C1C27] p-4 rounded-lg"
          />
          <button className="bg-blue-600 px-8 rounded-lg cursor-pointer">
            Search for jobs
          </button>
        </div>

        {/* Company Logos */}
        <div className="flex flex-col space-y-4 opacity-50 ">
          <span className="text-lg">Companies we helped grow:</span>
          <div className="flex items-center justify-between space-x-8 cursor-pointer">
            {["Coinbase", "Intel", "Tesla", "AMD", "Talkit"].map((company) => (
              <span
                key={company}
                className="text-4xl font-mono font-semibold tracking-widest uppercase"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-16 ml-9 mr-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Explore by category</h2>
          <button className="text-blue-500">Show all jobs</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-[#1C1C27] p-6 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer bg-white"
            >
              <h3 className="font-semibold mb-2 text-black">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="mb-16 ml-9 mr-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured jobs</h2>
          <button className="text-blue-500">Show all jobs</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
              className="hover:bg-blue-600 bg-white p-6 rounded-xl cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-700 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-black mb-4">
                {job.company} • {job.location}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{job.salary}</span>
                <span className="text-sm bg-blue-600/20 text-blue-500 px-3 py-1 rounded-full">
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
