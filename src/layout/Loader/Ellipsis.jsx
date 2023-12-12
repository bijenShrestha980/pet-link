import React, { memo } from "react";
import { motion } from "framer-motion";

const Ellipsis = ({ style, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="ellipsis-container min-h-full"
      style={style}
    >
      <div className="lds-ellipsis">
        <div style={content}></div>
        <div style={content}></div>
        <div style={content}></div>
        <div style={content}></div>
      </div>
    </motion.div>
  );
};

export default memo(Ellipsis);
