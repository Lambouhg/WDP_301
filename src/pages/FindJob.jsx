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
import ListJobSearched from "../components/ListJobSearched";

export default function SearchJob() {
  const { user } = useUser();
  const router = useRouter();

  const toDashboard = () => {
    router.push("/");

  };

  const dashboard = () => {
    if (user) {
      router.push("users/dashboard");
    } else {
      document.querySelector('[data-clerk-sign-in-button]').click();
    }

  };

  return (
    <div className="min-h-screen bg-[#fff] text-black p-6">
      {/* Header */}
      <nav className="flex justify-between items-center mb-12 ml-6 mr-5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span
            className="font-bold text-3xl text-blue-500"
            style={{ cursor: "pointer" }}
            onClick={toDashboard}
          >
            Job Finder
          </span>
          <span

            className="text-1xl pl-9 cursor-pointer text-black"
            onClick={() => router.push("/FindJob")}

          >
            Find Jobs
          </span>
          <span
            className="text-1xl pl-2 cursor-pointer text-black"
            onClick={() => router.push("/BrowseCompanies")}
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
              <button className="bg-blue-600 px-4 py-2 rounded-lg" data-clerk-sign-in-button>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mb-5 ml-9 mr-5">
        <h1 className="text-8xl font-bold pb-9 text-black">
          <span className="pr-4">Find your</span>
          <span className="text-blue-500 border-b-2 border-blue-500 height-full">
            dream jobs
          </span>
        </h1>
        <p className="text-white-400 mb-8 text-xl">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>
        {/* Search Bar */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="flex-1 bg-[#E9E9E9FF] p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            className="flex-1 bg-[#E9E9E9FF] p-4 rounded-lg"
          />
          <button className="bg-blue-600 px-8 rounded-lg cursor-pointer text-white font-bold">
            Search for jobs
          </button>
        </div>
      </div>
      <ListJobSearched />


      <Footer />
    </div>
  );
}
