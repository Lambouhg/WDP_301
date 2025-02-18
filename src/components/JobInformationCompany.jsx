import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const JobInformationCompany = () => {
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
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Software Engineer"
              className="w-full"
            />
            <p className="text-sm text-gray-500">At least 80 characters</p>
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label>Type of Employment</Label>
            <p className="text-sm text-gray-500 mb-2">
              You can select multiple type of employment
            </p>
            <div className="space-y-2">
              {employmentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
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
          <div className="space-y-2">
            <Label>Salary</Label>
            <p className="text-sm text-gray-500 mb-2">
              Please specify the estimated salary range for the role. *You can
              leave this blank
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <Input
                  type="number"
                  value={salary.min}
                  onChange={(e) =>
                    setSalary({ ...salary, min: e.target.value })
                  }
                  className="w-24"
                />
              </div>
              <span>to</span>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <Input
                  type="number"
                  value={salary.max}
                  onChange={(e) =>
                    setSalary({ ...salary, max: e.target.value })
                  }
                  className="w-24"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Categories</Label>
            <p className="text-sm text-gray-500 mb-2">
              You can select multiple job categories
            </p>
            <Input placeholder="This is placeholder" />
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <p className="text-sm text-gray-500 mb-2">
              Add required skills for the job
            </p>
            <form onSubmit={handleAddSkill} className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add Skills"
              />
              <Button type="submit" variant="outline">
                Add Skills
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>{skill}</span>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Next Step Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => setStep(Math.min(step + 1, 3))}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next Step
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobInformationCompany;
