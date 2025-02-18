import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
function HeaderCompany() {
  const { user } = useUser();
  const router = useRouter();
  const toPostJob = () => {
    router.push("/company/PostJobCompany");
  };
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Good morning, {user?.firstName}</h2>
        <p className="text-gray-600">
          Here is your job listings statistic report.
        </p>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={toPostJob}
      >
        + Post a job
      </button>
    </div>
  );
}

export default HeaderCompany;
