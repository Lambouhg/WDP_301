import React from 'react';
import { ArrowLeft, MoreHorizontal, Search, ChevronDown, Filter } from 'lucide-react';
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/navigation";

const ApplicantTracking = () => {

  const router = useRouter();
  const JobDetails = () => {
    router.push("/company/JobDetails");
  }
  const applicants = {
    inReview: [
      { name: 'Jake Gyll', appliedDate: '13 July, 2021', score: 4.0 },
      { name: 'Jenny Wilson', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Jacob Jones', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Wade Warren', appliedDate: '13 July, 2021', score: 0.0 },
    ],
    shortlisted: [
      { name: 'Jane Cooper', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Courtney Henry', appliedDate: '13 July, 2021', score: 0.0 },
    ],
    interview: [
      { name: 'Floyd Miles', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Devon Lane', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Marvin McKin...', appliedDate: '13 July, 2021', score: 0.0 },
    ],
    hired: [
      { name: 'Annette Black', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Brooklyn Sim...', appliedDate: '13 July, 2021', score: 0.0 },
      { name: 'Ronald Richa...', appliedDate: '13 July, 2021', score: 0.0 },
    ]
  };

  const ApplicantCard = ({ name, appliedDate, score }) => (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            <img src="/api/placeholder/48/48" alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <button className="text-blue-600 text-sm">View Profile</button>
          </div>
        </div>
        <div className="text-gray-500">
          <MoreHorizontal className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div>
          <div>Applied on</div>
          <div>{appliedDate}</div>
        </div>
        <div className="text-right">
          <div>Score</div>
          <div className="flex items-center">
            <span className="mr-1">★</span>
            {score.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto h-screen w-screen flex overflow-hidden">
      <SidebarCompany/>
      <div className="w-full px-10 pt-5 h-full overflow-y-auto">
        <HeaderCompany/>
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
          <button className="px-1 py-4 border-b-2 border-blue-600 text-blue-600">Applicants</button>
          <button className="px-1 py-4 text-gray-500" onClick={JobDetails}>Job Details</button>
          <button className="px-1 py-4 text-gray-500">Analytics</button>
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium">Total Applicants: 19</div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Applicants"
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="flex border rounded-lg overflow-hidden">
            <button className="px-4 py-2 bg-blue-600 text-white">Pipeline View</button>
            <button className="px-4 py-2 hover:bg-gray-50">Table View</button>
          </div>
        </div>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* In Review Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span className="font-medium">In Review</span>
              <span className="text-gray-500">10</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          {applicants.inReview.map((applicant, index) => (
            <ApplicantCard key={index} {...applicant} />
          ))}
        </div>

        {/* Shortlisted Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="font-medium">Shortlisted</span>
              <span className="text-gray-500">8</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          {applicants.shortlisted.map((applicant, index) => (
            <ApplicantCard key={index} {...applicant} />
          ))}
        </div>

        {/* Interview Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="font-medium">Interview</span>
              <span className="text-gray-500">11</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          {applicants.interview.map((applicant, index) => (
            <ApplicantCard key={index} {...applicant} />
          ))}
        </div>

        {/* Hired Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="font-medium">Hired</span>
              <span className="text-gray-500">3</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          {applicants.hired.map((applicant, index) => (
            <ApplicantCard key={index} {...applicant} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ApplicantTracking;