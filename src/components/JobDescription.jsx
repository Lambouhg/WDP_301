import React from "react";
const JobDescription = ({ jobData, setJobData }) => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <label className="block text-gray-700">Job Description</label>
        <textarea
          value={jobData.jobDescription}
          onChange={(e) => setJobData({ ...jobData, jobDescription: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Responsibilities</label>
        <textarea
          value={jobData.responsibilities}
          onChange={(e) => setJobData({ ...jobData, responsibilities: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Who You Are</label>
        <textarea
          value={jobData.whoYouAre}
          onChange={(e) => setJobData({ ...jobData, whoYouAre: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Nice to Haves</label>
        <textarea
          value={jobData.niceToHaves}
          onChange={(e) => setJobData({ ...jobData, niceToHaves: e.target.value })}
          className="w-full p-2 border rounded h-32"
        />
      </div>
    </div>
  );
};
export default JobDescription;