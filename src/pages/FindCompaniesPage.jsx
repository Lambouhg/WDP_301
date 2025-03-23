import ListCompaniesSearched from "../components/ListCompaniesSearched"
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";


const FindCompaniesPage = () => {
  return (
    <div className="flex bg-white h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <div className=" w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
          <DashboardHeader dashboardHeaderName={"Browse Companies"} />

          <ListCompaniesSearched />
          {/* Main Content */}
        </div>
      </div>
    </div>
  );
};

export default FindCompaniesPage;
