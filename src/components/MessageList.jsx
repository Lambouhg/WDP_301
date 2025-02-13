import React from "react";
import MessageListItem from "./MessageListItem";
import { Search } from "lucide-react";
const MessageList = () => {
  const messages = [
    {
      name: "Jan Mayer",
      time: "12 mins ago",
      preview: "We want to invite you for a qui...",
      active: true,
    },
    {
      name: "Joe Bartmann",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
  ];

  return (
    <div className="flex flex-col bg-white shadow-sm min-w-[240px] w-[416px] max-md:px-5 border-r-2 gray-500 h-5/6">
      <div className="flex gap-4 items-center px-4 py-3 w-full text-base leading-relaxed text-gray-400 bg-white border border-solid border-zinc-200 cursor-pointer">
        <Search size={24} className="self-stretch my-auto" />

        <input
          type="text"
          placeholder="Search messages"
          className="self-stretch my-auto p-2 outline-none w-full"
        />
      </div>

      <div className="flex flex-col mt-7">
        {messages.map((message, index) => (
          <MessageListItem key={index} {...message} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
