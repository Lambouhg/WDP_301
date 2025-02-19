import React from "react";
import { ArrowLeft, ChevronDown, Edit2, Users } from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/navigation";

const JobDetails = () => {

    const router = useRouter();
        const Analytics = () => {
            router.push("/company/Analytics");
        }

  return (
    <div className="mx-auto h-screen w-screen flex overflow-hidden">
      <SidebarCompany />
      <div className="w-full px-10 pt-5 h-full overflow-y-auto">
        <HeaderCompany />
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Social Media Assistant</h1>
              <p className="text-gray-500">Design • Full-Time • 4 / 11 Hired</p>
            </div>
          </div>
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2">
            More Action
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-8">
            <button className="px-1 py-4 text-gray-500">Applicants</button>
            <button
              className="px-1 py-4 border-b-2 border-blue-600 text-blue-600">
              Job Details
            </button>
            <button className="px-1 py-4 text-gray-500" onClick={Analytics}>Analytics</button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Job Title Section */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
                  S
                </div>
                <h2 className="text-xl font-semibold">
                  Social Media Assistant
                </h2>
              </div>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg">
                + Edit Job Details
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-600 mb-4">
                Stripe is looking for Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                overseeing our social media channels, creating content, fixing
                effective way to engage the community and maximize efforts to
                engage our our channels.
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Responsibilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    Community engagement to ensure that is supported and
                    actively represented online
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    Focus on social media content development and publication
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    Marketing and strategy support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    Stay on top of trends on social media platforms, and suggest
                    content ideas to the team
                  </span>
                </li>
              </ul>
            </div>

            {/* Who You Are */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Who You Are</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    You get energy from people and building the ideal work
                    environment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    You have a sense for beautiful spaces and office experiences
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    You are a confident office manager, ready for added
                    responsibilities
                  </span>
                </li>
              </ul>
            </div>

            {/* Nice-To-Haves */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Nice-To-Haves</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">Fluent in English</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">
                    Project management skills
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">Copy editing skills</span>
                </li>
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Perks & Benefits</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold mb-2">Full Healthcare</h4>
                  <p className="text-sm text-gray-600">
                    We believe in thriving. Healthshare plan starts with our
                    team being happy and healthy.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold mb-2">Unlimited Vacation</h4>
                  <p className="text-sm text-gray-600">
                    We believe you should have a flexible schedule that makes
                    space for family, wellness, and fun.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold mb-2">Skill Development</h4>
                  <p className="text-sm text-gray-600">
                    We believe in always learning and leveling up our skills.
                    Whether it's a conference or online course.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">About this role</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Is applied of</div>
                  <div>19 capacity</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Apply Before</div>
                  <div>July 21, 2021</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Job Posted On</div>
                  <div>July 1, 2021</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Job Type</div>
                  <div>Full-Time</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Salary</div>
                  <div>$75k-$85k USD</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Marketing
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Design
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Project Management
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Copywriting
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    English
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Social Media Marketing
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Copy Editing
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

export default JobDetails;
