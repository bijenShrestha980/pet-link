import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
// ASSETS
import { ChevronLeftIcon } from "../../utils/icons";
// FEATURES
import {
  useAddPageMutation,
  useUpdatePageMutation,
} from "../../features/api/pageApi";
// COMPONENTS
import Btn from "../Button/Btn";
import Ellipsis from "../../layout/Loader/Ellipsis";

const PageSetupModal = (props) => {
  const [
    addPage,
    {
      data: addPageData,
      error: addPageError,
      isError: addIsError,
      isLoading: addPageIsLoading,
      isSuccess: addPageIsSuccess,
    },
  ] = useAddPageMutation();

  const [
    updatePage,
    {
      data: updatePageData,
      error: updatePageError,
      isError: updateIsError,
      isLoading: updatePageIsLoading,
      isSuccess: updatePageIsSuccess,
    },
  ] = useUpdatePageMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.edit
      ? updatePage({
          ...data,
          active: data.active ? "yes" : "no",
          type: props.type,
          user_id: props.user_id,
          id: props.page_id,
        })
      : addPage({
          ...data,
          active: data.active ? "yes" : "no",
          type: props.type,
          user_id: props.user_id,
        });
  };

  useEffect(() => {
    if (addIsError) {
      toast.error(addPageError.data.message);
    }
    if (addPageIsSuccess) {
      props.setModalShow(false);
      props.setPageId(addPageData.data.id);
    }
  }, [addIsError, addPageIsSuccess]);

  useEffect(() => {
    if (updateIsError) {
      toast.error(updatePageError.data.message);
    }
    if (updatePageIsSuccess) {
      props.setModalShow(false);
      props.setPageId(updatePageData.data.id);
    }
  }, [updateIsError, updatePageIsSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={props.modalShow}
        readOnly
      />
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`modal-box bg-white rounded-[16px] p-[24px]`}>
          {props.edit ? (
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => props.setModalShow(false)}
            >
              <span className="mt-1">✕</span>
            </label>
          ) : (
            <Link
              to="/dashboard/my_link"
              className="flex items-center gap-[5px] cursor-pointer mb-[24px] border border-brand_primary rounded-[8px] w-fit py-[4px] px-[12px] transition-transform custom-transition hover:scale-105 active:scale-95"
            >
              <ChevronLeftIcon className="text-brand_primary w-[20px] h-[20px]" />
              <p className="pt-[5px] text-brand_primary">Back</p>
            </Link>
          )}
          <h2 className="pb-[24px]">Link Setup</h2>
          <div className={`w-full h-full flex flex-col gap-[24px]`}>
            <div className="w-full flex flex-col justify-start items-start gap-[4px]">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                Page Name
                {errors.name && (
                  <p className="text-[#fd8686]">{errors.name.message}</p>
                )}
              </label>
              <div className="w-full relative">
                <Controller
                  name="name"
                  defaultValue={
                    props.pageData ? props.pageData?.page?.name : ""
                  }
                  control={control}
                  rules={{
                    required: true,
                    minLength: {
                      value: 1,
                      message: "Min character length required",
                    },
                    maxLength: {
                      value: 99,
                      message: "Max character length exceded",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type={"text"}
                      placeholder="Enter your page name"
                      className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                        errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                      }`}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-[4px]">
              <label className="cursor-pointer label flex justify-start items-start gap-[8px]">
                <Controller
                  name="active"
                  // defaultValue={
                  //   props.pageData
                  //     ? props.pageData?.page?.active === "yes"
                  //     : true
                  //     ? false
                  //     : false
                  // }
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      defaultChecked={
                        props.pageData
                          ? props.pageData?.page?.active === "yes"
                          : true
                            ? false
                            : false
                      }
                      className="checkbox checkbox-success h-[20px] w-[20px] rounded-[4px] border-[#BCBCBC]"
                      {...field}
                    />
                  )}
                />
                <div>
                  <span className="label-text mt-[5px] text-[14px] text-[#262626] font-[700] leading-[18.2px]">
                    Activate this page
                  </span>
                  {props.pageData?.page?.active === "yes" ? (
                    <p>This page is currently active</p>
                  ) : (
                    <p>You have another page activated now</p>
                  )}
                </div>
              </label>
            </div>
            <div className="col-span-2 flex justify-end mt-[20px]">
              <Btn
                title={
                  addPageIsLoading || updatePageIsLoading ? (
                    <div className="flex justify-center items-center gap-4">
                      <p>Please wait</p>
                      <Ellipsis />
                    </div>
                  ) : (
                    "Setup"
                  )
                }
                className="transition-transform"
                disabled={(addPageIsLoading || updatePageIsLoading) && true}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default PageSetupModal;
