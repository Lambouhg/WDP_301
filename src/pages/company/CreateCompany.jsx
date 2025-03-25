"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import HeaderCompany from "../../components/HeaderCompany";
import Sidebar from "../../components/SidebarCompany";

const CreateCompany = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    logo: "",
    employees: 0,
    industry: "",
    dateFounded: "",
    techStack: [],
    description: "",
    socialLinks: {
      instagram: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
    },
  });

  const [techInput, setTechInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTechStack = (e) => {
    e.preventDefault();
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTech = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        dateFounded: formatDateForSubmission(formData.dateFounded),
        ownerId: user.id,
      };

      const response = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const errorData = await response.json();

      if (!response.ok) {
        if (
          response.status === 400 &&
          errorData.message.includes("User already owns a company")
        ) {
          alert("User already owns a company. Only one company is allowed.");
          return; // Ngăn không cho xử lý tiếp
        }
        throw new Error(errorData.message || "Failed to create company");
      }

      router.push("/company/companyprofile");
    } catch (error) {
      console.error("Error creating company:", error);
      if (!error.message.includes("User already owns a company")) {
        alert(error.message || "Failed to create company. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date before sending to server
  const formatDateForSubmission = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  };

  // Validate form data before submission
  const validateForm = () => {
    if (!formData.name) {
      alert("Company name is required");
      return false;
    }
    return true;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Company Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Founded
                  </label>
                  <input
                    type="date"
                    name="dateFounded"
                    value={formData.dateFounded}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add technology..."
                />
                <button
                  onClick={handleTechStack}
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData.socialLinks).map((platform) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {platform}
                    </label>
                    <input
                      type="url"
                      name={`socialLinks.${platform}`}
                      value={formData.socialLinks[platform]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${platform} URL`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Creating..." : "Create Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
