import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import HeaderCompany from "../../components/HeaderCompany";
import Sidebar from "../../components/SidebarCompany";

const CompanyProfile = () => {
  const { user } = useUser();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!user?.id) return;
        
        const response = await fetch(`/api/company?userId=${user.id}`, {
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
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCompanyData();
    }
  }, [user]);

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <FaFacebook className="text-lg" />;
      case 'twitter': return <FaTwitter className="text-lg" />;
      case 'linkedin': return <FaLinkedin className="text-lg" />;
      case 'instagram': return <FaInstagram className="text-lg" />;
      case 'youtube': return <FaYoutube className="text-lg" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <HeaderCompany />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <HeaderCompany />
          <div className="flex justify-center items-center h-64">
            <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-4">Bạn chưa tạo hồ sơ công ty</h1>
              <p className="text-gray-600 mb-4">Hãy tạo hồ sơ công ty để xem nó ở đây.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200">
                Tạo hồ sơ công ty
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <HeaderCompany />
          
          {/* Company Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6 mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={company.logo || 'https://i.imgur.com/6bY8z2N.jpg'}
                  alt="Company logo"
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold break-words">{company.name || 'Company Name'}</h1>
                  {company.website && (
                    <a 
                      href={company.website} 
                      className="text-blue-600 text-sm hover:underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200">
                  Public View
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200">
                  Profile Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Company Profile */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
                <div className="text-gray-700 break-words whitespace-pre-wrap">
                  {company.description || 'No description provided'}
                </div>
              </div>

              {/* Company Details */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Company Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Industry</p>
                    <p className="font-medium break-words">{company.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company Size</p>
                    <p className="font-medium">{company.employees ? `${company.employees} employees` : 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Founded</p>
                    <p className="font-medium">
                      {company.dateFounded ? new Date(company.dateFounded).getFullYear() : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium break-words">{company.location || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
                {company.socialLinks && Object.entries(company.socialLinks).some(([url]) => url) ? (
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(company.socialLinks).map(([platform, url]) => {
                      if (!url) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition duration-200"
                        >
                          {getSocialIcon(platform)}
                          <span className="capitalize">{platform}</span>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-600">No social links provided</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tech Stack */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                {company.techStack && company.techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {company.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm break-words"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No tech stack information</p>
                )}
              </div>
              
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium break-words">{company.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{company.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Address</p>
                    <p className="font-medium break-words">{company.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;