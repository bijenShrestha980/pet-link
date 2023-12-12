import React from "react";
import { motion } from "framer-motion";
// ASSETS
import logo from "../../assets/images/login-affixlink-logo2.png";
import logo_small from "../../assets/images/afixlink.png";
import { ArrowDownIcon, LocationIcon } from "../../utils/icons";

const PagePreviewCard = (props) => {
  return (
    <div className="w-full h-[780px] md:h-[780px] lg:h-[680px] xl:h-[900px] bg-white p-[15px] md:p-[65px] lg:p-[15px] xl:p-[45px] rounded-l-[8px] rounded-r-[8px] lg:rounded-r-[0px] xl:rounded-r-[0px] flex flex-col gap-[24px] col-span-2 xl:col-span-1 overflow-hidden">
      <h4 className="text-center">Preview</h4>
      <span className="border-[8px] border-[#262626] overflow-hidden rounded-[35px] bg-white min-w-full sm:min-w-[320px] max-w-[320px] h-[620px] mx-auto">
        <div className="flex flex-col justify-between items-center h-full my-auto">
          {/* Bio Link*/}
          {props.page === "bio-link" && (
            <>
              <div className="w-full flex flex-col justify-center items-center overflow-auto mt-4">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/images/${props.image}`}
                  alt={props.image}
                  className="w-[107px] h-[107px] rounded-full object-cover mb-[24px]"
                />
                <h2 className="mb-[8px]">{props.nameChange}</h2>
                <p className="text-[#585858] text-[16px] mb-[40px] text-center">
                  {props.introChange}
                </p>
                <ul className="w-full flex flex-col gap-[16px] max-h-[395px] mb-[16px] overflow-y-auto scrollBarWidthNone px-4">
                  {props.listData

                    .map((item, i) =>
                      props.itemActiveChange[item.id] === undefined ? (
                        item.on_display === "yes" && (
                          <motion.li
                            key={i}
                            initial={{ x: -200, opacity: 0 }}
                            animate={{ x: 0, opacity: 100 }}
                            exit={{ x: -200, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="capitalize w-full h-[55px] border-[1px] border-[#585858] rounded-[12px] p-[14px] flex justify-center items-center relative custom-transition cursor-pointer hover:shadow-md">
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/images/${
                                  item.icon
                                }`}
                                alt=""
                                className="h-[27px] w-[27px] object-cover absolute left-[13px]"
                              />
                              <h4 className="pt-[1px]">{item.name}</h4>
                            </div>
                          </motion.li>
                        )
                      ) : props.itemActiveChange[item.id]?.name === true ? (
                        <motion.li
                          key={i}
                          initial={{ x: -200, opacity: 0 }}
                          animate={{ x: 0, opacity: 100 }}
                          exit={{ x: -200, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="capitalize w-full h-[55px] border-[1px] border-[#585858] rounded-[12px] p-[14px] flex justify-center items-center relative custom-transition cursor-pointer hover:shadow-md">
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/images/${
                                item.icon
                              }`}
                              alt=""
                              className="h-[27px] w-[27px] object-cover absolute left-[13px]"
                            />
                            <h4 className="pt-[1px]">{item.name}</h4>
                          </div>
                        </motion.li>
                      ) : (
                        <></>
                      )
                    )
                    .reverse()}
                  <div className="flex flex-col justify-center items-center w-full pb-6">
                    {props.addToContactChange && (
                      <span className="bg-brand_primary w-full h-[45px] py-[16px] text-center text-white rounded-[12px] mb-[16px] cursor-pointer custom-transition hover:shadow-md">
                        <h5 className="text-[14px] font-[700] select-none">
                          Add to Contact
                        </h5>
                      </span>
                    )}
                    <img src={logo} alt="" className="h-[45px] " />
                  </div>
                </ul>
              </div>
            </>
          )}
          {/* Books*/}
          {props.page === "books" && (
            <>
              <div className="w-full flex flex-col justify-center items-center overflow-auto">
                <h2 className="text-center pt-[20px] pb-[40px] select-none">
                  {props.nameChange}
                </h2>
                <ul className="w-full flex flex-col lg:justify-start justify-center items-center gap-[16px] mb-[16px] overflow-y-auto scrollBarWidthNone">
                  {props.listData
                    .map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex flex-col items-center h-[400px] max-w-[216px] cursor-pointer group"
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 100 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <img
                          src={
                            props.compressedImage[item.id]?.img
                              ? props.compressedImage[item.id].img
                              : item.files.image
                                ? `${import.meta.env.VITE_BASE_URL}/images/${
                                    item.files.image
                                  }`
                                : logo_small
                          }
                          alt=""
                          className="rounded-[8px] shadow-xl h-[316px] w-[216px] object-cover mb-[24px] select-none custom-transition group-active:scale-95"
                        />
                        <h3 className="text-center text-[18px] font-[700] text-[#585858] select-none custom-transition group-hover:scale-105">
                          {props.bookNameChange[item.id]
                            ? props.bookNameChange[item.id].name
                            : item.name}
                        </h3>
                      </motion.li>
                    ))
                    .reverse()}
                  <div className="flex flex-col justify-center items-center w-full pb-6">
                    <img src={logo} alt="" className="h-[45px]" />
                  </div>
                </ul>
              </div>
            </>
          )}
          {/* Menu */}
          {props.page === "menu" && (
            <>
              <div className="w-full flex flex-col justify-center items-center overflow-auto">
                <div className="w-full pt-2 flex flex-col lg:justify-start justify-center items-center gap-[16px] mb-[16px] overflow-x-hidden overflow-y-auto scrollBarWidthNone">
                  {props.listData.map((item, i) => (
                    <div className="w-full py-2 px-2" key={i}>
                      <h2 className="text-center font-[700] text-[16px] leading-[13px]">
                        {props.catNameChange[item.id]
                          ? props.catNameChange[item.id].name
                          : item.name}
                      </h2>
                      <div>
                        {item?.menus.map((item2, j) => (
                          <div key={j}>
                            <h2 className="font-[600] text-[14px] leading-[13px] text-center py-2">
                              {props.subCatNameChange[item2.id]
                                ? props.subCatNameChange[item2.id].name
                                : item2.name}
                            </h2>

                            <div className="px-4 my-2">
                              {item2?.menu_item.map((item3, k) =>
                                props.itemActiveChange[item3.id] ===
                                undefined ? (
                                  item3.active === "yes" && (
                                    <motion.div
                                      key={k}
                                      initial={{ x: -200, opacity: 0 }}
                                      animate={{ x: 0, opacity: 100 }}
                                      exit={{ x: -200, opacity: 0 }}
                                      transition={{ duration: 0.6 }}
                                    >
                                      <div className="w-full flex justify-between my-2 rounded-[4px] p-2 bg-brand_primary text-white cursor-pointer custom-transition hover:shadow-lg overflow-x-hidden">
                                        <h2 className="text-start font-[500] text-[12px] leading-[13px]">
                                          {props.itemNameChange[item3.id]
                                            ? props.itemNameChange[item3.id]
                                                .name
                                            : item3.name}
                                        </h2>
                                        <h2 className="text-start font-[500] text-[12px] leading-[13px] flex items-center">
                                          Rs:
                                          {props.priceChange[item3.id]
                                            ? props.priceChange[item3.id].name
                                            : item3.price}
                                          <ArrowDownIcon className="w-[15px] h-[15px]" />
                                        </h2>
                                      </div>
                                    </motion.div>
                                  )
                                ) : props.itemActiveChange[item3.id]?.name ===
                                  true ? (
                                  <motion.div
                                    key={k}
                                    initial={{ x: -200, opacity: 0 }}
                                    animate={{ x: 0, opacity: 100 }}
                                    exit={{ x: -200, opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                  >
                                    <div className="w-full flex justify-between my-2 rounded-[4px] p-2 bg-brand_primary text-white cursor-pointer custom-transition hover:shadow-lg overflow-x-hidden">
                                      <h2 className="text-start font-[500] text-[12px] leading-[13px]">
                                        {props.itemNameChange[item3.id]
                                          ? props.itemNameChange[item3.id].name
                                          : item3.name}
                                      </h2>
                                      <h2 className="text-start font-[500] text-[12px] leading-[13px] flex items-center">
                                        Rs:
                                        {props.priceChange[item3.id]
                                          ? props.priceChange[item3.id].name
                                          : item3.price}
                                        <ArrowDownIcon className="w-[15px] h-[15px]" />
                                      </h2>
                                    </div>
                                  </motion.div>
                                ) : (
                                  <></>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col justify-center items-center w-full pb-6">
                    <img src={logo} alt="" className="h-[45px]" />
                  </div>
                </div>
              </div>
            </>
          )}
          {/* Profile */}
          {props.page === "profile" && (
            <>
              <div className="w-full h-full">
                <div className="w-full mx-auto flex flex-col items-center justify-center mb-[40px] pt-[40px]">
                  {/* Profile Data  */}
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/images/${
                      props?.userData?.personal_information[0]?.image
                    }`}
                    alt=""
                    className="object-cover rounded-full w-[107px] h-[107px]"
                  />
                  <div className="mt-[24px]  flex flex-col items-center justify-center">
                    <h2 className="font-[700] text-[24px] leading-[36px] mb-[8px] text-center">
                      {props?.userData?.name}
                    </h2>
                    <h4 className="font-[700] text-[16px] ">
                      {props?.designationChange}
                    </h4>
                    <div className="location_Details flex items-center gap-1">
                      <LocationIcon />
                      <h4 className="font-[500] text-[14px] leading-[21px]  text-[#585858] items-start">
                        {props.companyChange}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <button className="btn w-full bg-brand_primary border-none hover:bg-brand_primary ">
                    My Info
                  </button>
                </div>
              </div>
            </>
          )}
          {/* Image */}
          {props.page === "image" && (
            <div className="w-full h-full flex justify-center items-center">
              <img src={props.imageChange} alt="imge" />
            </div>
          )}
        </div>
      </span>
    </div>
  );
};

export default PagePreviewCard;
