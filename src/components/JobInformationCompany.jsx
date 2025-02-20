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
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([
    "Graphic Design",
    "Communication",
    "Illustrator",
    "Illustrator",
    "Illustrator",
    "Illustrator",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [salary, setSalary] = useState({ min: 5000, max: 22000 });
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };
  const minSalary = 0;
  const maxSalary = 50000; // Maximum possible salary
  const minPosition = ((salaryMin - minSalary) / (maxSalary - minSalary)) * 100;
  const maxPosition = ((salaryMax - minSalary) / (maxSalary - minSalary)) * 100;

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

  const handleSliderChange = (e, isMin) => {
    const value = parseInt(e.target.value);
    if (isMin) {
      if (value < salaryMax) {
        setSalaryMin(value);
      }
    } else {
      if (value > salaryMin) {
        setSalaryMax(value);
      }
    }
  };
  return (
    <div className="w-full h-full p-6">
      {/* Progress Steps */}

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
          <div className="p-6 space-y-8">
            {/* Salary Section */}
            <div className="space-y-2 flex">
              <div style={{ flex: 1 }} className="w-full h-full mr-10">
                <label className="text-lg font-medium text-gray-700">
                  Salary
                </label>
                <p className="text-sm text-gray-500">
                  Please specify the estimated salary range for the role. *You
                  can leave this blank
                </p>
              </div>
              <div style={{ flex: 3 }}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={salaryMin}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < salaryMax) setSalaryMin(value);
                      }}
                      className="w-24 p-2 border rounded"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex items-center">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={salaryMax}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > salaryMin) setSalaryMax(value);
                      }}
                      className="w-24 p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="relative pt-6 pb-2">
                  {/* Background track */}
                  <div className="absolute w-full h-2 bg-gray-200 rounded" />

                  {/* Active track */}
                  <div
                    className="absolute h-2 bg-blue-600 rounded"
                    style={{
                      left: `${minPosition}%`,
                      right: `${100 - maxPosition}%`,
                    }}
                  />

                  {/* Min handle */}
                  <input
                    type="range"
                    min={minSalary}
                    max={maxSalary}
                    value={salaryMin}
                    onChange={(e) => handleSliderChange(e, true)}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
                    style={{
                      "--thumb-size": "16px",
                      "--thumb-color": "#2563eb",
                    }}
                  />

                  {/* Max handle */}
                  <input
                    type="range"
                    min={minSalary}
                    max={maxSalary}
                    value={salaryMax}
                    onChange={(e) => handleSliderChange(e, false)}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
                    style={{
                      "--thumb-size": "16px",
                      "--thumb-color": "#2563eb",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-2 flex">
              <div style={{ flex: 1 }} className="mr-10">
                <label className="text-lg font-medium text-gray-700">
                  Categories
                </label>
                <p className="text-sm text-gray-500">
                  You can select multiple job categories
                </p>
              </div>
              <input
                type="text"
                placeholder="This is placeholder"
                className="w-full p-2 border rounded ml-10"
                style={{ flex: 3 }}
              />
            </div>

            {/* Required Skills Section */}
            <div className="space-y-2 flex w-full">
              <div style={{ flex: 1 }} className="mr-10">
                <label className="text-lg font-medium text-gray-700">
                  Required Skills
                </label>
                <p className="text-sm text-gray-500">
                  Add required skills for the job
                </p>
              </div>
              <div style={{ flex: 3 }} className="h-full w-screen">
                <button className="flex items-center text-blue-800 border-2 border-gray-300 rounded px-3 py-1 hover:bg-gray-300">
                  <span className="text-xl">+</span>
                  <span>Add Skills</span>
                </button>
                <div className="flex flex-wrap gap-2 max-w-3xl">
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
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Next Step
              </button>
            </div>

            <style jsx>{`
              input[type="range"] {
                -webkit-appearance: none;
                pointer-events: auto;
              }

              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: var(--thumb-size);
                width: var(--thumb-size);
                border-radius: 50%;
                background: var(--thumb-color);
                cursor: pointer;
                pointer-events: auto;
              }

              input[type="range"]::-moz-range-thumb {
                height: var(--thumb-size);
                width: var(--thumb-size);
                border-radius: 50%;
                background: var(--thumb-color);
                cursor: pointer;
                border: none;
                pointer-events: auto;
              }
            `}</style>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobInformationCompany;
