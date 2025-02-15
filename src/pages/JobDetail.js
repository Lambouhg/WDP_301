// import { useParams } from "next/navigation";

const JobDetail = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const id = useParams().id;
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            JF
          </div>
          <span className="ml-3 text-xl font-semibold">Job Finder</span>
        </div>
        <nav className="mb-8">
          <ul>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                <i className="fas fa-tachometer-alt mr-3"></i>
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                <i className="fas fa-envelope mr-3"></i>
                Messages
                <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  1
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                <i className="fas fa-briefcase mr-3"></i>
                My Applications
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-blue-500" href="#">
                <i className="fas fa-search mr-3"></i>
                Find Jobs
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                <i className="fas fa-building mr-3"></i>
                Browse Companies
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                Link
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                Link
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                Link
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                Link
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                Link
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                Link
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <h3 className="text-gray-500 mb-4">SETTINGS</h3>
          <ul>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                <i className="fas fa-cog mr-3"></i>
                Settings
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700" href="#">
                <i className="fas fa-question-circle mr-3"></i>
                Help Center
              </a>
            </li>
          </ul>
          <div className="flex items-center mt-8">
            <img
              src="https://placehold.co/40x40"
              alt="User profile picture"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-gray-700 font-semibold">Jake Gyll</p>
              <p className="text-gray-500 text-sm">jakegyll@email.com</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-3/4 p-8 flex flex-col space-y-8">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Job Description</h1>
            <a className="text-blue-500" href="#">
              Back to homepage
            </a>
          </div>
          <div className="flex items-center mb-6">
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
            <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg">
              Apply
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">
                Stripe is looking for Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Community engagement to ensure that is supported and actively
                  represented online
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
              <h3 className="text-lg font-semibold mb-2">Who You Are</h3>
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
                <li>You're a growth marketer and know how to run campaigns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Nice-To-Haves</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Fluent in English</li>
                <li>Project management skills</li>
                <li>Copy editing skills</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">About this role</h3>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-semibold">5 applied</span> of 10 capacity
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
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
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
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
            <div className="flex flex-wrap space-x-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Project Management
              </span>
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                Copywriting
              </span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                English
              </span>
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                Social Media Marketing
              </span>
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                Copy Editing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
