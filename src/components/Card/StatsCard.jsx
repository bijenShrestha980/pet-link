import React from "react";

const StatsCard = (props) => {
  return (
    <span className="bg-brand_secondary p-2 sm:p-[15px] md:p-[24px] rounded-[8px] w-full flex flex-col gap-[8px]">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`bg-[#FFFFFF] rounded-[8px] pt-[5px] pl-[10px] pb-[10px] ${
            props.label === "Impression" ? "pr-[5px]" : "pr-[10px]"
          }`}
        >
          {props.icon}
        </span>
        <p>{props?.label}</p>
      </div>
      <h1 className="pl-[5px]">{props?.count ? props?.count : 0}</h1>
    </span>
  );
};

export default StatsCard;
