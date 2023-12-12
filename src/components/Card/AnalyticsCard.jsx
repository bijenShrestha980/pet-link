import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ASSETS
import { ArrowDownIcon, ClickIcon, ImpressionIcon } from "../../utils/icons";
import { analytics } from "../../assets/data/analytics";

// COMPONENTS
import { LineChart } from "../Chart/LineChart";
import StatsCard from "./StatsCard";
import Loader from "../../layout/Loader/Loader";

const AnalyticsCard = (props) => {
  const [filter, setFilter] = useState("7days");
  const [filterData, setFilterData] = useState(null);
  const [labelData, setLabelData] = useState(null);

  useEffect(() => {
    let clickImpArray = [];

    for (let i = 0; i < 6; i++) {
      let click = Object?.values(props?.analyticsData?.click?.total)[i];
      let imp = Object?.values(props?.analyticsData?.impression?.total)[i];
      let objectKey = Object?.keys(props?.analyticsData?.impression?.total)[i];
      let name = Object?.keys(props?.analyticsData?.click?.total)[i];
      clickImpArray[i] = {
        click: click,
        impression: imp,
        name: name,
        key: objectKey,
      };
    }

    clickImpArray.forEach((item) => {
      let click = Object?.values(item.click);
      let imp = Object?.values(item.impression);
      let key = Object?.keys(item.impression);

      if (item.name.toString() === filter.toString()) {
        setLabelData(key);
        setFilterData([
          {
            label: "Impression",
            data: imp,
            borderColor: "#752444",
            backgroundColor: "#752444",
          },
          {
            label: "Clicks",
            data: click,
            borderColor: "#bad36d",
            backgroundColor: "#bad36d",
          },
        ]);
      }
    });
  }, [filter]);

  if (!filterData) {
    return <Loader />;
  }
  return (
    <motion.div
      className="flex w-full flex-col gap-[16px] rounded-[8px] bg-white p-[24px]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col justify-between lg:flex-row ">
        <div className="flex items-start justify-between gap-[10px] sm:justify-start sm:gap-[40px]">
          <h4>Analytics</h4>
          <div className="mb-[10px] flex flex-col gap-[5px] sm:flex-row sm:gap-[16px] md:mb-0">
            <div className="flex gap-1">
              <span className="h-[14px] w-[14px] rounded-[3px] bg-brand_primary"></span>
              <p>Impression</p>
            </div>
            <div className="flex gap-1">
              <span className="h-[14px] w-[14px] rounded-[3px] bg-[#828282]"></span>
              <p>Click</p>
            </div>
          </div>
        </div>
        <span
          tabIndex={0}
          className="custom-transition dropdown flex w-[130px] cursor-pointer items-center justify-between gap-[10px] rounded-[8px] border border-[#EEEEEE] px-[8px] py-[4px]"
        >
          <p>{filter}</p>
          <ArrowDownIcon className="text-brand_primary" />
          <ul
            tabIndex={0}
            className="dropdown-content menu left-[0] top-[35px] w-fit rounded-[8px] bg-base-100 p-2 shadow"
          >
            {analytics.map((item, i) => (
              <li key={i} onClick={() => setFilter(item.label)}>
                <p className="text-[12px] active:bg-brand_primary sm:text-[14px] ">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </span>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Chart */}
        <div className="max-w-[1200px] overflow-x-auto md:w-[4000px]">
          <LineChart filterData={filterData} labelData={labelData} />
        </div>
        {/* Stats */}
        <div className="mt-[10px] flex w-full max-w-[350px] flex-row md:flex-col items-center gap-[16px]">
          {filterData.map((item, i) => (
            <StatsCard
              key={i}
              label={item.label}
              count={item.data.reduce((partialSum, a) => partialSum + a, 0)}
              icon={
                item.label === "Impression" ? (
                  <ImpressionIcon color="#262626" />
                ) : (
                  <ClickIcon color="#262626" />
                )
              }
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
