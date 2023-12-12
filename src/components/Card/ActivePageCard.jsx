import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// FEATURES
import { appSelector } from "../../features/slice/appSlice";
import { useUpdateActivePageMutation } from "../../features/api/pageApi";
// ASSETS
import { ArrowDownIcon, NoPagesFoundIcon } from "../../utils/icons";
import { page } from "../../assets/data/page";
// COMPONENTS
import Btn from "../Button/Btn";
import Loader from "../../layout/Loader/Loader";

const ActivePageCard = (props) => {
  const navigate = useNavigate();
  const { token } = useSelector(appSelector);
  const id = token.affix_userId;
  const [filter, setFilter] = useState("all");

  const [
    updatePage,
    {
      data: updatePageData,
      isLoading: updatePageIsLoading,
      isSuccess: updatePageIsSuccess,
      error: updatePageError,
    },
  ] = useUpdateActivePageMutation();

  useEffect(() => {
    props.setLoading(updatePageIsLoading);
  }, [updatePageIsLoading]);

  useEffect(() => {
    if (updatePageIsSuccess) {
      toast.success(updatePageData.message);
    }
    if (updatePageError) {
      toast.error(updatePageError.data.message);
    }
  }, [updatePageIsSuccess, updatePageError]);

  return (
    <motion.div
      className="relative flex h-full lg:h-[414px] w-full flex-col gap-[24px] rounded-[8px] bg-white"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {updatePageIsLoading && (
        <div className="absolute flex h-full w-full justify-center rounded-[8px] bg-brand_primaryFade opacity-50">
          <Loader />
        </div>
      )}
      <div className="p-[24px]">
        {/* {props.pageIsLoading || !props.pageIsSuccess ? (
          <SkeletonComp height={'27px'} count={1} className={"mb"} />
        ) : ( */}
        <div className="mb-[26px] flex items-center justify-between">
          <h4>Active Page</h4>
          <span
            tabIndex={0}
            className="custom-transition dropdown flex cursor-pointer items-center justify-between gap-[10px] rounded-[8px] border border-[#EEEEEE] px-[8px] py-[4px]"
          >
            <p className="w-[60px] capitalize">{filter}</p>
            <ArrowDownIcon className="text-brand_primary" />
            <ul
              tabIndex={0}
              className="dropdown-content menu left-[0] top-[35px] w-full rounded-[8px] bg-base-100 p-2 shadow"
            >
              <li onClick={() => setFilter("all")}>
                <p className="rounded-[8px] capitalize active:bg-brand_primary">
                  All
                </p>
              </li>
              {page.map((item, i) => (
                <li key={i} onClick={() => setFilter(item.title)}>
                  <p className="rounded-[8px] capitalize active:bg-brand_primary">
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </span>
        </div>
        {/* )} */}
        {props.pageData.length > 0 ? (
          <ul className="flex h-full lg:h-[310px] flex-col gap-[18.5px] overflow-y-scroll pr-2">
            {props.pageData
              .filter((el) =>
                filter === "all"
                  ? el
                  : filter === "bio link"
                    ? el.type === "bio-link"
                    : filter === "iFrame"
                      ? el.type === "iframe"
                      : filter === "link"
                        ? el.type === "links"
                        : el.type === filter
              )
              .map((item, i) => (
                <li key={i}>
                  <label
                    htmlFor={item.id}
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <span className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="page-radio"
                        id={item.id}
                        defaultChecked={item.active === "yes" ? true : false}
                        className="radio-warning radio h-[16px] w-[16px]"
                        onChange={() =>
                          updatePage({ page_id: item.id, user_id: id })
                        }
                      />
                      <p className="mt-[6px] select-none">{item.name}</p>
                    </span>
                    <p className="select-none text-[12px] capitalize leading-[16px]">
                      {item.type}
                    </p>
                  </label>
                </li>
              ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center text-center">
            <NoPagesFoundIcon />

            <h3 className="mb-[8px]">No Links Found</h3>
            <p className="text-[#828282]">Looks like you haven't</p>
            <p className="mb-[16px] text-[#828282]">created any link</p>
            <Btn
              title="Create First Link"
              onClick={() => navigate("/dashboard/my_link")}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ActivePageCard;
