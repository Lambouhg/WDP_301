import React from 'react';
import { ArrowLeft, ChevronDown, Eye, Mail } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
import { useRouter } from "next/navigation";

const Analytics = () => {

    const router = useRouter();
            const JobDetails = () => {
                router.push("/company/JobDetails");
            }
    
  const viewData = [
    { date: '19 Jul', views: 350 },
    { date: '20 Jul', views: 450 },
    { date: '21 Jul', views: 180 },
    { date: '22 Jul', views: 550 },
    { date: '23 Jul', views: 243 },
    { date: '24 Jul', views: 0 },
    { date: '25 Jul', views: 0 },
  ];

  const countryData = [
    { country: 'USA', count: 3240, flag: '🇺🇸' },
    { country: 'France', count: 3188, flag: '🇫🇷' },
    { country: 'Italy', count: 2938, flag: '🇮🇹' },
    { country: 'Germany', count: 2624, flag: '🇩🇪' },
    { country: 'Japan', count: 2414, flag: '🇯🇵' },
    { country: 'Netherlands', count: 1916, flag: '🇳🇱' },
  ];

  return (
    <div className="mx-auto h-screen w-screen flex overflow-hidden">
        <SidebarCompany />
        <div className="w-full px-10 pt-5 h-full overflow-y-auto">
      <HeaderCompany />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-start gap-3">
          <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold mb-1">Social Media Assistant</h1>
            <p className="text-gray-500">Design • Full-Time • 4 / 11 Hired</p>
          </div>
        </div>
        <button type="button" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2">
          More Action
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-8">
          <button type="button" className="px-1 py-4 text-gray-500">Applicants</button>
          <button type="button" className="px-1 py-4 text-gray-500" onClick={JobDetails}>Job Details</button>
          <button type="button" className="px-1 py-4 border-b-2 border-blue-600 text-blue-600">Analytics</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Views */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">Total Views</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold">23,564</h2>
            <span className="text-green-500 text-sm">6.4% ↑</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">vs last day</p>
        </div>

        {/* Total Applied */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-purple-500" />
            <span className="text-gray-600">Total Applied</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold">132</h2>
            <span className="text-red-500 text-sm">0.4% ↓</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">vs last day</p>
        </div>

        {/* Traffic Channel */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold">Traffic channel</h3>
            <div className="bg-gray-700 text-white px-2 py-1 rounded text-sm">243</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Direct</span>
              <span className="text-sm font-medium">48%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Social</span>
              <span className="text-sm font-medium">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Organic</span>
              <span className="text-sm font-medium">24%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Other</span>
              <span className="text-sm font-medium">5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Job Listing View stats</h3>
            <button type="button" className="px-4 py-2 border rounded-lg text-sm">
              Last 7 days
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <LineChart width={700} height={300} data={viewData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </div>
        </div>

        {/* Visitors by Country */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Visitors by country</h3>
          <div className="space-y-4">
            {countryData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.country}</span>
                </div>
                <span className="font-medium">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Analytics;