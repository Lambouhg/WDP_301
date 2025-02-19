import React from 'react';
import { MoreHorizontal, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/navigation";

const JobListingPage = () => {
    const router = useRouter();
    const Applicants = () => {
        router.push("/company/ApplicantsTracking");
    }
  const jobs = [
    { role: 'Social Media Assistant', status: 'Live', datePosted: '20 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 19, needs: { current: 4, total: 11 } },
    { role: 'Senior Designer', status: 'Live', datePosted: '16 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 1234, needs: { current: 0, total: 20 } },
    { role: 'Visual Designer', status: 'Live', datePosted: '15 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 2435, needs: { current: 1, total: 5 } },
    { role: 'Data Sience', status: 'Live', datePosted: '13 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 6234, needs: { current: 10, total: 10 } },
    { role: 'Kotlin Developer', status: 'Live', datePosted: '12 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 12, needs: { current: 20, total: 20 } },
    { role: 'React Developer', status: 'Live', datePosted: '11 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 14, needs: { current: 10, total: 10 } },
    { role: 'Kotlin Developer', status: 'Live', datePosted: '12 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 12, needs: { current: 20, total: 20 } },
  ];

  return (
    <div className="mx-auto h-screen w-screen flex overflow-hidden">
        <SidebarCompany />
        <div className="w-full px-10 pt-5 h-full overflow-y-auto">
            <HeaderCompany />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold mb-1">Job Listing</h1>
          <p className="text-gray-500 text-sm">Here is your jobs listing status from July 19 - July 25.</p>
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg">
          Jul 19 - Jul 25
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Job List</h2>
          <button className="flex items-center px-3 py-1.5 border rounded-lg">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <table className="w-full h-screen">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Roles</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date Posted</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">Job Type</th>
              <th className="text-left p-4">Applicants</th>
              <th className="text-left p-4">Needs</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="border-b hover:bg-gray-50" onClick={Applicants}>
                <td className="p-4">{job.role}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-green-600 bg-green-100 rounded-full text-sm">
                    {job.status}
                  </span>
                </td>
                <td className="p-4">{job.datePosted}</td>
                <td className="p-4">{job.dueDate}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full text-sm">
                    {job.jobType}
                  </span>
                </td>
                <td className="p-4">{job.applicants}</td>
                <td className="p-4">
                  {job.needs.current} / {job.needs.total}
                </td>
                <td className="p-4">
                  <button>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">View</span>
            <select className="border rounded px-2 py-1">
              <option>10</option>
            </select>
            <span className="text-sm text-gray-500">Applicants per page</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-lg hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-gray-100">2</button>
            <button className="p-1 rounded-lg hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default JobListingPage;