"use client";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const CompanyFilters = ({
    industries,
    selectedIndustry,
    handleIndustryChange,
    countCompaniesByIndustry,
    isIndustryOpen,
    setIsIndustryOpen,
    handleClearFilters,
}) => {
    return (
        <div className="w-full md:w-72 p-6 bg-white shadow-lg rounded-xl border border-gray-100">
            {/* Filter Header */}
            <div className="mb-6">
                <div
                    className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                >
                    <h3 className="text-xl font-bold text-gray-900">Industry</h3>
                    {isIndustryOpen ? (
                        <FiChevronUp className="text-gray-600" size={20} />
                    ) : (
                        <FiChevronDown className="text-gray-600" size={20} />
                    )}
                </div>

                {/* Industry List */}
                {isIndustryOpen && (
                    <div className="mt-3 space-y-2 transition-all duration-300">
                        {industries.map((industry) => (
                            <div
                                key={industry.name}
                                className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            >
                                <input
                                    type="checkbox"
                                    name="industry"
                                    className="w-5 h-5 accent-indigo-600 focus:ring-indigo-500"
                                    checked={selectedIndustry === industry.name}
                                    onChange={() => handleIndustryChange(industry.name)}
                                />
                                <label className="flex-1 text-sm font-medium text-gray-700">
                                    {industry.name}{" "}
                                    <span className="text-gray-400">
                                        ({countCompaniesByIndustry(industry.name)})
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Clear Filters Button */}
            {selectedIndustry && (
                <Button
                    onClick={handleClearFilters}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                >
                    Clear Filters
                </Button>
            )}
        </div>
    );
};

export default CompanyFilters;