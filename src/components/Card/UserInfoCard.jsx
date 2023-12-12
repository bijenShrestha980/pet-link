import React from "react";
import { motion } from "framer-motion";

const UserInfoCard = (props) => {
  return (
    <motion.div
      className="flex min-h-[410px] w-full flex-col gap-[16px] rounded-[8px] bg-white p-[24px] lg:w-[532px]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h4>User Details</h4>
      <img
        src={`${import.meta.env.VITE_BASE_URL}/images/${
          props?.cardData?.personal_information[0]?.image
        }`}
        alt="AffixLink Card"
        className={`h-[118px] w-[118px] rounded-full object-cover shadow-lg`}
      />
      <div className=" grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282] ">Name:</p>
        <p className="col-span-2">
          {props.cardData ? props.cardData?.name : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">E-mail:</p>
        <p className="col-span-2">
          {props.cardData ? props.cardData?.email : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">Phone:</p>
        <p className="col-span-2">
          {props.cardData ? props.cardData?.phone : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">
          Home Phone:
        </p>
        <p className="col-span-2">
          {props.cardData
            ? props.cardData?.personal_information[0]?.home_phone
            : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">Address:</p>
        <p className="col-span-2">
          {props.cardData
            ? props.cardData?.personal_information[0]?.address
            : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">Website:</p>
        <p className="col-span-2">
          {props.cardData
            ? props.cardData?.personal_information[0]?.website
            : "---"}
        </p>
      </div>
      <div className="grid grid-cols-3 items-center">
        <p className="text-[12px] leading-[16px] text-[#82828282]">Intro:</p>
        <p className="col-span-2">
          {props.cardData
            ? props.cardData?.personal_information[0]?.intro
            : "---"}
        </p>
      </div>
    </motion.div>
  );
};

export default UserInfoCard;
