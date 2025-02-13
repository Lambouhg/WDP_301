import React from "react";

const MessageListItem = ({ name, time, preview, active = false }) => {
  const baseClasses = "flex gap-4 items-center p-4 text-base leading-relaxed";
  const activeClasses = active ? "bg-violet-100" : "bg-white shadow-sm";

  return (
    <div className={`${baseClasses} ${activeClasses}`}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/59b57a07e72cb55e075ddb4d37698b1887cdff64b6878a239595b3f94223d15a?placeholderIfAbsent=true&apiKey=ba51a233c83a477e90d0c8ad26bb2739"
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
        alt={`${name}'s avatar`}
      />
      <div className="flex flex-col self-stretch my-auto w-64 min-w-[240px]">
        <div className="flex gap-10 justify-between items-center w-full max-w-[256px]">
          <div className="gap-2 self-stretch my-auto font-semibold text-slate-800">
            {name}
          </div>
          <div className="self-stretch my-auto text-right text-slate-500">
            {time}
          </div>
        </div>
        <div className="mt-1 text-slate-600">{preview}</div>
      </div>
    </div>
  );
};

export default MessageListItem;
