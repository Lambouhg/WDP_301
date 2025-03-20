"use client";

const CompanySort = ({ sortOption, handleSortChange }) => {
    return (
        <div className="flex items-center gap-2">
            {/* Sort Label */}
            <span className="text-md text-gray-500">Sort by:</span>

            {/* Sort Options */}
            <select
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
            </select>
        </div>
    );
};

export default CompanySort;