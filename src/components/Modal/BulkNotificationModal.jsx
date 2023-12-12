import React, { useEffect, useCallback } from "react";
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
import { usePostBulkNotificationMutation } from "../../features/api/bulkNotificationApi";
const BulkNotificationModal = (props) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      project_id: 1,
    },
  });
  const [bulkNotification, { error, isError, isLoading, isSuccess }] =
    usePostBulkNotificationMutation();
  const onSubmit = (data) => {
    if (watch().type === "text" || watch().type === "both") {
      return;
    } else {
      bulkNotification(data);
    }

    console.log(data);
  };

  return (
    <div className="p-[24px] relative">
      <label
        htmlFor="bulkMessageSending"
        className="btn btn-sm btn-circle absolute right-2 top-2  "
      >
        <span className="mt-1">✕</span>
      </label>
      <form
        className="lg:col-span-2 mb-[24px] lg:mb-0 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="pb-[24px]">Bulk Notification</h2>
        <div className={`w-full h-full flex flex-col gap-[24px]`}>
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <div className="w-full relative">
              <Controller
                name="type"
                control={control}
                defaultValue=""
                rules={{
                  required: "please select option",
                }}
                render={({ field }) => (
                  <select
                    id="countries"
                    className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] p-[14px]  focus-visible:outline-none "
                    {...field}
                  >
                    <option value="" disabled>
                      Select Sending Medium
                    </option>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="both">Both</option>
                  </select>
                )}
              />
              {(watch().type === "text" || watch().type === "both") && (
                <p className="text-[#fd8686] mt-2">
                  Selected Function Not Available
                </p>
              )}
              {errors.type && (
                <p className="text-[#fd8686] mt-2">{errors.type.message}</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Write your Message
              {errors.message && (
                <p className="text-[#fd8686]">{errors.message.message}</p>
              )}
            </label>
            <div className="w-full relative ">
              <textarea
                name=""
                className="w-full bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] p-[14px] focus-visible:outline-none "
                id=""
                cols="30"
                rows="6"
                {...register("message", { required: "Enter your Message" })}
              ></textarea>
            </div>
          </div>

          <div className="col-span-2 flex justify-end mt-[20px]">
            <div className="col-span-2 flex justify-end mt-[20px]">
              <Btn
                title={isLoading ? "Saving" : "Save"}
                disabled={isLoading && true}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BulkNotificationModal;
