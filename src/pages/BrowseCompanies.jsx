"use client";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import ListCompaniesSearched from "../components/ListCompaniesSearched";

export default function BrowseCompanies() {
    const router = useRouter();

    const toDashboard = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-[#fff] text-black ">
            {/* Header */}
            <nav className="flex justify-between items-center mb-12 ml-6 mr-5 mt-6">
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

            {/* Hero section */}
            <div className="mb-5 ml-9 mr-5">
                <h1 className="text-8xl font-bold pb-9 text-black">
                    <span className="pr-4">Find your</span>
                    <span className="text-blue-500 border-b-2 border-blue-500 height-full">
                        dream companies
                    </span>
                </h1>
                <p className="text-white-400 mb-8 text-xl">
                    Find the dream companies you dream work for
                </p>
                {/* Search Bar */}
                <ListCompaniesSearched />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}