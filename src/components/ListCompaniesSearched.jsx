"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CompanyFilters from "./BrowseCompanies/CompanyFilters";
import Pagination from "./BrowseCompanies/Pagination";
import CompanySort from "./BrowseCompanies/CompanySort";

const ListCompaniesSearched = () => {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState("relevant");
    const [sortDirection, setSortDirection] = useState("desc");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isIndustryOpen, setIsIndustryOpen] = useState(true);
    const companiesPerPage = 6;

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
        { name: "Retail", count: 4 },
    ];

    const handleCompanyClick = (companyId) => {
        router.push(`/company/${companyId}`);
    };

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/32";
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    const countCompaniesByIndustry = (industryName) => {
        return companies.filter(
            (company) =>
                company.industry &&
                company.industry.toLowerCase() === industryName.toLowerCase()
        ).length;
    };

    const handleIndustryChange = (industry) => {
        setSelectedIndustry(selectedIndustry === industry ? "" : industry);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSelectedIndustry("");
        setCurrentPage(1);
    };

    const filteredAndSortedCompanies = () => {
        let result = [...companies];

        if (searchQuery) {
            result = result.filter((company) =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedIndustry) {
            result = result.filter(
                (company) =>
                    company.industry &&
                    company.industry.toLowerCase() === selectedIndustry.toLowerCase()
            );
        }

        if (sortOption === "recent") {
            result.sort((a, b) => {
                const aLatestJob =
                    a.jobs && a.jobs.length > 0
                        ? Math.max(...a.jobs.map((job) => new Date(job.createdAt)))
                        : 0;
                const bLatestJob =
                    b.jobs && b.jobs.length > 0
                        ? Math.max(...b.jobs.map((job) => new Date(job.createdAt)))
                        : 0;
                return sortDirection === "desc"
                    ? bLatestJob - aLatestJob
                    : aLatestJob - bLatestJob;
            });
        } else if (sortOption === "popular") {
            result.sort((a, b) => {
                const aCount = a.jobsCount || 0;
                const bCount = b.jobsCount || 0;
                return sortDirection === "desc" ? bCount - aCount : aCount - bCount;
            });
        }

        return result;
    };

    const allCompanies = filteredAndSortedCompanies();
    const totalPages = Math.ceil(allCompanies.length / companiesPerPage);
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = allCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="flex-1 bg-[#E9E9E9FF] p-4 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="text-md text-gray-500">
                Popular: Twitter, Microsoft, Apple, Facebook
            </div>

            {loading ? (
                <p>Đang tải...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex flex-col">
                    <div className="flex">
                        <CompanyFilters
                            industries={industries}
                            selectedIndustry={selectedIndustry}
                            handleIndustryChange={handleIndustryChange}
                            countCompaniesByIndustry={countCompaniesByIndustry}
                            isIndustryOpen={isIndustryOpen}
                            setIsIndustryOpen={setIsIndustryOpen}
                            handleClearFilters={handleClearFilters}
                        />

                        <div className="flex-1 ml-5">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-indigo-700">All Companies</h2>
                                    <p className="text-sm text-gray-500">
                                        Showing {allCompanies.length} results
                                    </p>
                                </div>
                                {/* Sort by */}
                                <CompanySort
                                    sortOption={sortOption}
                                    handleSortChange={handleSortChange}
                                />
                            </div>

                            {/* Company Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentCompanies.map((company) => (
                                    <div
                                        key={company._id}
                                        className="shadow-md rounded-lg hover:shadow-lg transition duration-200 border border-gray-200 cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleCompanyClick(company._id)}
                                    >
                                        <div className="relative p-4">
                                            <p className="absolute top-2 right-2 text-xs text-blue-600 font-medium">
                                                {company.jobsCount || 0} jobs
                                            </p>
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                <img
                                                    src={company.logo || "https://via.placeholder.com/32"}
                                                    className="w-full h-full object-cover rounded-full"
                                                    alt={company.name}
                                                    onError={handleImageError}
                                                />
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                                {company.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-6">
                                                {company.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListCompaniesSearched;