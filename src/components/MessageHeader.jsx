import React from "react";
import { Star, Pin, EllipsisVertical } from "lucide-react";
const MessageHeader = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center px-8 pt-8 pb-6 w-full bg-white shadow-sm max-md:px-5 max-md:max-w-full">
      <div className="flex gap-4 justify-center items-center self-stretch my-auto min-w-[100px]">
        <img
          loading="lazy"
          src="https://byvn.net/Wbrb"
          className="object-cover w-12 h-12 rounded-full"
          alt="Jan Mayer's avatar"
        />
        <div className="flex flex-col self-stretch my-auto w-[235px]">
          <div className="flex flex-col">
            <div className="text-xl font-semibold leading-tight text-slate-800">
              Jan Mayer
            </div>
            <div className="mt-1 text-base leading-relaxed text-slate-600">
              Recruiter at Nomad
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 items-start self-stretch my-auto">
        <Pin size={22} className="text-blue-400" alt="Pin icon" />
        <Star size={22} className="text-yellow-400" alt="Star icon" />
        <EllipsisVertical
          size={22}
          className="text-slate-400"
          alt="Ellipsis icon"
        />
      </div>
    </div>
  );
};

export default MessageHeader;
