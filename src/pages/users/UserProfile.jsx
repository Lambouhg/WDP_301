import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Globe,
  Twitter,
  Plus,
  Instagram,
} from "lucide-react";
import SidebarUser from "../../components/Sidebar";
import HeaderCompany from "../../components/DashboardHeader";
import { useRouter } from "next/router";
const UserProfile = () => {
  const router = useRouter();
  const { role } = router.query;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    "OPEN FOR OPPORTUNITIES"
  );

  const statuses = [
    { label: "In-Review", color: "text-blue-500 bg-blue-100" },
    { label: "Shortlisted", color: "text-blue-500 bg-blue-100" },
    { label: "Interview", color: "text-white bg-blue-500" },
    { label: "Hired / Declined", color: "text-gray-500 bg-gray-100" },
  ];
  const OptionOfCompanytoUser = (role) => {
    return `{role}` !== "company" ? null : (
      <div className="relative inline-block">
        {/* Button */}
        <div
          onClick={() => setShowOptions(!showOptions)}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer bg-emerald-50 text-emerald-700"
        >
          {selectedStatus}
        </div>

        {/* Dropdown */}
        {showOptions && (
          <div className=" left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg flex">
            {statuses.map((status, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer ${status.color} hover:bg-gray-200`}
                onClick={() => {
                  setSelectedStatus(status.label);
                  setShowOptions(false);
                }}
              >
                {status.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden p-4 font-sans">
      <SidebarUser />
      <div className="overflow-y-auto max-w-xxl p-6">
        <HeaderCompany dashboardHeaderName={"Profile"} />
        {/* Header Section */}
        <div className="rounded-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-pink-200 to-purple-600"></div>
          <div className="relative bg-white p-4">
            <div className="absolute -top-16 left-4">
              <img
                src="/api/placeholder/80/80"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold">Jake Gyll</h1>
                  <p className="text-gray-600 text-sm">
                    Product Designer at Twitter
                  </p>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Manchester, UK</span>
                  </div>
                </div>
                {role !== "company" && (
                  <button className="px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-50">
                    Edit Profile
                  </button>
                )}
              </div>
              {/* option */}
              <OptionOfCompanytoUser role={role} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-4">
            {/* About Section */}
            <div className="bg-white p-6 pt-2 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">About Me</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">
                I'm a product designer - filmmaker currently working remotely at
                Twitter from beautiful Manchester, United Kingdom. I'm
                passionate about designing digital products that have a positive
                impact on the world.
              </p>
              <p className="text-gray-600 text-sm mt-4">
                For 10 years, I've specialised in interface, experience &
                interaction design as well as working in user research and
                product strategy for product agencies, big tech companies &
                start-ups.
              </p>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Experiences</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-6">
                {/* Twitter Experience */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Product Designer</h3>
                    <p className="text-sm text-gray-600">
                      Twitter · Full Time · Jun 2019 - Present (1y 1m)
                    </p>
                    <p className="text-sm text-gray-600">Manchester, UK</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Created and executed social media plan for 10 brands
                      utilizing multiple features and content types to increase
                      brand outreach, engagement, and leads.
                    </p>
                  </div>
                </div>

                {/* GoDaddy Experience */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Growth Marketing Designer</h3>
                    <p className="text-sm text-gray-600">
                      GoDaddy · Full Time · Jun 2011 - May 2019 (8y)
                    </p>
                    <p className="text-sm text-gray-600">Manchester, UK</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Developed digital marketing strategies, activation plans,
                      proposals, contests and promotions for client initiatives.
                    </p>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 text-sm mt-4">
                Show 3 more experiences
              </button>
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Educations</h2>
                <Plus className="w-5 h-5 text-gray-500" />
              </div>

              {/* Harvard Education */}
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-900 flex items-center justify-center rounded">
                      <img
                        src="/api/placeholder/48/48"
                        alt="Harvard Logo"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Harvard University</h3>
                      <p className="text-sm text-gray-600">
                        Postgraduate degree, Applied Psychology
                      </p>
                      <p className="text-sm text-gray-600">2010 - 2012</p>
                      <p className="text-sm text-gray-600 mt-2">
                        As an Applied Psychologist in the field of Consumer and
                        Society, I am specialized in creating business
                        opportunities by observing, analysing, researching and
                        changing behaviour.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Toronto Education */}
              <div className="mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-900 flex items-center justify-center rounded">
                      <img
                        src="/api/placeholder/48/48"
                        alt="Toronto Logo"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">University of Toronto</h3>
                      <p className="text-sm text-gray-600">
                        Bachelor of Arts, Visual Communication
                      </p>
                      <p className="text-sm text-gray-600">2006 - 2009</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button className="text-blue-600 text-sm mt-2">
                Show 2 more educations
              </button>
            </div>

            {/* Skills Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                <div className="flex gap-2">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Communication",
                  "Analytics",
                  "Facebook Ads",
                  "Content Planning",
                  "Community Manager",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Additional Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Additional Details</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    jakegyll@email.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    +44 1245 572 135
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">English, French</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Social Links</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-blue-600">
                    instagram.com/jakegyll
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-blue-600">
                    twitter.com/jakegyll
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-blue-600">
                    www.jakegyll.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
