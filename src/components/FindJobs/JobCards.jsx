import { useRouter } from "next/router";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import img1 from "../../assets/image.png";

const JobCards = ({ jobs, handleOpenApplyForm }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-6">
      {jobs.map((job, index) => (
        <Card
          key={index}
          className="shadow-md rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start p-6">
            <div
              className="flex gap-4 cursor-pointer flex-1"
              onClick={() => router.push(`/FindJobDetail?jobId=${job._id}`)}
            >
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={job.companyId?.logo || img1}
                  className="w-full h-full object-cover"
                  alt={job.title}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {job.companyId?.name} • {job.location || "Unknown Location"}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {job.categories?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right flex flex-col items-center sm:items-end gap-3">
              <Button
                className="w-32 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => handleOpenApplyForm(job)}
              >
                Apply Now
              </Button>
              <div className="w-32 bg-gray-200 rounded-full h-2 relative">
                <div
                  className="absolute h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{
                    width: `calc(${job?.applicants ?? 0} / ${
                      job?.needs ?? 10
                    } * 100%)`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 tracking-tight">
                <span className="font-semibold">{job?.applicants ?? 0}</span>{" "}
                applied /{" "}
                <span className="font-semibold">{job?.needs ?? 10}</span> slots
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobCards;
