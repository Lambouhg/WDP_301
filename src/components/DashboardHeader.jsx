import React from "react";
import NotificationIcon from "../components/NotificationIcon";
import { useRouter } from "next/router";
const DashboardHeader = ({ dashboardHeaderName }) => {
  const router = useRouter();
  const returnToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between  m-1">
      <h1 className="text-3xl font-bold text-gray-600">
        {dashboardHeaderName}
      </h1>
      <div className="flex ">
        <span
          className="p-2 border-2 gray-900 mb-2 mr-9 text-blue-800 font-semibold cursor-pointer rounded-md"
          onClick={returnToHome}
        >
          Back to Homepage
        </span>
        <NotificationIcon />
      </div>
    </div>
  );
};

export default DashboardHeader;
