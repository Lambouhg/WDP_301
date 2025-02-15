import React from "react";
import Sidebar from '../../components/SidebarCompany';
import MessageList from "../../components/MessageList";
import MessageDetail from "../../components/MessageDetail";

const CompanyMessages = () => {
    return (
        <div className="flex bg-white h-screen w-full overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">


                {/* Nội dung tin nhắn */}
                <div className="flex flex-row flex-1 w-full ml-1 overflow-hidden">
                    <MessageList className="flex-1 max-w-xs border-r border-gray-300 overflow-y-auto" />
                    <MessageDetail className="flex-1 overflow-y-auto" />
                </div>
            </div>
        </div>
    );
};

export default CompanyMessages;
