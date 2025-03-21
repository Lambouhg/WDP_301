import React from "react";
import NotificationIcon from "../components/NotificationIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DashboardHeader = ({ dashboardHeaderName, onBack }) => {
  return (
    <div className="flex items-center justify-between m-1">
      {/* Left Section - Back Button and Header Name */}
      <div className="flex items-center space-x-4">
        {onBack && (
          <button
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
            onClick={onBack}
            style={{ fontSize: "1.5rem" }} // Tăng kích thước icon
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-600">{dashboardHeaderName}</h1>
      </div>

      {/* Right Section - Notification Icon */}
      <div className="flex">
        <NotificationIcon />
      </div>
    </div>
  );
};

export default DashboardHeader;