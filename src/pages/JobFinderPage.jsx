import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import img1 from "../assets/image.png";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/router";
const JobFinderPage = () => {
  const router = useRouter();
  const toDetailJob = () => {
    router.push("/JobDetail");
  };
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

        {/* Main Content */}
        <div className="flex gap-8 mt-3 overflow-y-auto">
          {/* Filters */}
          <div className="w-58">
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-md">Type of Employment</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2 ">
                  {/* <Checkbox id="full-time" /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />

                  <label htmlFor="full-time" className="text-md">
                    Full-Time (2)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="part-time" className="text-md">
                    Part-Time (5)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="remote" className="text-md">
                    Remote (2)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="remote" className="text-md">
                    Internship (24)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="remote" className="text-md">
                    Contract (3)
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6 scroll-y">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="design" /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="design" className="text-md">
                    Design (24)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="sales" /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="sales" className="text-md">
                    Sales (5)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Marketing (3)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Finance (3)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Business (3)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Human Resource (6)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Engineering (4)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Technology (5)
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Job Level</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="design" /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="design" className="text-md">
                    Entry Level (57)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="sales" /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="sales" className="text-md">
                    Mid Level (3)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Senior Level (5)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    Director (12)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Checkbox id="marketing" checked /> */}
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  <label htmlFor="marketing" className="text-md">
                    VP or above (8)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1 ml-8">
            <div className="flex justify-between items-center pr-9">
              <div>
                <h2 className="text-3xl font-semibold text-blue-500">
                  All Jobs
                </h2>
                <p className="text-sm text-gray-500">Showing 73 results</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-smm text-gray-400">Sort by:</span>
                <select className="text-md">
                  <option value="relevant">Most relevant</option>
                  <option value="recent">Most recent</option>
                  <option value="popular">Most popular</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  img: img1,
                  title: "Social Media Assistant",
                  company: "Nike",
                  location: "Florence, Italy",
                  tags: ["Full-time", "Marketing", "Design"],
                  applications: 5,
                },
                {
                  img: img1,
                  title: "Brand Designer",
                  company: "Dropbox",
                  location: "San Francisco, USA",
                  tags: ["Full-time", "Marketing", "Design"],
                  applications: 7,
                },
                {
                  img: img1,
                  title: "Brand Designer",
                  company: "Dropbox",
                  location: "San Francisco, USA",
                  tags: ["Full-time", "Marketing", "Design"],
                  applications: 7,
                },
                {
                  img: img1,
                  title: "Brand Designer",
                  company: "Dropbox",
                  location: "San Francisco, USA",
                  tags: ["Full-time", "Marketing", "Design"],
                  applications: 7,
                },
                {
                  img: img1,
                  title: "Brand Designer",
                  company: "Dropbox",
                  location: "San Francisco, USA",
                  tags: ["Full-time", "Marketing", "Design"],
                  applications: 7,
                },
              ].map((job, index) => (
                <Card key={index} className="gap-1">
                  <div
                    className="flex justify-between items-start border-2 border-gray-200 p-4 cursor-pointer hover:border-blue-300"
                    onClick={toDetailJob}
                  >
                    <div className="flex gap-4 ">
                      <div className="w-18 h-18 bg-gray-100 rounded-lg">
                        <img
                          src={job.img}
                          // alt={job.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {job.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`text-xs px-3 py-1 rounded-full ${
                                tag === "Full-time"
                                  ? " border-r-2 border-green-200 text-green-500 font-bold"
                                  : tag === "Marketing"
                                  ? " border border-orange-200 text-orange-500 font-bold"
                                  : "border border-blue-200 text-blue-500 font-bold"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col text-center">
                      <Button className="bg-blue-600 hover:bg-blue-700 pt-2 pb-2 text-white font-bold text-md mb-2 mt-2">
                        Apply
                      </Button>
                      <div className="relative w-full bg-gray-300 rounded h-2 mb-2">
                        <div
                          className="absolute h-full bg-green-500"
                          style={{
                            width: `calc(${
                              job?.applications ?? 0
                            } / 10 * 100%)`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 flex">
                        <span className="font-bold">
                          {job?.applications ?? 0} applied
                        </span>
                        <span> of 10 capacity</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="ghost"
                className="h-10 w-10 text-gray-800 font-bold"
              >
                &lt;
              </Button>

              {[1, 2, 3, 4, 5, "...", 23].map((page, index) => (
                <Button
                  key={index}
                  variant={page === 1 ? "default" : "ghost"}
                  className={
                    page === 1
                      ? "bg-blue-600 hover:bg-blue-700 h-10 w-10 text-white rounded-md"
                      : ""
                  }
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="ghost"
                className="h-10 w-10 text-gray-800 font-bold"
              >
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFinderPage;
