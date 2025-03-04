import React from "react";

const MessageListItem = ({ id, name, time, preview, active, onClick }) => {
  // Extract first letter of name for avatar
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div
      className={`flex p-4 gap-4 border-b border-gray-200 cursor-pointer ${
        active ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        {firstLetter}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{name}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{preview}</p>
      </div>
    </div>
  );
};

export default MessageListItem;
