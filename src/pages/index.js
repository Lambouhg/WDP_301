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
// import Link from "next/link";
import "./globals.css";
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
          if (!window.location.pathname.startsWith("/dashboard")) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error saving user to database:", error);
        }
      };
      saveUserToDatabase();
    }
  }, [user, router]);

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
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="font-bold text-2xl">Job Finder</span>
          <span className="text-1xl pl-9">Find Jobs</span>
          <span className="text-1xl ">Browse Companies</span>
        </div>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 px-4 py-2 rounded-lg">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-8xl font-bold pb-9">
          Discover
          <br />
          more than
          <br />
          <span className="text-blue-500 border-b-2 border-blue-500 height-full">
            5000+ Jobs
          </span>
        </h1>
        <p className="text-gray-400 mb-8">
          Great platform for the job seeker that searching for
          <br />
          new career heights and passionate about startups
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
          <button className="bg-blue-600 px-8 rounded-lg">
            Search for jobs
          </button>
        </div>

        {/* Company Logos */}
        <div className="flex items-center space-x-8 opacity-50">
          <span className="text-sm">Companies we helped grow:</span>
          {["Coinbase", "Intel", "Tesla", "AMD", "Talkit"].map((company) => (
            <span key={company} className="text-lg font-semibold">
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Explore by category</h2>
          <button className="text-blue-500">Show all jobs</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-[#1C1C27] p-6 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Jobs */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured jobs</h2>
          <button className="text-blue-500">Show all jobs</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {featuredJobs.map((job, index) => (
            <div key={index} className="bg-[#1C1C27] p-6 rounded-xl">
              <div className="w-12 h-12 bg-gray-700 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
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
    </div>
  );
}
