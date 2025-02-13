import React from "react";
import Sidebar from "../components/Sidebar";
import MessageList from "../components/MessageList";
import MessageDetail from "../components/MessageDetail";
import DashboardHeader from "../components/DashboardHeader";
const MessageCenter = () => {
  return (
    <div className="flex bg-white h-screen w-full overflow-hidden">
      <Sidebar />

      {/* Phần nội dung bên phải */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="w-full mt-6 px-4">
          <DashboardHeader dashboardHeaderName={"Messages"} />
        </div>

        {/* Nội dung tin nhắn */}
        <div className="flex flex-row flex-1 w-full ml-1 overflow-hidden">
          <MessageList className="flex-1 max-w-xs border-r border-gray-300 overflow-y-auto" />
          <MessageDetail className="flex-1 overflow-y-auto" />
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
