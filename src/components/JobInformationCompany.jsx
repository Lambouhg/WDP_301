import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const JobInformationCompany = () => {
  const [salaryMin, setSalaryMin] = useState(5000);
  const [salaryMax, setSalaryMax] = useState(22000);
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([
    "Graphic Design",
    "Communication",
    "Illustrator",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [salary, setSalary] = useState({ min: 5000, max: 22000 });

  const steps = [
    { number: 1, title: "Job Information", icon: "📋" },
    { number: 2, title: "Job Description", icon: "📝" },
    { number: 3, title: "Perks & Benefit", icon: "🎁" },
  ];

  const employmentTypes = [
    "Full-Time",
    "Part-Time",
    "Remote",
    "Internship",
    "Contract",
  ];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="w-full h-full">
      {/* Progress Steps */}
      <div className="flex mb-3 ">
        {steps.map((s) => (
          <div
            key={s.number}
            className={`flex flex-1 items-center p-2 ${
              step === s.number ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-2
              ${step === s.number ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            >
              {s.icon}
            </div>
            <div>
              <div className="text-sm">Step {s.number}/3</div>
              <div className="font-medium ">{s.title}</div>
            </div>
          </div>
        ))}
      </div>

      <Card className="p-3">
        <div className="space-y-6">
          <div className="pb-5 border-b-2 border-gray-300">
            <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
            <p className="text-sm text-gray-500">
              This information will be displayed publicly
            </p>
          </div>

          {/* Job Title */}
          <div className=" flex">
            <div style={{ flex: 1 }}>
              <Label className="jobTitle font-semibold h-full">Job Title</Label>
              <p className="text-gray-400 h-full">
                Job title must be description one position
              </p>
            </div>
            <div style={{ flex: 3 }}>
              <Input
                id="jobTitle"
                placeholder="e.g. Software Engineer"
                className="w-full p-2 border-2 border-gray-300 rounded-sm w-3/5"
              />
              <p className="text-sm text-gray-500">At least 80 characters</p>
            </div>
          </div>

          {/* Employment Type */}
          <div className="space-y-2 flex">
            <div style={{ flex: 1 }}>
              <Label>Type of Employment</Label>
              <p className="text-sm text-gray-500 mb-2">
                You can select multiple type of employment
              </p>
            </div>
            <div className="space-y-5" style={{ flex: 3 }}>
              {employmentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    className="w-6 h-6 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor={type}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="max-w-2xl p-6 space-y-8">
            {/* Salary Section */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">
                Salary
              </label>
              <p className="text-sm text-gray-500">
                Please specify the estimated salary range for the role. *You can
                leave this blank
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="px-3 py-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-24 p-2 border rounded"
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div className="flex items-center">
                  <span className="px-3 py-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-24 p-2 border rounded"
                  />
                </div>
              </div>
              <div className="relative pt-4">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="absolute h-2 bg-blue-600 rounded"
                    style={{
                      left: "20%",
                      right: "20%",
                    }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1/2 -translate-y-1/2"
                    style={{ left: "20%" }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-blue-600 rounded-full -right-2 top-1/2 -translate-y-1/2"
                    style={{ right: "20%" }}
                  />
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">
                Categories
              </label>
              <p className="text-sm text-gray-500">
                You can select multiple job categories
              </p>
              <input
                type="text"
                placeholder="This is placeholder"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Required Skills Section */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">
                Required Skills
              </label>
              <p className="text-sm text-gray-500">
                Add required skills for the job
              </p>
              <button className="flex items-center text-blue-600 space-x-1">
                <span className="text-xl">+</span>
                <span>Add Skills</span>
              </button>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Next Step
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobInformationCompany;
