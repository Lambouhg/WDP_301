import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"; // Import icons từ react-icons
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import {PlusCircle, Trash2} from "lucide-react"

const SocialsLink = () => {
  const { user } = useUser();
  const [company, setCompany] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const router = useRouter();

  // Fetch dữ liệu công ty từ API
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

        // Chuyển đổi socialLinks từ object sang array
        const linksArray = Object.entries(data.socialLinks || {}).map(
          ([platform, url]) => ({ platform, url })
        );
        setSocialLinks(linksArray);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    if (user) {
      fetchCompanyData();
    }
  }, [user]);

  // Hàm ánh xạ tên mạng xã hội với icon tương ứng
  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram className="w-5 h-5 text-pink-600" />;
      case "twitter":
        return <FaTwitter className="w-5 h-5 text-blue-500" />;
      case "facebook":
        return <FaFacebook className="w-5 h-5 text-blue-700" />;
      case "linkedin":
        return <FaLinkedin className="w-5 h-5 text-blue-800" />;
      case "youtube":
        return <FaYoutube className="w-5 h-5 text-red-600" />;
      default:
        return <FaLink className="w-5 h-5 text-gray-500" />; // Icon mặc định
    }
  };

  // Xử lý thêm liên kết mới
  const addSocialLink = () => {
    if (newPlatform && newUrl) {
      const newLink = { platform: newPlatform, url: newUrl };
      setSocialLinks((prev) => [...prev, newLink]);
      setNewPlatform("");
      setNewUrl("");

      // Gọi API để cập nhật dữ liệu lên MongoDB
      updateSocialLinks([...socialLinks, newLink]);
    }
  };

  // Xử lý xóa liên kết
  const removeSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);

    // Gọi API để cập nhật dữ liệu lên MongoDB
    updateSocialLinks(updatedLinks);
  };

  // Hàm cập nhật socialLinks lên MongoDB
  const updateSocialLinks = async (updatedLinks) => {
    try {
      const response = await fetch(`/api/company/${company._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          socialLinks: updatedLinks.reduce((acc, { platform, url }) => {
            acc[platform.toLowerCase()] = url;
            return acc;
          }, {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update social links");
      }

      console.log("Social links updated successfully");
    } catch (error) {
      console.error("Error updating social links:", error);
    }
  };

  return (
    <main className="mx-auto h-screen w-screen flex overflow-hidden">
      <SidebarCompany />
      <div className="w-full px-10 pt-5 h-full overflow-y-auto">
        <HeaderCompany />
        <div className="w-full mx-auto py-7">
          {/* Header Section */}
          <header className="bg-white rounded-2xl shadow-sm mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              SOCIAL MEDIA LINKS
            </h1>
            <p className="text-gray-500">Manage your company’s social media presence</p>
            <nav className="flex mt-6 space-x-1 bg-gray-100 p-1 rounded-xl">
              <button
                className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600"
                onClick={() => router.push("/company/Settings")}
              >
                Overview
              </button>
              <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-white text-blue-600 shadow-sm">
                Social Links
              </button>
              <button
                className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600"
                onClick={() => router.push("/company/CompanyTeam")}
              >
                Team
              </button>
            </nav>
          </header>

          {/* Social Links Management Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Manage Social Links
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border"
                >
                  <div className="flex items-center space-x-3">
                    {/* Hiển thị icon theo tên mạng xã hội */}
                    {getSocialIcon(link.platform)}
                    <div>
                      <p className="text-gray-800 font-medium">{link.platform}</p>
                      <a href={link.url} target="_blank" className="text-blue-500 text-sm">
                        {link.url}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* Add New Social Link */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border">
                <input
                  type="text"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  placeholder="Platform (e.g. LinkedIn)"
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="URL (e.g. https://linkedin.com/company)"
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={addSocialLink}
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Link
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SocialsLink;