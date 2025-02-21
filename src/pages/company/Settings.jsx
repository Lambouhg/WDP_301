import React from 'react';
import { Camera, Building2, Globe, FileText, Link2, Bold, Italic, List } from 'lucide-react';
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter} from 'next/router';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


const Settings = () => {

    const router = useRouter();

    const handleNavigation = (path) => {
      router.push(path);
    };

    const [companyId, setCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch thông tin công ty từ API
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch("/api/auth/token"); // Lấy user info
        const data = await response.json();
        if (data?.user?.company_id) {
          setCompanyId(data.user.company_id);

          // Gọi API để lấy thông tin công ty chi tiết
          const companyRes = await fetch(`/api/company/${data.user.company_id}`);
          const companyData = await companyRes.json();
          if (companyRes.ok) {
            setCompanyData(companyData.company);
          }
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  // Xử lý xóa công ty
  const handleDeleteCompany = async () => {
    if (!companyId) {
      toast.error("Không tìm thấy Company ID!");
      return;
    }

    const confirmDelete = window.confirm("Bạn có chắc muốn xóa công ty này?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/company/${companyId}`, { method: "DELETE" });

      if (response.ok) {
        toast.success("Xóa công ty thành công!");
        router.push("/");
      } else {
        const data = await response.json();
        toast.error(data.message || "Xóa công ty thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa công ty:", error);
      toast.error("Đã xảy ra lỗi khi xóa công ty.");
    }
  };

  if (loading) return <p>Loading...</p>;


  // Dữ liệu tĩnh thay vì useState
  const locations = ['England', 'Japan', 'Australia'];
  const techStack = ['HTML 5', 'CSS 3', 'Javascript'];

  return (

    <main className="mx-auto h-screen w-screen flex overflow-hidden">
        <SidebarCompany />
        <div className="w-full px-10 pt-5 h-full overflow-y-auto">
            <HeaderCompany />
      <div className="w-full mx-auto py-7 ">
        {/* Header Section */}
        <header className="bg-white rounded-2xl shadow-sm  mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">OVERVIEW</h1>
          <p className="text-gray-500">Manage your company profile and information</p>
          
          <nav className="flex mt-6 space-x-1 bg-gray-100 p-1 rounded-xl">
            <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-white text-blue-600 shadow-sm">
              Overview
            </button>
            <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600" onClick={() => handleNavigation("/company/SocialsLink")}>
              Social Links
            </button>
            <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600" onClick={() => handleNavigation("/company/CompanyTeam")}>
              Team
            </button>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
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

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Logo Upload Section */}
            <section id="logo" className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Company Logo</h3>
                  <p className="text-gray-500 text-sm">This will be displayed on your public profile</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">N</span>
                </div>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-gray-300">
                    <Camera className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Drop your file here or browse</p>
                    <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Company Details Section */}
            <section id="details" className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Company Details</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input 
                      type="url"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {locations.map((location) => (
                      <span key={location} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
                        {location}
                        <button type="button" className="ml-2 text-blue-400 hover:text-blue-600">×</button>
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add location"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employees</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Number of employees"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select industry</option>
                      <option value="tech">Technology</option>
                      <option value="health">Software</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
                  <div className="flex flex-wrap gap-2 mb-3 ">
                    {techStack.map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-600">
                        {tech}
                        <button type="button" className="ml-2 text-purple-400 hover:text-purple-600">×</button>
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add technology"
                  />
                </div>
              </div>
            </section>

            {/* About Section */}
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
                  defaultValue="Nomad is part of the Information Technology Industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales."
                />
                <div className="border-t p-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Markdown supported</span>
                  <span className="text-sm text-gray-500">0 / 500</span>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button 
                type="button" 
                className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
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