import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
// COMPONENTS
import Btn from "@/components/Button/Btn";
import Ellipsis from "@/layout/Loader/Ellipsis";
// FEATURES
import { useForgotPasswordMutation } from "@/features/api/authApi";
import { clearState } from "@/features/slice/appSlice";

const Forgot_password = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="mb-[5px] text-[20px] font-[800] leading-[28px]">
        FORGOT PASSWORD !
      </h2>
      <p className="mb-[40px] text-[14px] font-[400] text-[#828282]">
        Please enter your email.
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
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPassword, { isLoading, isSuccess, isError, error, data }] =
    useForgotPasswordMutation();

  const onSubmit = (data) => {
    forgotPassword({
      email: data.email,
    });
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
        className={`flex w-full flex-col items-start justify-start gap-1 transition-all duration-700 ease-in-out`}
      >
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

      <div className="mt-[5px] flex items-baseline justify-end">
        <Link
          to={`/auth/login`}
          className="select-none text-[14px] font-[400] leading-[24px] text-[#262626]"
        >
          Login !
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
            "Send Code"
          )
        }
        disabled={isLoading && true}
      />
    </form>
  );
};

export default Forgot_password;
