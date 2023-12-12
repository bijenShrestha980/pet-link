import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
// ASSETS
import { ArrowDownIcon, ChevronLeftIcon } from "../../utils/icons";
import { COUNTRIES } from "../../utils/countries";
import Btn from "../Button/Btn";
import Ellipsis from "../../layout/Loader/Ellipsis";
import { usePostBulkUserMutation } from "../../features/api/bulkUser";
const CreateUserModal = (props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [bulkUser, { error, isError, isLoading, isSuccess }] =
    usePostBulkUserMutation();
  const onSubmit = (data) => {
    const formData = new FormData();
    const phoneNumber = `${data.prefix.value}-${data.phone}`;
    formData.append("email", data.userEmail);
    formData.append("name", data.userName);
    formData.append("password", data.password);
    formData.append("c_password", data.confirmPassword);
    formData.append("phone", phoneNumber);
    bulkUser(formData);
  };

  return (
    <div className="p-[24px] relative">
      <label
        htmlFor="addUserModel"
        className="btn btn-sm btn-circle absolute right-2 top-2  "
        onClick={() => props.setModalShow(false)}
      >
        <span className="mt-1">✕</span>
      </label>
      <form
        className="lg:col-span-2 mb-[24px] lg:mb-0 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="pb-[24px]">Create User</h2>
        <div className={`w-full h-full flex flex-col gap-[24px]`}>
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <div className="w-full relative mb-6">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                User Email
                {errors.userEmail && (
                  <p className="text-[#fd8686]">{errors.userEmail.message}</p>
                )}
              </label>
              <Controller
                name="userEmail"
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
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <input
                    type={"text"}
                    placeholder="Enter your email"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] focus-visible:outline-none pt-[18px] ${
                      errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-full relative mb-6">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                User's Name
                {errors.userName && (
                  <p className="text-[#fd8686]">{errors.userName.message}</p>
                )}
              </label>
              <Controller
                name="userName"
                control={control}
                rules={{
                  required: "Please enter User Name",
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
                    placeholder="Enter your Name"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] focus-visible:outline-none pt-[18px] ${
                      errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="w-full mb-6">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                User's Phone Number
                {errors.userPhone && (
                  <p className="text-[#fd8686]">{errors.userPhone.message}</p>
                )}
              </label>
              <div className=" relative">
                <span className="absolute top-[6px] left-[6px] w-[90px] h-[34px] bg-[#BCBCBC] p-[8px] text-white rounded-[4px] flex justify-between items-center gap-[13px]">
                  <p className="pt-[3px]">
                    {watch("prefix") ? watch("prefix")?.value : "+977"}
                  </p>
                  <ArrowDownIcon className="h-[20px]" />
                </span>
                <Controller
                  name="prefix"
                  defaultValue={{
                    label: "+977",
                    value: "+977",
                  }}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <ReactSelect
                      id={"prefix"}
                      options={COUNTRIES.map((item) => ({
                        label: item.name + " " + item.prefix,
                        value: item.prefix,
                      }))}
                      // menuIsOpen={true}
                      className="text-[#fff] absolute z-10"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: "14px",
                          position: "absolute",
                          outlineWidth: 0,
                          borderRadius: "4px",
                          borderWidth: "0px",
                          padding: "0",
                          margin: "0",
                          flexShrink: 1,
                          cursor: "pointer",
                          width: "90px",
                          top: "4px",
                          left: "4px",
                          opacity: 0,
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontWeight: 600,
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "#f8ffd29e"
                            : state.isSelected
                              ? "#752444"
                              : "#fff",
                          color: state.isSelected ? "#fff" : "#3f4247",
                        }),
                      }}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: true,
                    minLength: {
                      value: 9,
                      message: "Min character length required",
                    },
                    maxLength: {
                      value: 15,
                      message: "Max character length exceded",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder="Enter your phone number"
                      onWheel={(e) => e.target.blur()}
                      className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] pl-[110px] ${
                        errors.phone || errors.prefix
                          ? "outline-[#ffbbbb]"
                          : "outline-[#EEEEEE]"
                      }`}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full relative mb-6">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                Password
                {errors.password && (
                  <p className="text-[#fd8686]">{errors.password.message}</p>
                )}
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Please enter password",
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
                    type={"text"}
                    placeholder="Enter your password"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] focus-visible:outline-none pt-[18px] ${
                      errors.password
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-full relative mb-6">
              <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                Confirm Password
                {errors.confirmPassword && (
                  <p className="text-[#fd8686]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm password",
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
                    type={"text"}
                    placeholder="Confirm your password"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] focus-visible:outline-none pt-[18px] ${
                      errors.confirmPassword
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-end ">
            <Btn
              title={isLoading ? "Saving" : "Save"}
              disabled={isLoading && true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
