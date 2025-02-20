import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListJobSearched from "../components/ListJobSearched";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

import { Search, MapPin } from "lucide-react";

const JobFinderPage = () => {
  return (
    <div className="flex bg-white h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 ">
        {/* Header */}
        <div className="w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
          <DashboardHeader dashboardHeaderName={"Find Jobs"} />
        </div>

        <div className="flex items-center gap-4 border-2 border-gray-300 p-3 rounded-lg w-full max-w-6xl mx-auto">
          {/* Ô tìm kiếm */}
          <div className="flex items-center relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={24}
            />
            <Input
              className="pl-10 w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job title or keyword"
            />
          </div>

          {/* Ô vị trí */}
          <div className="flex items-center relative flex-grow border-l border-gray-200 pl-4">
            <MapPin
              className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={24}
            />
            <Input
              className="pl-10 w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Florence, Italy"
            />
          </div>

          {/* Nút tìm kiếm */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 rounded-md">
            Search
          </Button>
        </div>

        <div className="text-md text-gray-500 mb-3 mt-5">
          Popular: UI Designer, UX Researcher, Android, Admin
        </div>
        <ListJobSearched />
        {/* Main Content */}
      </div>
    </div>
  );
};

export default JobFinderPage;
