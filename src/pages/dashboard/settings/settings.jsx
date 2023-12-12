import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
// FEATURES
import {
  useChangePasswordMutation,
  useSetPinMutation,
} from "../../../features/api/authApi";
// ASSETS
import { EyeCloseIcon, EyeOpenIcon } from "../../../utils/icons";
// COMPONENTS
import Btn from "../../../components/Button/Btn";
import Ellipsis from "../../../layout/Loader/Ellipsis";

const Settings = () => {
  return (
    <div className="mr-0 mb-[20px] lg:mr-[20px]">
      {/* Header */}
      <div className="mb-[24px] flex items-center gap-[40px]">
        <h2 className="capitalize">Settings</h2>
      </div>
      {/* Accordian */}
      <div className="flex w-full flex-wrap items-center gap-[16px]">
        {/* Change Password */}
        <ChangePassword />
        {/* Change Pin */}
        <ChangePin />
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [oldPasswordType, setOldPasswordType] = useState(true);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changePasswordAuth, { isLoading, isSuccess, isError, error, data }] =
    useChangePasswordMutation();

  // submit form
  const onSubmit = (data) => {
    changePasswordAuth(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      reset();
      toast.success(data.message);
    }
  }, [isError, isSuccess]);

  return (
    <motion.div
      className="collapse-plus rounded-box collapse w-full bg-white"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <input type="checkbox" />
      <div className="collapse-title flex items-center">
        <h3>Change Password</h3>
      </div>
      <form
        className="collapse-content w-full gap-[24px] md:grid md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1 mb-[24px] flex w-full flex-col items-start justify-start gap-[24px] md:mb-0">
          {/* Old Password */}
          <div className="flex w-full flex-col items-start justify-start gap-[4px]">
            <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
              Old Password
              {errors.old_password && (
                <p className="text-[#fd8686]">{errors.old_password.message}</p>
              )}
            </label>
            <div className="relative w-full">
              <Controller
                name="old_password"
                defaultValue=""
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
                    type={oldPasswordType ? `password` : "text"}
                    placeholder="Enter your old password"
                    className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                      errors.old_password
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
              {oldPasswordType ? (
                <span onClick={() => setOldPasswordType(false)}>
                  <EyeCloseIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
                </span>
              ) : (
                <span onClick={() => setOldPasswordType(true)}>
                  <EyeOpenIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
                </span>
              )}
            </div>
          </div>
          {/* New Password */}
          <div className="flex w-full flex-col items-start justify-start gap-[4px]">
            <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
              New Password
              {errors.new_password && (
                <p className="text-[#fd8686]">{errors.new_password.message}</p>
              )}
            </label>
            <div className="relative w-full">
              <Controller
                name="new_password"
                defaultValue=""
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
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Enter a valid password",
                  },
                }}
                render={({ field }) => (
                  <input
                    type={newPasswordType ? `password` : "text"}
                    placeholder="Enter your new password"
                    className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                      errors.new_password
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
              {newPasswordType ? (
                <span onClick={() => setNewPasswordType(false)}>
                  <EyeCloseIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
                </span>
              ) : (
                <span onClick={() => setNewPasswordType(true)}>
                  <EyeOpenIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
                </span>
              )}
            </div>
          </div>
          {/* Confirm Password */}
          <div className="flex w-full flex-col items-start justify-start gap-[4px]">
            <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
              Confirm Password
              {errors.c_password && (
                <p className="text-[#fd8686]">{errors.c_password.message}</p>
              )}
            </label>
            <div className="relative w-full">
              <Controller
                name="c_password"
                defaultValue=""
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
                  validate: (val) => {
                    if (watch("new_password") != val) {
                      return "Your passwords do not match";
                    }
                  },
                }}
                render={({ field }) => (
                  <input
                    type={confirmPasswordType ? `password` : "text"}
                    placeholder="Re-enter your new password"
                    className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                      errors.c_password
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
              {confirmPasswordType ? (
                <span onClick={() => setConfirmPasswordType(false)}>
                  <EyeCloseIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
                </span>
              ) : (
                <span onClick={() => setConfirmPasswordType(true)}>
                  <EyeOpenIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Btn
              title={
                isLoading ? (
                  <div className="flex items-center justify-center gap-4">
                    <p>Please wait</p>
                    <Ellipsis />
                  </div>
                ) : (
                  "Submit"
                )
              }
              disabled={isLoading && true}
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
};

const ChangePin = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [setPin, { isLoading, isSuccess, isError, error, data }] =
    useSetPinMutation();

  // submit form
  const onSubmit = (data) => {
    setPin({ ...data, status: data.status === true ? 2 : 1 });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      reset();
      toast.success(data.message);
    }
  }, [isError, isSuccess]);

  return (
    <motion.div
      tabIndex={1}
      className="collapse-plus rounded-box collapse w-full bg-white"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <input type="checkbox" />
      <div className="collapse-title  flex items-center">
        <h3>Change Pin</h3>
      </div>
      <form
        className="collapse-content w-full gap-[24px] md:grid md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1 mb-[24px] flex w-full flex-col items-start justify-start gap-[24px] md:mb-0">
          {/* Pin */}
          <div className="flex w-full flex-col items-start justify-start gap-[4px]">
            <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
              Pin
              {errors.pin && (
                <p className="text-[#fd8686]">{errors.pin.message}</p>
              )}
            </label>
            <div className="relative w-full">
              <Controller
                name="pin"
                defaultValue=""
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
                    type="number"
                    placeholder="Enter your pin"
                    className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                      errors.pin ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* Confirm Pin */}
          <div className="flex w-full flex-col items-start justify-start gap-[4px]">
            <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
              Confirm Pin
              {errors.c_pin && (
                <p className="text-[#fd8686]">{errors.c_pin.message}</p>
              )}
            </label>
            <div className="relative w-full">
              <Controller
                name="c_pin"
                defaultValue=""
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
                  validate: (val) => {
                    if (watch("pin") != val) {
                      return "Your pin's do not match";
                    }
                  },
                }}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="Re-enter your pin"
                    className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                      errors.c_pin ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* Confirm Pin */}
          <div className="flex w-full flex-col items-start justify-start gap-[4px]">
            <Controller
              name="status"
              defaultValue={false}
              control={control}
              render={({ field }) => (
                <label className="label cursor-pointer py-0">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox h-[15px] w-[15px] rounded-[4px] border-[#BCBCBC]"
                    {...field}
                  />
                  <span className="label-text ml-[5px] mt-[5px] text-[14px] font-[400] leading-[24px] text-[#262626]">
                    Active
                  </span>
                </label>
              )}
            />
          </div>
          <div className="flex w-full justify-end">
            <Btn
              title={
                isLoading ? (
                  <div className="flex items-center justify-center gap-4">
                    <p>Please wait</p>
                    <Ellipsis />
                  </div>
                ) : (
                  "Submit"
                )
              }
              disabled={isLoading && true}
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Settings;
