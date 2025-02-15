/* eslint-disable @next/next/no-img-element */
// import { useParams } from "next/navigation";
import Siderbar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import JobApplicationPopup from "../components/PopupApply_user";
import { useState } from "react";
const JobDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const id = useParams().id;
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans w-full h-screen overflow-hidden">
      <Siderbar />

      <div className="overflow-y-auto w-full p-6">
        <div>
          <div className="border-b-2 border-gray-200 pb-4 flex-1">
            <DashboardHeader dashboardHeaderName={"Job Detail"} />
          </div>
          <div className="flex items-center mb-6 mx-auto bg-white p-6 rounded-lg shadow-md ">
            <img
              src="https://placehold.co/60x60"
              alt="Company logo"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">Social Media Assistant</h2>
              <p className="text-gray-500">
                Stripe • Paris, France • Full-Time
              </p>
            </div>
            <button
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              Apply
            </button>
            <JobApplicationPopup
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div className="flex p-8 space-y-8 text-base">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">
                  Stripe is looking for Social Media Marketing expert to help
                  manage our online networks. You will be responsible for
                  monitoring our social media channels, creating content,
                  finding effective ways to engage the community and incentivize
                  others to engage on our channels.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">
                  Responsibilities
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>
                    Community engagement to ensure that is supported and
                    actively represented online
                  </li>
                  <li>
                    Focus on social media content development and publication
                  </li>
                  <li>Marketing and strategy support</li>
                  <li>
                    Stay on top of trends on social media platforms, and suggest
                    content ideas to the team
                  </li>
                  <li>Engage with online communities</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Who You Are</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>
                    You get energy from people and building the ideal work
                    environment
                  </li>
                  <li>
                    You have a sense for beautiful spaces and office experiences
                  </li>
                  <li>
                    You are a confident office manager, ready for added
                    responsibilities
                  </li>
                  <li>You're detail-oriented and creative</li>
                  <li>
                    You're a growth marketer and know how to run campaigns
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Nice-To-Haves</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Fluent in English</li>
                  <li>Project management skills</li>
                  <li>Copy editing skills</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">About this role</h3>
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">5 applied</span> of 10
                  capacity
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Apply Before:</span> July 31,
                  2021
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Job Posted On:</span> July 1,
                  2021
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Job Type:</span> Full-Time
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Salary:</span> $75k-$85k USD
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="flex space-x-2">
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  Marketing
                </span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Design
                </span>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
              <div className="flex flex-wrap space-x-2">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm m-1">
                  Project Management
                </span>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm m-1">
                  Copywriting
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm m-1">
                  English
                </span>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm m-1">
                  Social Media Marketing
                </span>
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm m-1">
                  Copy Editing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
