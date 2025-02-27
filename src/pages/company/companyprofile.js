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
      case 'facebook': return <FaFacebook />;
      case 'twitter': return <FaTwitter />;
      case 'linkedin': return <FaLinkedin />;
      case 'instagram': return <FaInstagram />;
      case 'youtube': return <FaYoutube />;
      default: return null;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!company) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
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
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <HeaderCompany />
        <div className="flex items-center">
          <div>
            {/* Company Header */}
            <div className="flex justify-between items-center mb-6 pt-4">
              <div className="flex items-center">
                <img
                  src={company.logo || 'https://i.imgur.com/6bY8z2N.jpg'}
                  alt="Company logo"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h1 className="text-3xl font-bold">{company.name}</h1>
                  <a href={company.website} className="text-blue-600 text-sm">
                    {company.website}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Public View</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Profile Settings</button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Company Profile */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
                  <p className="text-gray-700">{company.description}</p>
                </div>

                {/* Company Details */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Company Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Industry</p>
                      <p className="font-medium">{company.industry}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Company Size</p>
                      <p className="font-medium">{company.employees} employees</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Founded</p>
                      <p className="font-medium">{new Date(company.dateFounded).getFullYear()}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
                  <div className="flex flex-wrap gap-4">
                    {company.socialLinks && Object.entries(company.socialLinks).map(([platform, url]) => {
                      if (!url) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          {getSocialIcon(platform)}
                          <span className="capitalize">{platform}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Tech Stack */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.techStack?.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
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