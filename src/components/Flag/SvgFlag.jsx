import React, { useState, useEffect, memo, Suspense } from "react";
import Loader from "../Loader";
import { motion } from "framer-motion";
const getCountryISO2 = require("country-iso-3-to-2");

const SvgFlag = (props) => {
  const { iso, classname, style } = props;
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    const loadSvg = async () => {
      const twoLetterCode =
        iso?.length === 2
          ? iso.toLowerCase()
          : getCountryISO2(iso)?.toLowerCase();
      const { default: response } = await import(
        `svg-country-flags/svg/${twoLetterCode}.svg`
      );
      if (response) {
        setFlag(response);
      }
    };
    loadSvg();
  }, [iso]);

  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <motion.img
        className={`${classname}`}
        style={style}
        src={flag}
        alt={`${iso} flag`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </Suspense>
  );
};

export default memo(SvgFlag);
