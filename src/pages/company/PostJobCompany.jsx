import React, { useState } from "react";
import JobInformationCompany from "../../components/JobInformationCompany";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import JobDescription from "../../components/JobDescription";
import BenefitsPage from "../../components/BenefitPage";

const PostJobCompany = () => {
  const [activeTab, setActiveTab] = useState("JobInformationCompany");

  const steps = [
    {
      key: "JobInformationCompany",
      number: 1,
      title: "Job Information",
      icon: "📋",
    },
    { key: "JobDescription", number: 2, title: "Job Description", icon: "📝" },
    { key: "BenefitsPage", number: 3, title: "Perks & Benefit", icon: "🎁" },
  ];

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
          {activeTab === "JobInformationCompany" && <JobInformationCompany />}
          {activeTab === "JobDescription" && <JobDescription />}
          {activeTab === "BenefitsPage" && <BenefitsPage />}
        </div>
      </div>
    </div>
  );
};

export default PostJobCompany;
