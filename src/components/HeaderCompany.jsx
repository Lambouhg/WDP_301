import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
function HeaderCompany() {
  const { user } = useUser();
  const router = useRouter();
  const toPostJob = () => {
    router.push("/company/PostJobCompany");
  };
  const toCompanyCreate = () => {
    router.push("/company/CreateCompany");
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Good morning, {user?.firstName}</h2>
        <p className="text-gray-600">
          Here is your job listings statistic report.
        </p>
      </div>
      <div className="flex gap-2">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={toCompanyCreate}
      >
        + Create Company
      </button>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={toPostJob}
      >
        + Create Job
      </button>
      </div>
    </div>
  );
}

export default HeaderCompany;
