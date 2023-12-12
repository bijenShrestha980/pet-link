import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// ASSETS
import { getCompressedImage } from "../../utils/getCompressedImage";
import { ChevronLeftIcon } from "../../utils/icons";
import user from "../../assets/images/user.png";
// FEATURES
import { appSelector } from "../../features/slice/appSlice";
import { useAddUserMutation } from "../../features/api/userApi";
// COMPONENTS
import Btn from "../Button/Btn";
import Ellipsis from "../../layout/Loader/Ellipsis";

const InfoModal = (props) => {
  const { token } = useSelector(appSelector);
  const id = token.affix_userId;
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [modalShow, setModalShow] = useState(null);
  const [next, setNext] = useState(0);
  const [profile, setProfile] = useState(false);

  const [
    addUser,
    {
      error: addUserError,
      isError: addUserIsError,
      isLoading: addUserIsLoading,
      isSuccess: addUserIsSuccess,
    },
  ] = useAddUserMutation();

  const {
    control,
    watch,
    trigger,
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

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).map((key) => formData.append(key[0], key[1]));
    formData.append(
      "image",
      compressedImage ? compressedImage : props.userData.image_id
    );
    formData.append("identification_number", 1);
    formData.append("user_id", id);

    addUser(formData);
  };

  useEffect(() => {
    if (props.userByIdData?.length <= 0) {
      setModalShow(true);
    } else {
      setModalShow(false);
    }
  }, [props.userByIdData]);

  useEffect(() => {
    if (
      next > 0 &&
      watch("full_name") &&
      watch("address") &&
      watch("intro") &&
      compressedImage
    ) {
      setProfile(true);
    }
    if (
      next > 0 &&
      !watch("full_name") &&
      !watch("address") &&
      !watch("intro") &&
      !compressedImage
    ) {
      setProfile(false);
      trigger(["full_name", "address", "intro"]);
    }
  }, [next]);

  useEffect(() => {
    next && trigger("full_name");
  }, [watch("full_name")]);

  useEffect(() => {
    next && trigger("address");
  }, [watch("address")]);

  useEffect(() => {
    next && trigger("intro");
  }, [watch("intro")]);

  useEffect(() => {
    if (addUserIsError) {
      toast.error(addUserError.data.message);
    }
    if (addUserIsSuccess) {
      setModalShow(false);
    }
  }, [addUserIsError, addUserIsSuccess]);

  return (
    <div>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        defaultChecked={modalShow}
      />
      <div className="modal">
        <div className={`modal-box bg-white rounded-[16px] p-[40px] h-[700px]`}>
          <form
            className="bg-white rounded-[8px] flex flex-col items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Account Section */}
            <div
              className={`transition-all ease-in-out duration-700 ${
                profile
                  ? "absolute -translate-x-96 opacity-0 h-0 w-0"
                  : "translate-x-0 w-full "
              }`}
            >
              <h2 className="mb-[24px]">ACCOUNT</h2>
              <div className="w-full flex flex-col md:flex-row items-center gap-[16px] mb-[32px]">
                <span className="w-[118px] h-[118px] bg-[#EEEEEE] rounded-full">
                  <img
                    src={image ? image : user}
                    alt=""
                    className={`w-[118px] h-[118px] bg-[#EEEEEE] object-cover rounded-full ${
                      !compressedImage && next && "border-2 border-[#ffbbbb]"
                    }`}
                  />
                </span>
                <div className="flex flex-col items-center md:items-start gap-[8px]">
                  <span
                    onClick={() => imageRef.current.click()}
                    className="border border-brand_primary text-brand_primary text-[14px] font-[700] py-[8px] px-[32px] rounded-[8px] w-[113px] h-[38px] select-none cursor-pointer custom-transition hover:scale-105"
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
                  required
                />
              </div>
              <div className={`w-full flex flex-col gap-[24px]`}>
                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                  <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                    Full Name
                    {errors.full_name && (
                      <p className="text-[#fd8686]">
                        {errors.full_name.message}
                      </p>
                    )}
                  </label>
                  <div className="w-full relative">
                    <Controller
                      name="full_name"
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
                          type={"text"}
                          placeholder="Enter your full name"
                          className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] border-2 ${
                            errors.full_name
                              ? " border-[#ffbbbb]"
                              : "border-transparent"
                          }`}
                          onChange={() => trigger()}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
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
                          type={"text"}
                          placeholder="Enter your address"
                          className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] border-2 ${
                            errors.address
                              ? " border-[#ffbbbb]"
                              : "border-transparent"
                          }`}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
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
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="4"
                          cols="50"
                          className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full rounded-md p-[14px] pt-[18px] border-2 ${
                            errors.intro
                              ? " border-[#ffbbbb]"
                              : "border-transparent"
                          }`}
                          {...field}
                        ></textarea>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <span
                    className="w-[209px] h-[46px] border border-brand_primary text-brand_primary text-center text-[14px] font-[700] py-[8px] px-[32px] rounded-[8px] select-none cursor-pointer custom-transition flex justify-center items-center hover:scale-105"
                    onClick={() => setNext((next) => next + 1)}
                  >
                    Next
                  </span>
                </div>
              </div>
            </div>
            {/* Profile Section */}
            <div
              className={`h-[510px] transition-all ease-in-out duration-700 ${
                !profile
                  ? "absolute -translate-x-96 opacity-0 h-0 w-0"
                  : "translate-x-0 w-full"
              }`}
            >
              <span
                onClick={() => {
                  setNext(0), setProfile(false);
                }}
                className="flex items-center gap-[10px] mb-[24px] cursor-pointer"
              >
                <ChevronLeftIcon />
                <p className="pt-[3px] select-none">Back</p>
              </span>
              <h2 className="mb-[24px] flex justify-start items-baseline gap-2 cursor-pointer">
                PROFILE <p>(Optional)</p>
              </h2>
              <div className={`w-full h-full flex flex-col gap-[24px]`}>
                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                  <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                    Occupation
                    {errors.occupation && (
                      <p className="text-[#fd8686]">
                        {errors.occupation.message}
                      </p>
                    )}
                  </label>
                  <div className="w-full relative">
                    <Controller
                      name="occupation"
                      defaultValue=""
                      control={control}
                      rules={{
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
                          placeholder="Enter your occupation"
                          className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                            errors.occupation
                              ? "outline-[#ffbbbb]"
                              : "outline-[#EEEEEE]"
                          }`}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                  <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                    Company
                    {errors.company && (
                      <p className="text-[#fd8686]">{errors.company.message}</p>
                    )}
                  </label>
                  <div className="w-full relative">
                    <Controller
                      name="company"
                      defaultValue=""
                      control={control}
                      rules={{
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
                          placeholder="Enter your company name"
                          className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                            errors.company
                              ? "outline-[#ffbbbb]"
                              : "outline-[#EEEEEE]"
                          }`}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end mt-auto">
                  <Btn
                    title={
                      addUserIsLoading ? (
                        <div className="flex justify-center items-center gap-4">
                          <p>Please wait</p>
                          <Ellipsis />
                        </div>
                      ) : (
                        "Submit"
                      )
                    }
                    disabled={addUserIsLoading && true}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
