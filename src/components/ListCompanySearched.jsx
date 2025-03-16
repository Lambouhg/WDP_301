import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import img1 from "../assets/image.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function ListCompanySearched() {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);
    const [totalCompanies, setTotalCompanies] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndustry, setSelectedIndustry] = useState("");

    // Fetch companies from API
    const fetchCompanies = async (page = 1, industry = "") => {
        try {
            const query = `/api/company/all?page=${page}&limit=6&industry=${industry}`;
            const res = await fetch(query);
            const data = await res.json();

            if (data.success) {
                setCompanies(data.companies);
                setTotalCompanies(data.totalCompanies);
                setTotalPages(data.totalPages);
                setCurrentPage(page);
            } else {
                console.error("Error fetching companies:", data.message);
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Handle page change
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        fetchCompanies(page, selectedIndustry);
    };

    // Handle industry filter
    const handleIndustryChange = (industry) => {
        setSelectedIndustry(industry);
        fetchCompanies(1, industry);
    };

    return (
        <div className="flex gap-8 mt-5 px-10">
            {/* Sidebar Filters */}
            <div className="w-72 p-5 bg-white shadow-lg rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-4 text-lg text-gray-800">Industry</h3>
                <div className="space-y-3">
                    {[
                        "Advertising", "Business Service", "Blockchain", "Cloud", "Consumer Tech",
                        "Education", "Fintech", "Gaming", "Food & Beverage", "Healthcare", "Hosting", "Media"
                    ].map((industry) => (
                        <div
                            key={industry}
                            className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition 
                            ${selectedIndustry === industry ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
                            onClick={() => handleIndustryChange(industry)}
                        >
                            <input
                                type="radio"
                                className="w-5 h-5 accent-blue-500"
                                checked={selectedIndustry === industry}
                                onChange={() => { }}
                            />
                            <label className="text-md">{industry}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Company Listings */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-semibold text-blue-600">All Companies</h2>
                        <p className="text-sm text-gray-500">Showing {totalCompanies} results</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-md text-gray-500">Sort by:</span>
                        <select className="p-2 border border-gray-300 rounded-md">
                            <option value="relevant">Most relevant</option>
                            <option value="recent">Most recent</option>
                            <option value="popular">Most popular</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {companies.map((company) => (
                        <Card key={company._id} className="shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                            <div
                                className="flex flex-col items-center border border-gray-200 p-6 rounded-md cursor-pointer hover:bg-gray-50"
                                onClick={() => router.push(`/FindCompanyDetail?companyId=${company._id}`)}
                            >
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <img
                                        src={company.logo || img1}
                                        className="w-full h-full object-cover rounded-full"
                                        alt={company.name}
                                    />
                                </div>
                                <h3 className="font-semibold text-lg">{company.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {company.description.length > 100
                                        ? `${company.description.slice(0, 100)}...`
                                        : company.description}
                                </p>
                                <p className="text-sm text-gray-400">{company.employees} employees</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="ghost"
                        className="h-10 w-10 text-gray-800 font-bold"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </Button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={page === currentPage ? "default" : "ghost"}
                            className={page === currentPage ? "bg-blue-600 text-white h-10 w-10 rounded-lg" : "h-10 w-10"}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="ghost"
                        className="h-10 w-10 text-gray-800 font-bold"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ListCompanySearched;
