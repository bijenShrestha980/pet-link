import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
// UTILS
import { COUNTRIES } from "@/utils/countries";
import { ArrowDownIcon, EyeCloseIcon, EyeOpenIcon } from "@/utils/icons";
// COMPONENTS
import Btn from "@/components/Button/Btn";
import Ellipsis from "@/layout/Loader/Ellipsis";
// FEATURES
import { useSignupAuthMutation } from "@/features/api/authApi";
import { clearState } from "@/features/slice/appSlice";

const Signup = () => {
  const [page, setPage] = useState(0);

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className={`transition-all duration-700 ease-in-out ${
          page === 0 ? "translate-x-0" : "absolute -translate-x-96 opacity-0"
        }`}
      >
        <h2 className="mb-[5px] text-[20px] font-[800] leading-[28px]">
          BECOME A MEMBER !
        </h2>
        <p className="mb-[40px] text-[14px] font-[400] text-[#828282]">
          Please enter your details to become a member.
        </p>
      </div>
      <div
        className={`transition-all duration-700 ease-in-out ${
          page === 1 ? "translate-x-0" : "absolute -translate-x-96 opacity-0"
        }`}
      >
        <h2 className="mb-[5px] text-[20px] font-[800] leading-[28px]">
          Password !
        </h2>
        <ul className="mb-[40px] list-disc">
          <li className="mb-[8px] ml-[16px] text-[14px] font-[400] text-[#828282]">
            Must be at least 8 character long
          </li>
          <li className="mb-[8px] ml-[16px] text-[14px] font-[400] text-[#828282]">
            Must have at least 1 uppercase letter eg “A,B,C...”
          </li>
          <li className="mb-[8px] ml-[16px] text-[14px] font-[400] text-[#828282]">
            Must have at least 1 lowercase letter eg “a,b,c...”
          </li>
          <li className="mb-[8px] ml-[16px] text-[14px] font-[400] text-[#828282]">
            Must have at least 1 special character eg “@,#...”
          </li>
        </ul>
      </div>
      <Form setPage={setPage} page={page} />
      <div className="flex items-center gap-2">
        <p className="select-none text-[14px] font-[400] leading-[24px] text-[#262626]">
          Already have an account?
        </p>
        <Link
          to="/auth/login"
          className="select-none text-[14px] font-[400] leading-[24px] text-brand_primary"
        >
          Log In
        </Link>
      </div>
    </motion.div>
  );
};

const Form = (props) => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [pageChange, setPageChange] = useState(0);

  const {
    control,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signupAuth, { isLoading, isSuccess, isError, error, data }] =
    useSignupAuthMutation();

  const onSubmit = (data) => {
    signupAuth({
      name: data.name,
      email: data.email,
      phone: data.prefix.value + "-" + data.phone,
      password: data.password,
      c_password: data.c_password,
      section: "admin",
      roles: "user",
    });
  };

  useEffect(() => {
    if (pageChange > 0) {
      Object.keys(errors).length === 0 ? props.setPage(1) : props.setPage(0);
    }
  }, [pageChange]);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      clearState();
      navigate(`/auth/login`);
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="relative pt-[24px] pb-[26px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <aside
        className={`flex w-full flex-col gap-5 transition-all duration-700 ease-in-out ${
          props.page === 0
            ? "translate-x-0"
            : "absolute -translate-x-96 opacity-0"
        }`}
      >
        <div className={`flex flex-col items-start justify-start gap-1`}>
          <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
            Full Name
            {errors.name && (
              <p className="text-[#fd8686]">{errors.name.message}</p>
            )}
          </label>
          <Controller
            name="name"
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
                type="name"
                placeholder="Enter your full name"
                className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                  errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                }`}
                {...field}
              />
            )}
          />
        </div>
        <div className={`flex flex-col items-start justify-start gap-1`}>
          <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
            Email
            {errors.email && (
              <p className="text-[#fd8686]">{errors.email.message}</p>
            )}
          </label>
          <Controller
            name="email"
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
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <input
                type="email"
                placeholder="Enter your email address"
                className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                  errors.email ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                }`}
                {...field}
              />
            )}
          />
        </div>
        <div
          className={`mb-[20px] flex flex-col items-start justify-start gap-1`}
        >
          <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
            Phone Number
            {errors.prefix && (
              <p className="text-[#fd8686]">{errors.prefix.message}</p>
            )}
            {errors.phone && (
              <p className="text-[#fd8686]">{errors.phone.message}</p>
            )}
          </label>
          <div className="relative w-full">
            <span className="absolute top-[6px] left-[6px] flex h-[34px] w-[90px] items-center justify-between gap-[13px] rounded-[4px] bg-[#BCBCBC] p-[8px] text-white">
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
                  className="text-[#fff]"
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
                  className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] pl-[110px] text-[14px] font-[400] leading-[21px]  ${
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
        <span
          onClick={async () => {
            await trigger(["name", "email", "phone"], {
              shouldFocus: true,
            }),
              setPageChange((pageChange) => pageChange + 1);
          }}
          className={`h-[44px] w-[316px] cursor-pointer select-none rounded-[8px] bg-brand_primary px-[48px] pt-[14px] pb-[12px] text-center text-[14px] font-[700] leading-[20px] text-[#ffffff] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-90`}
        >
          Next
        </span>
      </aside>

      <aside
        className={`flex w-full flex-col gap-5 transition-all duration-700 ease-in-out ${
          props.page === 1
            ? "translate-x-0"
            : "absolute top-0 -translate-x-96 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start justify-start gap-1">
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
                  type={passwordType ? `password` : "text"}
                  placeholder="Enter password"
                  className={`h-[46px] w-full rounded-md bg-[#EEEEEE] p-[14px] pt-[18px] text-[14px] font-[400] leading-[21px]  ${
                    errors.password ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                  }`}
                  {...field}
                />
              )}
            />
            {passwordType ? (
              <span onClick={() => setPasswordType(false)}>
                <EyeCloseIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
              </span>
            ) : (
              <span onClick={() => setPasswordType(true)}>
                <EyeOpenIcon className="custom-transition absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-105" />
              </span>
            )}
          </div>
        </div>
        <div className="mb-[20px] flex flex-col items-start justify-start gap-1">
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
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              }}
              render={({ field }) => (
                <input
                  type={confirmPasswordType ? `password` : "text"}
                  placeholder="Enter password"
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
        <Btn
          title={
            isLoading ? (
              <div className="flex items-center justify-center gap-4">
                <p>Please wait</p>
                <Ellipsis />
              </div>
            ) : (
              "Create Account"
            )
          }
          disabled={isLoading && true}
        />
      </aside>
    </form>
  );
};

export default Signup;
