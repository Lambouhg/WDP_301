import React from "react";

const MessageContent = () => {
  return (
    <div className="flex flex-col items-center p-8 w-full bg-white max-md:px-5 max-md:max-w-full h-full">
      <div className="flex flex-col self-center max-w-full w-[688px] items-end">
        <div className="flex flex-wrap gap-4 items-start self-start text-base font-medium leading-relaxed text-slate-600">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/59b57a07e72cb55e075ddb4d37698b1887cdff64b6878a239595b3f94223d15a?placeholderIfAbsent=true&apiKey=ba51a233c83a477e90d0c8ad26bb2739"
            className="object-contain shrink-0 w-12 aspect-square"
            alt="Jan Mayer's avatar"
          />
          <div className="flex flex-col min-w-[240px] w-[492px] max-md:max-w-full">
            <div className="font-semibold text-slate-800">Jan Mayer</div>
            <div className="gap-2.5 px-4 py-3 mt-2 max-w-full leading-7 bg-white border border-solid border-zinc-200 w-[492px] max-md:max-w-full">
              Hey Jake, I wanted to reach out because we saw your work
              contributions and were impressed by your work.{" "}
            </div>

            <div className="mt-2 text-right text-slate-400 font-normal">
              12 mins ago
            </div>
          </div>
        </div>
        <div
          className="flex gap-4 w-full items-end justify-end"
          style={{ marginLeft: "24%" }}
        >
          <div className="flex flex-col justify-center items-end min-w-[240px] w-[382px]">
            <div className="gap-2.5 px-4 py-3 mt-2 max-w-full font-medium leading-7 rounded-lg bg-slate-50 text-slate-600 w-[382px] items-end">
              Hi Jan, sure I would love to. Thanks for taking the time to see my
              work!
            </div>
            <div className="mt-2 text-right opacity-70 text-slate-500">
              12 mins ago
            </div>
          </div>
          <img
            loading="lazy"
            src="https://byvn.net/V5zc"
            className="w-12 h-12 object-cover rounded-full "
            alt="Your avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
