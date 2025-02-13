import React from "react";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageInput from "./MessageInput";

const MessageDetail = () => {
  return (
    <div className="flex flex-col ">
      <div className="h-full flex-1">
        <MessageHeader />
      </div>
      <div className="flex flex-col flex-1 justify-end gap-4 px-4 pb-4">
        <MessageContent />
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageDetail;
