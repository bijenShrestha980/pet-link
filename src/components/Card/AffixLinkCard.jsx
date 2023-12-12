import React, { useState } from "react";
import { motion } from "framer-motion";
// ASSTES
import card from "../../assets/images/nyancat-donuts.gif";

const AffixLinkCard = (props) => {
  const [rotate, setRotate] = useState(false);
  return (
    <motion.div
      className="flex w-full flex-col gap-[16px] rounded-[8px] bg-white p-[24px] xl:w-[420px]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h4>Affix Link Card</h4>
      <img
        src={card}
        alt="AffixLink Card"
        className={`h-[167px] w-full transform cursor-pointer rounded-[8px] object-cover shadow-lg transition-all duration-700 ease-in-out hover:shadow-2xl ${
          rotate ? "-scale-x-100" : ""
        }`}
        onClick={() => setRotate((current) => !current)}
      />
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282] ">
          Card Name:
        </p>
        <p className="col-span-2">
          {props.cardData ? props.cardData?.full_name : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">
          Card Type:
        </p>
        <p className="col-span-2">Corporate</p>
      </div>
      <div className="mb-[14px] grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">
          Card Number:
        </p>
        <p className="col-span-2">
          {props.cardData ? props.cardData?.identification_number : "---"}
        </p>
      </div>
      <h3 className="text-center">
        {props.cardData?.master_link ? props.cardData?.master_link : "---"}
      </h3>
    </motion.div>
  );
};

export default AffixLinkCard;
