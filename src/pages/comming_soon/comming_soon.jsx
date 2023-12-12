import React from "react";

import comming_soon from "@/assets/images/website-coming-soon.webp";

const Comming_soon = (props) => {
  return (
    <div>
      {/* Header */}
      <div className="flex gap-[40px] items-center mb-[24px]">
        <h2 className="capitalize">{props.title}</h2>
      </div>
      <div className="flex items-center flex-wrap gap-[16px]">
        <div className="flex flex-col justify-center items-center gap-[16px] w-full">
          <img src={comming_soon} alt="" />
          <h1>Comming Soon !...</h1>
        </div>
      </div>
    </div>
  );
};

export default Comming_soon;
