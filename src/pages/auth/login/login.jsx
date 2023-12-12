import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { useLoginAuthMutation } from "@/features/api/authApi";
import { appSelector, clearState, login } from "@/features/slice/appSlice";

const Login = () => {
  const navigate = useNavigate();
  const { token } = useSelector(appSelector);
  const [loginType, setLoginType] = useState("email");

  useEffect(() => {
    if (token.affix_token) {
      navigate("/dashboard/home");
    }
  }, [token.affix_token]);

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="mb-[5px] text-[20px] font-[800] leading-[28px]">
        LOG IN !
      </h2>
      <p className="mb-[40px] text-[14px] font-[400] text-[#828282]">
        Please enter your details to continue.
      </p>
      <div className="flex flex-col justify-start gap-4 md:flex-row md:items-center">
        <label
          htmlFor="email"
          className={`flex w-[208px] cursor-pointer select-none items-center justify-start rounded-md border p-[14px] transition-all duration-300 ease-in-out hover:scale-105 hover:border-brand_primary active:shadow-md ${
            loginType === "email"
              ? "border-brand_primary text-brborder-brand_primary"
              : "border-[#BCBCBC] text-[#262626]"
          }`}
        >
          <input
            name="list-radio"
            type="radio"
            id="email"
            defaultChecked
            onClick={() => setLoginType("email")}
            className={`radio mr-2 h-[1.2rem] w-[1.2rem] checked:radio-warning`}
          />
          <p className="select-none pt-[5px] text-[14px] font-[400]">
            Use Email
          </p>
        </label>
        <label
          htmlFor="number"
          className={`flex w-[208px] cursor-pointer select-none items-center justify-start rounded-md border p-[14px] transition-all duration-300 ease-in-out hover:scale-105 hover:border-brand_primary active:shadow-md ${
            loginType === "number"
              ? "border-brand_primary text-braborder-brand_primary"
              : "border-[#BCBCBC] text-[#262626]"
          }`}
        >
          <input
            name="list-radio"
            type="radio"
            id="number"
            onClick={() => setLoginType("number")}
            className={`radio mr-2 h-[1.2rem] w-[1.2rem] checked:radio-warning`}
          />
          <p className="select-none pt-[5px] text-[14px] font-[400]">
            Use Phone Number
          </p>
        </label>
      </div>
      {/* FORM */}
      <Form loginType={loginType} />
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

const Form = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginAuth, { isLoading, isSuccess, isError, error, data }] =
    useLoginAuthMutation();

  const onSubmit = (data) => {
    loginAuth({
      email:
        props.loginType === "email"
          ? data.email
          : data.prefix.value + "-" + data.phone,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      clearState();
      dispatch(
        login({
          token: data.data.token,
          project_id: data.data.project_id,
          project_name: data.data.project_name,
          user_id: data.data.user_id,
          expires: rememberMe ? 365 : "",
        })
      );
      navigate(`/dashboard/home`);
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="flex flex-col gap-5 pt-[24px] pb-[26px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`flex w-full flex-col items-start justify-start gap-1 transition-all duration-700 ease-in-out ${
          props.loginType === "email"
            ? "translate-x-0"
            : "absolute -translate-x-96 opacity-0"
        }`}
      >
        <label className="flex select-none items-center gap-4 text-[14px] font-[700] leading-[20px]">
          Email
          {errors.email && (
            <p className="text-[#fd8686]">{errors.email.message}</p>
          )}
        </label>
        {props.loginType === "email" && (
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
        )}
      </div>

      <div
        className={`flex w-full flex-col items-start justify-start gap-1 transition-all duration-700 ease-in-out ${
          props.loginType === "number"
            ? "z-10 translate-x-0"
            : "absolute -translate-x-96 opacity-0"
        }`}
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
        {props.loginType === "number" && (
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
                  // menuIsOpen={true}
                  className="absolute z-10 text-[#fff]"
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
        )}
      </div>

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
      <div className="flex items-baseline justify-between">
        <label className="label cursor-pointer py-0">
          <input
            type="checkbox"
            className="checkbox-success checkbox h-[15px] w-[15px] rounded-[4px] border-[#BCBCBC] outline-none"
            onChange={() => setRememberMe((current) => !current)}
          />

          <span className="label-text ml-[5px] mt-[5px] text-[14px] font-[400] leading-[24px] text-[#262626]">
            Remember me
          </span>
        </label>
        <Link
          to={`/auth/forgot_password`}
          className="select-none text-[14px] font-[400] leading-[24px] text-[#262626]"
        >
          Forgot Password ?
        </Link>
      </div>
      <Btn
        title={
          isLoading ? (
            <div className="flex items-center justify-center gap-4">
              <p>Please wait</p>
              <Ellipsis />
            </div>
          ) : (
            "Login"
          )
        }
        disabled={isLoading && true}
      />
    </form>
  );
};

export default Login;
