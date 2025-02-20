import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JobDescription = () => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Details</h2>
          <p className="text-sm text-gray-500 mb-4">
            Add the description of the job, responsibilities, who you are, and
            nice-to-haves.
          </p>
        </div>

        <div className="space-y-6">
          {/* Job Description Section */}
          <div>
            <h3 className="text-sm font-medium mb-1">Job Descriptions</h3>
            <p className="text-sm text-gray-500 mb-2">
              Job titles must be describe one position
            </p>
            <div className="border rounded-lg">
              <textarea
                placeholder="Enter job description"
                className="w-full p-3 min-h-[100px] rounded-lg focus:outline-none"
              />
              <div className="border-t p-2 flex justify-between items-center bg-gray-50">
                <div className="flex space-x-4">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 7H7v2h6V7z" />
                      <path
                        fillRule="evenodd"
                        d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded">I</button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v1H5V6zm0 3h10v1H5V9zm0 3h10v1H5v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500">0 / 500</span>
              </div>
            </div>
          </div>

          {/* Responsibilities Section */}
          <div>
            <h3 className="text-sm font-medium mb-1">Responsibilities</h3>
            <p className="text-sm text-gray-500 mb-2">
              Outline the core responsibilities of the position
            </p>
            <div className="border rounded-lg">
              <textarea
                placeholder="Enter job responsibilities"
                className="w-full p-3 min-h-[100px] rounded-lg focus:outline-none"
              />
              <div className="border-t p-2 flex justify-between items-center bg-gray-50">
                <div className="flex space-x-4">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 7H7v2h6V7z" />
                      <path
                        fillRule="evenodd"
                        d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded">I</button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v1H5V6zm0 3h10v1H5V9zm0 3h10v1H5v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500">0 / 500</span>
              </div>
            </div>
          </div>

          {/* Who You Are Section */}
          <div>
            <h3 className="text-sm font-medium mb-1">Who You Are</h3>
            <p className="text-sm text-gray-500 mb-2">
              Add your preferred candidates qualifications
            </p>
            <div className="border rounded-lg">
              <textarea
                placeholder="Enter qualifications"
                className="w-full p-3 min-h-[100px] rounded-lg focus:outline-none"
              />
              <div className="border-t p-2 flex justify-between items-center bg-gray-50">
                <div className="flex space-x-4">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 7H7v2h6V7z" />
                      <path
                        fillRule="evenodd"
                        d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded">I</button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v1H5V6zm0 3h10v1H5V9zm0 3h10v1H5v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500">0 / 500</span>
              </div>
            </div>
          </div>

          {/* Nice-To-Haves Section */}
          <div>
            <h3 className="text-sm font-medium mb-1">Nice-To-Haves</h3>
            <p className="text-sm text-gray-500 mb-2">
              Add nice-to-have skills and qualifications for the role to
              encourage a more diverse set of candidates to apply
            </p>
            <div className="border rounded-lg">
              <textarea
                placeholder="Enter nice-to-haves"
                className="w-full p-3 min-h-[100px] rounded-lg focus:outline-none"
              />
              <div className="border-t p-2 flex justify-between items-center bg-gray-50">
                <div className="flex space-x-4">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 7H7v2h6V7z" />
                      <path
                        fillRule="evenodd"
                        d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded">I</button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v1H5V6zm0 3h10v1H5V9zm0 3h10v1H5v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500">0 / 500</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
