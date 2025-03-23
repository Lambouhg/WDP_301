import React, { useState, useEffect } from "react";
import {
  Camera,
  Building2,
  Globe,
  FileText,
  Link2,
  Bold,
  Italic,
  List,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const Settings = () => {
  const { user } = useUser();
  const [company, setCompany] = useState(null);
  const [newTech, setNewTech] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch dữ liệu công ty
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/company`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }

        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast.error("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [user]);

  // Xử lý thay đổi input
  const handleInputChange = (field, value, subField = null) => {
    if (subField) {
      setCompany((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setCompany((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Điều hướng
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Cập nhật công ty
  const handleUpdateCompany = async () => {
    if (!company?._id) {
      toast.error("Company ID not found!");
      return;
    }

    const confirmUpdate = window.confirm("Do you want to update this company?");
    if (!confirmUpdate) return;

    try {
      const response = await fetch(`/api/company/${company._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });

      if (response.ok) {
        toast.success("Company updated successfully!");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update company");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("An error occurred while updating the company");
    }
  };

  // Xóa công ty
  const handleDeleteCompany = async () => {
    if (!company?._id) {
      toast.error("Company ID not found!");
      return;
    }

    const confirmDelete = window.confirm("Do you want to delete this company?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/company/${company._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Company deleted successfully!");
        router.push("/company/companydashboard");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("An error occurred while deleting the company");
    }
  };

  // Thêm tech stack
  const handleAddTech = async () => {
    if (!newTech.trim() || !company?._id) return;

    const updatedTechStack = [...(company.techStack || []), newTech.trim()];
    try {
      const response = await fetch(`/api/company/${company._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ techStack: updatedTechStack }),
      });

      if (response.ok) {
        handleInputChange("techStack", updatedTechStack);
        setNewTech("");
        toast.success("Technology added successfully!");
      } else {
        toast.error("Failed to add technology");
      }
    } catch (error) {
      console.error("Error adding technology:", error);
      toast.error("An error occurred while adding technology");
    }
  };

  // Xóa tech stack
  const handleRemoveTech = async (techToRemove) => {
    if (!company?._id) return;

    const updatedTechStack = company.techStack.filter(
      (tech) => tech !== techToRemove
    );
    try {
      const response = await fetch(`/api/company/${company._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ techStack: updatedTechStack }),
      });

      if (response.ok) {
        handleInputChange("techStack", updatedTechStack);
        toast.success("Technology removed successfully!");
      } else {
        toast.error("Failed to remove technology");
      }
    } catch (error) {
      console.error("Error removing technology:", error);
      toast.error("An error occurred while removing technology");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!company) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <SidebarCompany />
        <div className="flex-1 p-6 overflow-y-auto">
          <HeaderCompany />
          <div className="flex justify-center items-center h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Bạn chưa tạo hồ sơ công ty</h1>
              <p className="text-gray-600">Hãy tạo hồ sơ công ty để xem nó ở đây.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto h-screen w-screen flex overflow-hidden">
      <SidebarCompany />
      <div className="w-full px-10 pt-5 h-full overflow-y-auto">
        <HeaderCompany />
        <div className="w-full mx-auto py-7">
          <header className="bg-white rounded-2xl shadow-sm mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">OVERVIEW</h1>
            <p className="text-gray-500">Manage your company profile and information</p>
            <nav className="flex mt-6 space-x-1 bg-gray-100 p-1 rounded-xl">
              <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-white text-blue-600 shadow-sm">
                Overview
              </button>
              <button
                className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600"
                onClick={() => handleNavigation("/company/SocialsLink")}
              >
                Social Links
              </button>
              <button
                className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600"
                onClick={() => handleNavigation("/company/CompanyTeam")}
              >
                Team
              </button>
            </nav>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-semibold text-gray-800 mb-4">Quick Navigation</h2>
                <nav className="flex flex-col space-y-4">
                  <a href="#basic" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                    <Building2 className="w-5 h-5" />
                    <span>Basic Information</span>
                  </a>
                  <a href="#logo" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                    <Camera className="w-5 h-5" />
                    <span>Company Logo</span>
                  </a>
                  <a href="#details" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                    <FileText className="w-5 h-5" />
                    <span>Company Details</span>
                  </a>
                  <a href="#about" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                    <Globe className="w-5 h-5" />
                    <span>About Company</span>
                  </a>
                </nav>
                <button
                  onClick={handleDeleteCompany}
                  className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Delete Company
                </button>
              </div>
            </aside>

            <div className="lg:col-span-3 space-y-6">
              {/* Company Logo */}
              <section id="logo" className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Company Logo</h3>
                    <p className="text-gray-500 text-sm">This will be displayed on your public profile</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  {company?.logo ? (
                    <img src={company.logo} alt="Company logo" className="w-24 h-24" />
                  ) : (
                    <span></span>
                  )}
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-600 mb-1">Enter logo URL here</p>
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/logo.png"
                        value={company?.logo || ""}
                        onChange={(e) => handleInputChange("logo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Company Details */}
              <section id="details" className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Company Details</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={company?.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-600"
                        value={company?.website || ""}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={company?.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employees</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={company?.employees || ""}
                        onChange={(e) => handleInputChange("employees", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={company?.industry || ""}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Thêm Date Founded */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Founded</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={company?.dateFounded ? new Date(company.dateFounded).toISOString().split("T")[0] : ""}
                        onChange={(e) => handleInputChange("dateFounded", e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Thêm Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={company?.contact?.email || ""}
                          onChange={(e) => handleInputChange("contact", e.target.value, "email")}
                        />
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={company?.contact?.phone || ""}
                          onChange={(e) => handleInputChange("contact", e.target.value, "phone")}
                        />
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {company?.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-600"
                        >
                          {tech}
                          <button
                            type="button"
                            className="ml-2 text-purple-400 hover:text-purple-600"
                            onClick={() => handleRemoveTech(tech)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add technology"
                      />
                      <button
                        type="button"
                        onClick={handleAddTech}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={!newTech.trim()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* About Company */}
              <section id="about" className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">About Company</h3>
                <div className="border rounded-xl overflow-hidden">
                  <div className="flex items-center space-x-2 border-b p-3">
                    <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                      <Bold className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                      <Italic className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                      <List className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                      <Link2 className="w-5 h-5" />
                    </button>
                  </div>
                  <textarea
                    className="w-full p-4 min-h-[200px] resize-none border-none focus:ring-0"
                    placeholder="Write about your company..."
                    value={company?.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  <div className="border-t p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Markdown supported</span>
                    <span className="text-sm text-gray-500">{company?.description?.length || 0} / 500</span>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleUpdateCompany}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;