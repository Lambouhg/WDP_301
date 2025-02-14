import React from "react";

const MessageInput = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between py-2 pr-2 pl-4 mt-5 w-full bg-white border border-solid border-zinc-200 max-md:max-w-full">
      <div className="flex flex-1 gap-4 my-auto text-base leading-relaxed text-slate-500">
        <input
          type="text"
          id="messageInput"
          placeholder="Reply message"
          className="p-1 flex-1 bg-transparent border border-solid rounded-lg"
        />
      </div>
      <div className="flex gap-4 items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/838e510ddb90b1e4dc475ba95bd18c26a6531eed082ba0c7b8480d0a3b5fe77b?placeholderIfAbsent=true&apiKey=ba51a233c83a477e90d0c8ad26bb2739"
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          alt="Attachment"
        />
        <button className="flex gap-2.5 justify-center items-center self-stretch h-10 w-5 my-auto bg-indigo-600 w-[73px] text-white rounded-lg">
          📩 Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
