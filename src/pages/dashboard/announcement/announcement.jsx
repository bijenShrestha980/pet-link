import React from "react";
import { motion } from "framer-motion";
import comming_soon from "../../../assets/images/website-coming-soon.webp";

const Announcement = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex gap-[40px] items-center mb-[24px]">
        <h2>Announcement</h2>
      </div>
      <div className="flex items-center flex-wrap gap-[16px]">
        <div className="flex flex-col justify-center items-center gap-[16px] w-full">
          <img src={comming_soon} alt="" />
          <h1>Comming Soon !...</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Announcement;
