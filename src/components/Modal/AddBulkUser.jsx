import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
// ASSETS
import { ChevronLeftIcon } from "../../utils/icons";
// FEATURES
// import {
//   useAddPageMutation,
//   useUpdatePageMutation,
// } from '../../features/api/pageApi'
// COMPONENTS
import Btn from "../Button/Btn";
import Ellipsis from "../../layout/Loader/Ellipsis";
import { usePostBulkUserByCsvMutation } from "../../features/api/bulkUser";
const AddBulkUser = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [bulkUser, { error, isError, isLoading, isSuccess }] =
    usePostBulkUserByCsvMutation();
  const fileRef = useRef();
  const zipRef = useRef();
  const [xlslFile, setXlslFile] = useState(null);
  const [xlslFileError, setXlslFileError] = useState(false);
  const [zipFile, setZipFile] = useState(null);
  const [zipFileError, setZipFileError] = useState(false);
  const onSubmit = (data) => {
    console.log(data, xlslFile, "fileError", xlslFileError);
    console.log(zipFile, "zipFileError", zipFileError);
    const formData = new FormData();
    formData.append("file", xlslFile);
    formData.append("zip", zipFile);
    formData.append("project_id", 1);
    if (zipFile || xlslFile) {
      bulkUser(formData);
    }
  };

  return (
    <div className="p-[24px] relative">
      <label
        htmlFor="addBulkUserModel"
        className="btn btn-sm btn-circle absolute right-2 top-2  "
      >
        <span className="mt-1">✕</span>
      </label>
      <form
        className="lg:col-span-2 mb-[24px] lg:mb-0 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="pb-[24px]">Add Bulk User</h2>
        <div className={`w-full h-full flex flex-col gap-[24px]`}>
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            {/* XLXL file upload */}
            <div className="w-full flex flex-col justify-start items-start gap-[4px] mb-6">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                Upload XLSL file
              </label>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-[8px]">
                <span
                  onClick={() => fileRef.current.click()}
                  className={`border text-[14px] font-[700] py-[8px] px-[32px] rounded-[8px] w-[113px] h-[38px] select-none cursor-pointer custom-transition hover:scale-105 ${
                    !xlslFileError || xlslFile
                      ? "border-brand_primary text-brand_primary"
                      : "border border-[#ffbbbb] text-[#ffbbbb]"
                  } ${
                    xlslFile ? "bg-brand_primary text-white opacity-50" : ""
                  }`}
                >
                  Upload
                </span>
                <p className="text-[12px] sm:text-[14px] font-[400] text-[#828282] select-none custom-transition">
                  {xlslFile ? xlslFile?.name : "Upload your file"}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx"
                ref={fileRef}
                onChange={() => setXlslFile(fileRef.current.files[0])}
              />
            </div>
            {/* Zip file upload */}
            <div className="w-full flex flex-col justify-start items-start gap-[4px]">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                Upload ZIP file
              </label>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-[8px]">
                <span
                  onClick={() => zipRef.current.click()}
                  className={`border text-[14px] font-[700] py-[8px] px-[32px] rounded-[8px] w-[113px] h-[38px] select-none cursor-pointer custom-transition hover:scale-105 ${
                    !zipFileError || zipFile
                      ? "border-brand_primary text-brand_primary"
                      : "border border-[#ffbbbb] text-[#ffbbbb]"
                  } ${zipFile ? "bg-brand_primary text-white opacity-50" : ""}`}
                >
                  Upload
                </span>
                <p className="text-[12px] sm:text-[14px] font-[400] text-[#828282] select-none custom-transition">
                  {zipFile ? zipFile?.name : "Upload your file"}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".zip"
                ref={zipRef}
                onChange={() => setZipFile(zipRef.current.files[0])}
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-end ">
            <Btn
              title="Save"
              // disabled={(addPageIsLoading || updatePageIsLoading) && true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBulkUser;
