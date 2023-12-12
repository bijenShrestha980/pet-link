import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
// COMPONENTS
import Btn from "@/components/Button/Btn";
import Ellipsis from "@/layout/Loader/Ellipsis";
// FEATURES
import { useResetPasswordMutation } from "@/features/api/authApi";
import { clearState } from "@/features/slice/appSlice";
import { EyeCloseIcon, EyeOpenIcon } from "@/utils/icons";

const Reset_password = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="mb-[5px] text-[20px] font-[800] leading-[28px]">
        RESET PASSWORD !
      </h2>
      <p className="mb-[40px] text-[14px] font-[400] text-[#828282]">
        Please enter your password.
      </p>
      {/* FORM */}
      <Form />
      <div className="flex items-center gap-2">
        <p className="select-none text-[14px] font-[400] leading-[24px] text-[#262626]">
          Not a member yet?
        </p>
        <Link
          to="/auth/signup"
          className="select-none text-[14px] font-[400] leading-[24px] text-brand_primary"
        >
          Become a Member
        </Link>
      </div>
    </motion.div>
  );
};

const Form = () => {
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading, isSuccess, isError, error, data }] =
    useResetPasswordMutation();

  const onSubmit = (data) => {
    resetPassword({ ...data, token: location.search?.split("=")[1] });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      clearState();
      toast.success(data.message);
      navigate(`/auth/login`);
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="flex flex-col gap-5 pb-[26px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`flex w-full flex-col items-start justify-start gap-4 transition-all duration-700 ease-in-out`}
      >
        {/* Password */}
        <div className="flex w-full flex-col items-start justify-start gap-[4px]">
          <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
            Password
            {errors.password && (
              <p className="text-[#fd8686]">{errors.password.message}</p>
            )}
          </label>
          <div className="relative w-full">
            <Controller
              name="password"
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
                  placeholder="Enter your email address"
                  className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                    errors.password ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
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
            {errors.password_confirmation && (
              <p className="text-[#fd8686]">
                {errors.password_confirmation.message}
              </p>
            )}
          </label>
          <div className="relative w-full">
            <Controller
              name="password_confirmation"
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
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              }}
              render={({ field }) => (
                <input
                  type={confirmPasswordType ? `password` : "text"}
                  placeholder="Enter your email address"
                  className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                    errors.password_confirmation
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
      </div>

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
    </form>
  );
};

export default Reset_password;
