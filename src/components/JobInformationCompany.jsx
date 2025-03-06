import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JobInformationCompany = ({ jobData, setJobData }) => {
  const jobType = [
    "Full-Time",
    "Part-Time",
    "Remote",
    "Internship",
    "Contract",
  ];
  const categories = ["Tech", "Marketing", "Finance", "HR", "Sales"];

  // Tính toán ngày tối thiểu (ngày mai)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Kiểm tra xem dueDate có hợp lệ không
  const isDueDateInvalid = jobData.dueDate && jobData.dueDate < tomorrow;

  return (
    <div className="p-6">
      {/* Job Title */}
      <div className="mb-4">
        <label className="block text-gray-700">Job Title</label>
        <input
          type="text"
          value={jobData.title}
          onChange={(e) =>
            setJobData({ ...jobData, title: e.target.value.trim() })
          }
          className="w-full p-2 border rounded"
          required
        />
        {jobData.title.trim() === "" && (
          <div className="text-red-500 text-sm mt-1">Job title is required</div>
        )}
      </div>

      {/* jobType */}
      <div className="mb-4">
        <label className="block text-gray-700">jobType</label>
        <select
          value={jobData.jobType}
          onChange={(e) =>
            setJobData({ ...jobData, jobType: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select type</option>
          {jobType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {jobData.jobType === "" && (
          <div className="text-red-500 text-sm mt-1">
          jobType is required
          </div>
        )}
      </div>

      {/* Salary Range */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700">Min Salary</label>
          <input
            type="number"
            min={0}
            value={jobData.salaryMin}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value));
              setJobData({ ...jobData, salaryMin: value });
            }}
            className="w-full p-2 border rounded"
            required
          />
          {jobData.salaryMin < 0 && (
            <div className="text-red-500 text-sm mt-1">
              Salary must be a non-negative number
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-gray-700">Max Salary</label>
          <input
            type="number"
            min={0}
            value={jobData.salaryMax}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value));
              setJobData({ ...jobData, salaryMax: value });
            }}
            className="w-full p-2 border rounded"
            required
          />
          {jobData.salaryMax < 0 && (
            <div className="text-red-500 text-sm mt-1">
              Salary must be a non-negative number
            </div>
          )}
        </div>
      </div>

      {/* Kiểm tra salaryMin <= salaryMax */}
      {jobData.salaryMin > jobData.salaryMax && (
        <div className="text-red-500 text-sm mt-1 mb-4">
          Min salary must be less than or equal to Max salary
        </div>
      )}

      {/* Categories */}
      <div className="mb-4">
        <label className="block text-gray-700">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded ${jobData.categories.includes(cat)
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
              onClick={() => {
                setJobData({
                  ...jobData,
                  categories: jobData.categories.includes(cat)
                    ? jobData.categories.filter((c) => c !== cat)
                    : [...jobData.categories, cat],
                });
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {jobData.categories.length === 0 && (
          <div className="text-red-500 text-sm mt-1">
            At least one category is required
          </div>
        )}
      </div>

      {/* Required Skills */}
      <div className="mb-4">
        <label className="block text-gray-700">Required Skills</label>
        <input
          type="text"
          value={jobData.requiredSkills.join(", ")}
          onChange={(e) => {
            const skills = e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "");
            setJobData({ ...jobData, requiredSkills: skills });
          }}
          className="w-full p-2 border rounded"
          placeholder="Enter skills separated by commas"
          required
        />
        {jobData.requiredSkills.length === 0 && (
          <div className="text-red-500 text-sm mt-1">
            At least one skill is required
          </div>
        )}
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-gray-700">Application Deadline</label>
        <DatePicker
          selected={jobData.dueDate}
          onChange={(date) => setJobData({ ...jobData, dueDate: date })}
          className="w-full p-2 border rounded"
          minDate={tomorrow}
          required
        />
        {isDueDateInvalid && (
          <div className="text-red-500 text-sm mt-1">
            Due date must be in the future (after today)
          </div>
        )}
      </div>

      {/* Needs */}
      <div className="mb-4">
        <label className="block text-gray-700">Number of Positions</label>
        <input
          type="number"
          min={0}
          value={jobData.needs}
          onChange={(e) => {
            const value = Math.max(0, Number(e.target.value));
            setJobData({ ...jobData, needs: value });
          }}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default JobInformationCompany;