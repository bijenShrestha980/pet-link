import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
// FEATURES
import { useAddtIconMutation } from "../../features/api/pageApi";
// ASSETS
import { getCompressedImage } from "../../utils/getCompressedImage";
import user from "../../assets/images/user.png";
// COMPONENTS
import Btn from "../Button/Btn";
import Ellipsis from "../../layout/Loader/Ellipsis";

const CreateLinkModal = (props) => {
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    addIcon,
    {
      error: addIconError,
      isError: addIconIsError,
      isLoading: addIconIsLoading,
      isSuccess: addIconIsSuccess,
    },
  ] = useAddtIconMutation();

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
    if (compressedImage) {
      setImageError(false);
      formData.append("image", compressedImage);
      formData.append("name", data.name);
      formData.append("type", "custom");

      addIcon(formData);
    } else {
      setImageError(true);
    }
  };

  useEffect(() => {
    if (!props.showOwnLink) {
      reset();
      setCompressedImage(null);
      setImage(null);
      setImageError(false);
    }
  }, [props.showOwnLink]);

  useEffect(() => {
    if (addIconIsError) {
      toast.error(addIconError.data.message);
    }
    if (addIconIsSuccess) {
      props.setShowOwnLink((current) => !current);
    }
  }, [addIconIsError, addIconIsSuccess]);

  return (
    <>
      <input
        type="checkbox"
        id="create-link-modal"
        className="modal-toggle"
        checked={props.showOwnLink}
        onClick={() => props.setShowOwnLink((current) => !current)}
        readOnly
      />
      <div className="modal">
        <div className="modal-box bg-white relative">
          <label
            htmlFor="create-link-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <p className="mt-1">✕</p>
          </label>
          <h3 className="text-lg font-bold">Upload your icon</h3>
          <form
            className="rounded-[8px] flex flex-col items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex flex-col md:flex-row items-center gap-[16px] mb-[32px]">
              <span className="w-[118px] h-[118px] bg-[#EEEEEE] rounded-full">
                <img
                  src={image ? image : user}
                  alt=""
                  className={`w-[118px] h-[118px] bg-[#EEEEEE] object-cover rounded-full ${
                    imageError && "border-2 border-[#ffbbbb]"
                  }`}
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
                  Icon must be PNG or JPG
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
            <div className={`w-full flex flex-col gap-[24px] mb-[24px]`}>
              <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                  Icon Name
                  {errors.name && (
                    <p className="text-[#fd8686]">{errors.name.message}</p>
                  )}
                </label>
                <div className="w-full relative">
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
                        type={"text"}
                        placeholder="Enter your icon name"
                        className={`bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] border-2 ${
                          errors.name
                            ? " border-[#ffbbbb]"
                            : "border-transparent"
                        }`}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div
              className={`w-full flex flex-col justify-end items-end gap-[24px]`}
            >
              <Btn
                title={
                  addIconIsLoading ? (
                    <div className="flex justify-center items-center gap-4">
                      <p>Please wait</p>
                      <Ellipsis />
                    </div>
                  ) : (
                    "Submit"
                  )
                }
                disabled={addIconIsLoading && true}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateLinkModal;
