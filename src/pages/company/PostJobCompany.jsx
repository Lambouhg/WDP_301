import React, { useState } from "react";
import JobInformationCompany from "../../components/JobInformationCompany";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import JobDescription from "../../components/JobDescription";
import BenefitsPage from "../../components/BenefitPage";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'; // Thêm import này

const PostJobCompany = () => {
  const router = useRouter(); // Khởi tạo router
  const [activeTab, setActiveTab] = useState("JobInformationCompany");
  const { getToken } = useAuth();
  const [jobData, setJobData] = useState({
    title: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    categories: [],
    requiredSkills: [],
    jobDescription: "",
    responsibilities: "",
    whoYouAre: "",
    niceToHaves: "",
    perksAndBenefits: [],
    dueDate: new Date(),
    needs: 0,
  });

  const steps = [
    { key: "JobInformationCompany", number: 1, title: "Job Information", icon: "📋" },
    { key: "JobDescription", number: 2, title: "Job Description", icon: "📝" },
    { key: "BenefitsPage", number: 3, title: "Perks & Benefit", icon: "🎁" },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.key === activeTab);
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].key);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((s) => s.key === activeTab);
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].key);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        'title', 'jobType', 'salaryMin', 'salaryMax',
        'categories', 'requiredSkills', 'jobDescription',
        'responsibilities', 'whoYouAre', 'dueDate'
      ];
      
      const missingFields = requiredFields.filter(field => !jobData[field]);
      if (missingFields.length > 0) {
        return alert(`Missing fields: ${missingFields.join(', ')}`);
      }

      // Format data for API
      const formattedData = {
        ...jobData,
        salaryMin: Number(jobData.salaryMin),
        salaryMax: Number(jobData.salaryMax),
        dueDate: jobData.dueDate.toISOString(),
        needs: Number(jobData.needs) || 0
      };

      // Get authentication token
      const token = await getToken();

      // API call
      const response = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      if (response.ok) {
        router.push('/company/JobListingCompany'); // Thêm dấu / ở đầu
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarCompany />
      <div className="flex flex-col h-screen w-screen overflow-y-auto">
        <div className="m-6">
          <HeaderCompany />
        </div>
        <div className="flex">
          {steps.map((s) => (
            <div
              key={s.key}
              className={`flex flex-1 items-center p-2 cursor-pointer ${
                activeTab === s.key ? "text-blue-600" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(s.key)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-2
                      ${
                        activeTab === s.key
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
              >
                {s.icon}
              </div>
              <div>
                <div className="text-sm">Step {s.number}/3</div>
                <div className="font-medium">{s.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {activeTab === "JobInformationCompany" && (
            <JobInformationCompany jobData={jobData} setJobData={setJobData} />
          )}
          {activeTab === "JobDescription" && (
            <JobDescription jobData={jobData} setJobData={setJobData} />
          )}
          {activeTab === "BenefitsPage" && (
            <BenefitsPage jobData={jobData} setJobData={setJobData} />
          )}
        </div>
        <div className="flex justify-between p-4">
          {activeTab !== "JobInformationCompany" && (
            <button onClick={handleBack} className="px-4 py-2 bg-gray-400 text-white rounded">
              Back
            </button>
          )}
          <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">
            {activeTab === "BenefitsPage" ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobCompany;