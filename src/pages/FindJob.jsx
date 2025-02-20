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
import "./globals.css";
import Footer from "../components/Footer";
import ListJobSearched from "../components/ListJobSearched";

export default function SearchJob() {
  const router = useRouter();
  const toDashboard = () => {
    router.push("/index");
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
            onClick={() => router.push("/SearchJob")}
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
      <div className="mb-5 ml-9 mr-5">
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
      </div>
      <div className="ml-9 mr-5" style={{ display: "none" }}>
        <ListJobSearched />
      </div>
      <Footer />
    </div>
  );
}
