import React from "react";
import { motion } from "framer-motion";

import BulkNotificationModal from "../Modal/BulkNotificationModal";

export default function BulkMessageCard(props) {
  return (
    <>
      <motion.div
        className={`flex h-full w-full flex-col justify-between rounded-lg bg-white p-[24px] ${props.class}`}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h4 className="mb-[26px]">{props.title}</h4>
        <label
          htmlFor="bulkMessageSending"
          className={`flex h-[44px] cursor-pointer select-none items-center justify-center rounded-[8px] bg-brand_primary text-[14px] font-[700] leading-[20px] text-[#ffffff] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-90`}
          onClick={props.click}
        >
          {props.btnName}
        </label>{" "}
      </motion.div>
      <input type="checkbox" id="bulkMessageSending" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box mx-auto bg-white p-[initial]">
          <BulkNotificationModal />
        </div>
      </div>
    </>
  );
}
