import { useEffect, useState } from "react";
import axios from "axios";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

const BrowseCompanies = () => {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("Most relevant");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("/api/company/all");
                setCompanies(response.data);
                setLoading(false);
            } catch (err) {
                setError("Lỗi khi tải danh sách công ty");
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Sample industries for the filter sidebar
    const industries = [
        { name: "Advertising", count: 5 },
        { name: "Business Services", count: 4 },
        { name: "Blockchain", count: 1 },
        { name: "Cloud", count: 2 },
        { name: "Computer Tech", count: 3 },
        { name: "Education", count: 10 },
        { name: "Finance", count: 15 },
        { name: "Gaming", count: 7 },
        { name: "Travel & Bookings", count: 8 },
        { name: "Healthcare", count: 6 },
        { name: "Publishing", count: 3 },
        { name: "Retail", count: 4 }
    ];

    // Sample salary ranges for the filter sidebar
    const salaryRanges = [
        { range: "0-30K", count: 25 },
        { range: "31-60K", count: 30 },
        { range: "61-90K", count: 20 },
        { range: "91-120K", count: 15 },
        { range: "121-150K", count: 10 },
        { range: "151-180K", count: 5 },
        { range: "181K-210K", count: 3 },
        { range: "210K+", count: 2 }
    ];

    const toDashboard = () => {
        router.push("/");
    };

    // Filter companies based on search query
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero section */}
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-blue-600 px-8 rounded-lg cursor-pointer text-white font-bold">
                            Search for jobs
                        </button>
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex">
                    {/* Filters sidebar */}
                    <div className="w-48 pr-6">
                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Industry</h3>
                            {industries.map((industry) => (
                                <div key={industry.name} className="flex items-center mb-1">
                                    <input
                                        type="checkbox"
                                        id={industry.name}
                                        className="mr-2"
                                        checked={selectedIndustry === industry.name}
                                        onChange={() => setSelectedIndustry(industry.name === selectedIndustry ? "" : industry.name)}
                                    />
                                    <label htmlFor={industry.name} className="text-sm flex-1">
                                        {industry.name} ({industry.count})
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Salary Range</h3>
                            {salaryRanges.map((range) => (
                                <div key={range.range} className="flex items-center mb-1">
                                    <input type="checkbox" id={range.range} className="mr-2" />
                                    <label htmlFor={range.range} className="text-sm flex-1">
                                        {range.range} ({range.count})
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Companies list */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-xl">All Jobs</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm">Sort by:</span>
                                <select
                                    className="border rounded px-2 py-1 text-sm"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option>Most relevant</option>
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <p>Đang tải...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-6">
                                {filteredCompanies.map((company) => (
                                    <div key={company._id} className="border rounded-lg p-4 flex">
                                        <div className="mr-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <img src={company.logo} alt={company.name} className="w-8 h-8 object-cover rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-2">
                                                <h3 className="font-bold">{company.name}</h3>
                                                <span className="text-sm text-blue-600">{company.jobsCount || 0} jobs</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3">{company.description}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BrowseCompanies;
