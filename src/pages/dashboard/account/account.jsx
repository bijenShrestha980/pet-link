import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { motion } from "framer-motion";
// ASSETS
import user from "../../../assets/images/user.png";
import { getCompressedImage } from "../../../utils/getCompressedImage";
import { COUNTRIES } from "../../../utils/countries";
import { ArrowDownIcon } from "../../../utils/icons";
// FEATURES
import { appSelector } from "../../../features/slice/appSlice";
import {
  useAddUserMutation,
  useGetUserByIdQuery,
} from "../../../features/api/userApi";
// COMPONENTS
import Btn from "../../../components/Button/Btn";
import Loader from "../../../layout/Loader/Loader";
import Ellipsis from "../../../layout/Loader/Ellipsis";

const Account = () => {
  const { token } = useSelector(appSelector);
  const id = token.affix_userId;

  const {
    data: userByIdData,
    isLoading: userByIdIsLoading,
    isSuccess: userByIdIsSuccess,
  } = useGetUserByIdQuery({ id });

  if (userByIdIsLoading || !userByIdIsSuccess) {
    return <Loader />;
  }
  return (
    <motion.div
      className="mb-[20px] lg:mr-[20px] xl:mr-[40px]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex gap-[40px] items-center mb-[24px]">
        <h2>Account</h2>
      </div>
      {/* Form */}
      <Form
        userData={userByIdData.data.personal_information[0]}
        email={userByIdData.data?.email}
        phone={userByIdData.data?.phone}
        user_id={userByIdData.data?.id}
      />
    </motion.div>
  );
};

const Form = (props) => {
  const navigate = useNavigate();
  const imageRef = useRef();
  const [image, setImage] = useState(
    `${import.meta.env.VITE_BASE_URL}/images/${props.userData?.image}`
  );
  const [compressedImage, setCompressedImage] = useState(null);
  const [landline, setLandline] = useState(null);

  const [
    addUser,
    {
      data: userData,
      error: addUserError,
      isLoading: addUserIsLoading,
      isSuccess: addUserIsSuccess,
    },
  ] = useAddUserMutation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // set image/compressed image file and url
  const handleImage = (imageRef) => {
    getCompressedImage(imageRef.current.files[0]).then((result) => {
      const reader = new FileReader();
      reader.readAsDataURL(result);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      setCompressedImage(result);
    });
  };

  // submit form
  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).map((key) =>
      key[0] === "landinePrefix" || key[0] === "home_phone"
        ? ""
        : formData.append(key[0], key[1])
    );
    formData.append(
      "home_phone",
      data.landinePrefix.value + "-" + data.home_phone
    );
    formData.append(
      "image",
      compressedImage ? compressedImage : props.userData.image_id
    );
    formData.append(
      "identification_number",
      props.userData?.identification_number
    );
    formData.append("user_id", props.user_id);

    addUser(formData);
  };

  // set landline value
  useEffect(() => {
    if (
      props.userData?.home_phone &&
      props.userData?.home_phone?.split("-").length > 1
    ) {
      COUNTRIES.map(
        (item) =>
          item.prefix === `${props.userData?.home_phone?.split("-")[0]}` &&
          setLandline({
            label: item.name + " " + item.prefix,
            value: item.prefix,
          })
      );
    } else {
      setLandline({
        label: +977,
        value: +977,
      });
    }
  }, [props.userData]);

  useEffect(() => {
    if (addUserIsSuccess) {
      navigate("/dashboard");
      toast.success(userData.message);
    }
    if (addUserError) {
      toast.error(addUserError.data.message);
    }
  }, [addUserIsSuccess, addUserError]);

  if (!landline) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <motion.form
      className="bg-white rounded-[8px] p-[20px] md:p-[40px] flex flex-col items-start"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <div className="w-full flex flex-col md:flex-row items-center gap-[16px] mb-[32px]">
        <span className="w-[118px] h-[118px] bg-[#EEEEEE] rounded-full">
          <img
            src={image ? image : user}
            alt="profile imge"
            loading={props.userData.full_name}
            className="w-[118px] h-[118px] bg-[#EEEEEE] object-cover rounded-full"
          />
        </span>
        <div className="flex flex-col items-center md:items-start gap-[8px]">
          <span
            onClick={() => imageRef.current.click()}
            className={`border text-[14px] font-[700] py-[8px] px-[32px] rounded-[8px] w-[113px] h-[38px] select-none cursor-pointer custom-transition hover:scale-105 ${
              compressedImage
                ? "bg-brand_primary text-white opacity-50"
                : "border-brand_primary text-brand_primary"
            }`}
          >
            Upload
          </span>
          <p className="text-[14px] font-[400] text-[#828282] select-none">
            Image must be PNG or JPG
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={imageRef}
          onChange={() => handleImage(imageRef)}
        />
      </div>
      <div className="w-full md:grid md:grid-cols-2 gap-2 md:gap-[24px]">
        <div className="w-full col-span-1 flex flex-col justify-start items-start gap-[14px] md:gap-[24px] mb-[24px] md:mb-0">
          {/* Email */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Email
            </label>
            <input
              type={"email"}
              placeholder="Enter your email"
              defaultValue={props.email}
              disabled
              className={`bg-transparent  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] px-0 pt-[18px]`}
            />
          </div>
          {/* Full name */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Full Name
              {errors.name && (
                <p className="text-[#fd8686]">{errors.name.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name="full_name"
                defaultValue={props.userData?.full_name}
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
                    id="full_name"
                    type={"text"}
                    placeholder="Enter your full name"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* Landline */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Landline Number
              {errors.home_phone && (
                <p className="text-[#fd8686]">{errors.home_phone.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <span className="absolute top-[6px] left-[6px] w-[90px] h-[34px] bg-[#BCBCBC] p-[8px] text-white rounded-[4px] flex justify-between items-center gap-[13px]">
                <p className="pt-[3px]">
                  {watch("landinePrefix")
                    ? watch("landinePrefix")?.value
                    : landline?.value}
                </p>
                <ArrowDownIcon className="h-[20px]" />
              </span>
              <Controller
                name="landinePrefix"
                defaultValue={landline ? landline : ""}
                control={control}
                // rules={{
                //   required: true,
                // }}
                render={({ field }) => (
                  <ReactSelect
                    id={"landinePrefix"}
                    defaultValue={landline ? landline : ""}
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
                name="home_phone"
                defaultValue={
                  props.userData?.home_phone?.split("-")?.length > 1
                    ? props.userData?.home_phone?.split("-")[1]
                    : props.userData?.home_phone
                }
                control={control}
                rules={{
                  // required: true,
                  valueAsNumber: true,
                  minLength: {
                    value: 4,
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
                    id="home_phone"
                    placeholder="Enter your landline number"
                    onWheel={(e) => e.target.blur()}
                    className={`pl-[110px] bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.home_phone
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full col-span-1 flex flex-col justify-start items-start gap-[14px] md:gap-[24px] mb-[24px] md:mb-0">
          {/* Phone */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Phone Number
            </label>
            <div className="w-full relative">
              <input
                type={"text"}
                placeholder="Enter your phone number"
                defaultValue={props?.phone}
                disabled
                className={`bg-transparent  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] px-0 pt-[18px]`}
              />
            </div>
          </div>
          {/* Address */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Address
              {errors.address && (
                <p className="text-[#fd8686]">{errors.address.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name="address"
                defaultValue={props.userData?.address}
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
                    id="address"
                    placeholder="Enter your address"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.address ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* Website */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Website
              {errors.website && (
                <p className="text-[#fd8686]">{errors.website.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name="website"
                defaultValue={
                  props.userData?.website ? props.userData?.website : ""
                }
                control={control}
                rules={{
                  // required: true,
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
                    id="website"
                    placeholder="Enter your website"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.website ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full col-span-2 flex flex-col justify-start items-start gap-[14px] md:gap-[24px] mb-[24px] md:mb-0">
          {/* Intro */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Bio
              {errors.intro && (
                <p className="text-[#fd8686]">{errors.intro.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name="intro"
                defaultValue={props.userData?.intro}
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
                  <textarea
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                    className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full rounded-md p-[14px] pt-[18px] ${
                      errors.intro ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  ></textarea>
                )}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <Btn
            title={
              addUserIsLoading ? (
                <div className="flex justify-center items-center gap-4">
                  <p>Updating</p>
                  <Ellipsis />
                </div>
              ) : (
                "Update"
              )
            }
            disabled={addUserIsLoading && true}
          />
        </div>
      </div>
    </motion.form>
  );
};

export default Account;
