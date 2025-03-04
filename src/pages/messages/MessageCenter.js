"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MessageList from "../../components/MessageList";
import MessageDetail from "../../components/MessageDetail";
import DashboardHeader from "../../components/DashboardHeader";
import { useUser } from "@clerk/nextjs";

const MessageCenter = () => {
  const { user, isLoaded } = useUser(); // Kiểm tra trạng thái tải dữ liệu
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Nếu dữ liệu user chưa tải xong, hiển thị loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-white h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
          <DashboardHeader dashboardHeaderName={"Messages"} />
        </div>

        {/* Nội dung tin nhắn */}
        <div className="flex flex-row flex-1 w-screen ml-1 overflow-hidden">
          <MessageList
            className="flex-1 w-full border-r border-gray-300 overflow-y-auto"
            onSelectConversation={setSelectedConversation}
            selectedConversationId={selectedConversation?.id}
            user={user}
          />
          <MessageDetail
            className="flex-1 overflow-y-auto"
            conversation={selectedConversation}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
