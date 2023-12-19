import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { motion } from "framer-motion";

// FEATURES
import { appSelector } from "../../../../features/slice/appSlice";
import { useGetUserByIdQuery } from "../../../../features/api/userApi";
import {
  useGetPageIdQuery,
  useManagePageMutation,
} from "../../../../features/api/pageApi";
// ASSETS
import {
  ArrowDownIcon,
  DeleteIcon,
  SettingsIcon,
} from "../../../../utils/icons";
import { COUNTRIES } from "../../../../utils/countries";
// COMPONENTS
import Btn from "../../../../components/Button/Btn";
import Ellipsis from "../../../../layout/Loader/Ellipsis";
import PageSetupModal from "../../../../components/Modal/PageSetupModal";
import Loader from "../../../../layout/Loader/Loader";
import BioLinksModal from "../../../../components/Modal/BioLinksModal";
import PagePreviewCard from "../../../../components/Card/PagePreviewCard";
import { image } from "@uiw/react-md-editor";

const EditBio_link = () => {
  const { token } = useSelector(appSelector);
  const user_id = token.affix_userId;
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageId, setPageId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [bioLinksModal, setBioLinksModal] = useState(false);
  const [addToContactChange, setAddToContactChange] = useState(true);

  const [itemActiveChange, setItemActiveChange] = useState({});

  const [iconList, setIconList] = useState([]);
  const [addToContact, setAddToContact] = useState([]);

  const {
    data: pageByIdData,
    isLoading: pageByIdIsLoading,
    isSuccess: pageByIdIsSuccess,
  } = useGetPageIdQuery({ id });

  const {
    data: userByIdData,
    isLoading: userByIdIsLoading,
    isSuccess: userByIdIsSuccess,
  } = useGetUserByIdQuery({ id: user_id });

  useEffect(() => {
    if (pageByIdIsSuccess) {
      setPageId(pageByIdData.data.page?.id);

      pageByIdData.data.page?.map?.content?.biolink?.length > 0 &&
        (setIconList(
          pageByIdData.data.page?.map?.content?.biolink.filter(
            (el) => el.name !== "addToContact"
          )
        ),
        setAddToContact(
          pageByIdData.data.page?.map?.content?.biolink.filter(
            (el) => el.name === "addToContact"
          )
        ));
    }
  }, [pageByIdIsSuccess]);

  const [nameChange, setNameChange] = useState(
    pageByIdData ? pageByIdData.data.page.map?.content?.name : ""
  );
  const [introChange, setIntroChange] = useState(
    pageByIdData ? pageByIdData.data.page.map?.content?.intro : ""
  );

  if (
    pageByIdIsLoading ||
    userByIdIsLoading ||
    !pageByIdIsSuccess ||
    !userByIdIsSuccess
  ) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <div className="mb-[20px] mr-0 lg:mr-0">
      {/* Header */}
      <div className="flex gap-[10px] items-center mb-[24px]">
        <h2>Pet Links</h2>
        <span onClick={() => setModalShow(true)}>
          <SettingsIcon className="mb-1 custom-transition cursor-pointer hover:scale-105 hover:rotate-45 active:scale-90" />
        </span>
      </div>
      <motion.div
        className="lg:grid xl:grid-cols-3 gap-[39px]"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="lg:col-span-2 mb-[24px] lg:mb-0"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Add link */}
          <Btn
            title="Add Link"
            onClick={() => setBioLinksModal(true)}
            className="sm:w-full mb-[16px]"
          />
          {/* Form */}
          <Form
            setIconList={setIconList}
            iconList={iconList}
            addToContact={addToContact}
            pageId={pageId}
            navigate={navigate}
            userData={userByIdData.data}
            pageData={pageByIdData.data}
            setNameChange={setNameChange}
            setIntroChange={setIntroChange}
            setAddToContactChange={setAddToContactChange}
            setItemActiveChange={setItemActiveChange}
            itemActiveChange={itemActiveChange}
          />
        </motion.div>
        <PagePreviewCard
          page="bio-link"
          listData={iconList}
          nameChange={nameChange}
          introChange={introChange}
          addToContactChange={addToContactChange}
          image={userByIdData.data.personal_information[0]?.image}
          itemActiveChange={itemActiveChange}
        />
        {/* Preview */}
      </motion.div>
      {/* Modal */}
      <PageSetupModal
        user_id={user_id}
        type={"bio-link"}
        setPageId={setPageId}
        page_id={pageByIdData.data.page?.id}
        setModalShow={setModalShow}
        modalShow={modalShow}
        edit={true}
        pageData={pageByIdData.data}
      />
      {/* Bio link Modal */}
      <BioLinksModal
        bioLinksModal={bioLinksModal}
        setBioLinksModal={setBioLinksModal}
        pageData={pageByIdData.data}
        setIconList={setIconList}
        iconList={iconList}
      />
    </div>
  );
};

// Bio Link Create Form
const Form = (props) => {
  const [landline, setLandline] = useState(null);
  const [mobile, setMobile] = useState(null);

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    managePage,
    {
      error: managePageError,
      isError: manageIsError,
      isLoading: managePageIsLoading,
      isSuccess: managePageIsSuccess,
    },
  ] = useManagePageMutation();

  const handleItemActiveChange = ({ e, id }) => {
    props.setItemActiveChange({
      ...props.itemActiveChange,
      [id]: { name: e.target.checked },
    });
  };

  const onSubmit = (data) => {
    let listData = [];
    let bioDataToSend = [];
    let value = Object.values(data);
    let key = Object.keys(data);

    // let card_id = props.pageData.page?.map?.content?.biolink.find(
    //   (el) => el.name === "addToContact" && el
    // );

    for (let i = 0; i < value.length; i++) {
      listData.push({ [key[i]]: value[i] });
    }
    props.iconList.map((item) => {
      let on_display = listData.find(
        (el) => Object.keys(el)[0] === `${"on_display" + "=" + item.id}` && el
      );
      let alias = listData.find(
        (el) => Object.keys(el)[0] === `${"alias" + "=" + item.id}` && el
      );
      let prefix = listData.find(
        (el) => Object.keys(el)[0] === `${"prefix" + "=" + item.id}` && el
      );

      // console.log(Object.values(prefix)[0].value.value);

      // set bio link data
      bioDataToSend.push({
        name: item.name,
        icon_id: item.icon_id,
        ...(typeof item.id === "number" && {
          id: item.id,
        }),
        // ...(item.image ? image : item.image),
        url:
          item.name.toLowerCase() === "phone"
            ? "tel:" +
              "" +
              Object.values(prefix)[0].value +
              "-" +
              Object.values(alias)[0]
            : item.name.toLowerCase() === "viber"
              ? "viber://add?number=" +
                "" +
                Object.values(prefix)[0].value.split("+")[1] +
                "" +
                Object.values(alias)[0]
              : item.name.toLowerCase() === "whatsapp"
                ? "https://wa.me/" +
                  "" +
                  Object.values(prefix)[0].value.split("+")[1] +
                  "" +
                  Object.values(alias)[0]
                : item.name.toLowerCase() === "facebook"
                  ? "https://www.facebook.com/" + "" + Object.values(alias)[0]
                  : item.name.toLowerCase() === "messenger"
                    ? "https://m.me/" + "" + Object.values(alias)[0]
                    : item.name.toLowerCase() === "instagram"
                      ? "instagram://user?username=" +
                        "" +
                        Object.values(alias)[0]
                      : item.name.toLowerCase() === "twitter"
                        ? "Example : www.twitter.com/" +
                          "" +
                          Object.values(alias)[0]
                        : item.name.toLowerCase() === "youtube"
                          ? "https://www.youtube.com/watch?v=" +
                            "" +
                            Object.values(alias)[0]
                          : item.name.toLowerCase() === "tiktok"
                            ? "https://www.tiktok.com/@" +
                              "" +
                              Object.values(alias)[0]
                            : item.name.toLowerCase() === "wechat"
                              ? "weixin://dl/chat?" +
                                "" +
                                Object.values(prefix)[0].value.split("+")[1] +
                                "" +
                                Object.values(alias)[0]
                              : item.name.toLowerCase() === "zoom"
                                ? "https://" + "" + Object.values(alias)[0]
                                : item.name.toLowerCase() === "vimeo"
                                  ? "https://player.vimeo.com/video/" +
                                    "" +
                                    Object.values(alias)[0]
                                  : item.name.toLowerCase() === "behance"
                                    ? "https://www.behance.net/" +
                                      "" +
                                      Object.values(alias)[0]
                                    : item.name.toLowerCase() === "flickr"
                                      ? "https://www.flickr.com/photos/" +
                                        "" +
                                        Object.values(alias)[0]
                                      : item.name.toLowerCase() === "linkedin"
                                        ? "https://www.linkedin.com/in/" +
                                          "" +
                                          Object.values(alias)[0]
                                        : item.name.toLowerCase() ===
                                            "pinterest"
                                          ? "https://www.pinterest.com/" +
                                            "" +
                                            Object.values(alias)[0]
                                          : item.name.toLowerCase() === "skype"
                                            ? "https://skype:" +
                                              "" +
                                              Object.values(alias)[0]
                                            : item.name.toLowerCase() ===
                                                "snap_chat"
                                              ? "https://www.snapchat.com/add/" +
                                                "" +
                                                Object.values(prefix)[0].value +
                                                "-" +
                                                Object.values(alias)[0]
                                              : item.name.toLowerCase() ===
                                                  "telegram"
                                                ? "https://t.me/" +
                                                  "" +
                                                  Object.values(alias)[0]
                                                : item.name.toLowerCase() ===
                                                    "gmail"
                                                  ? "" +
                                                    "" +
                                                    Object.values(alias)[0]
                                                  : item.name.toLowerCase() ===
                                                      "playstore"
                                                    ? "https://play.google.com/store/apps/details?id===" +
                                                      "" +
                                                      Object.values(alias)[0]
                                                    : item.name.toLowerCase() ===
                                                        "tripadvisor"
                                                      ? "https://www.tripadvisor.com/" +
                                                        "" +
                                                        Object.values(alias)[0]
                                                      : item.name.toLowerCase() ===
                                                          "appstore"
                                                        ? "https://apps.apple.com/us/app/" +
                                                          "" +
                                                          Object.values(
                                                            alias
                                                          )[0]
                                                        : item.name.toLowerCase() ===
                                                            "microsoft"
                                                          ? `https://www.microsoft.com/store/productId/` +
                                                            "" +
                                                            Object.values(
                                                              alias
                                                            )[0]
                                                          : "" +
                                                            "" +
                                                            Object.values(
                                                              alias
                                                            )[0],
        on_display: Object.values(on_display)[0] ? "yes" : "no",
        alias: Object.values(alias)[0],
      });
    });
    // set card data
    let cardDataToSend = {
      full_name: data.name,
      email: data.email,
      mobile: data.mobilePrefix.value
        ? data.mobilePrefix.value + "-" + data.mobile
        : props.userData?.phone?.split("-")[0] + "-" + data.mobile,
      phone: data.landlinePrefix.value
        ? data.landlinePrefix.value + "-" + data.phone
        : props.userData?.personal_information[0]?.home_phone?.split("-")[0] +
          "-" +
          data.phone,
      location: data.location,
      website: data.website,
      on_display: data.on_display ? "yes" : "no",
      ...(props.pageData?.page?.map?.content.id && {
        id: props.pageData?.page?.map?.content.id,
      }),
      ...(props.addToContact.length > 0 && { id: props.addToContact[0].id }),
      ...(props.addToContact.length > 0 && {
        icon_id: props.addToContact[0].icon_id,
      }),
      name: "addToContact",
      company: data.company,
      company_address: data.company_address,
      designation: data.designation,
    };
    console.log({
      bio: bioDataToSend,
      card: cardDataToSend,
      name: data.name,
      intro: data.intro,
      type: "bio-link",
      page_id: props.pageId,
      ...(props.pageData?.page?.map?.content?.id && {
        id: props.pageData?.page?.map?.content?.id,
      }),
    });

    // send data
    managePage({
      bio: bioDataToSend,
      card: cardDataToSend,
      name: data.name,
      intro: data.intro,
      type: "bio-link",
      page_id: props.pageId,
      ...(props.pageData?.page?.map?.content?.id && {
        id: props.pageData?.page?.map?.content?.id,
      }),
    });
  };

  // set landline value
  useEffect(() => {
    if (
      props.userData?.phone &&
      props.userData?.phone?.split("-")?.length > 1
    ) {
      COUNTRIES.map(
        (item) =>
          item.prefix === props.userData?.phone?.split("-")[0] &&
          setMobile({
            label: item.name + " " + item.prefix,
            value: item.prefix,
          })
      );
    } else {
      setMobile({
        label: +977,
        value: +977,
      });
    }

    if (
      props.userData?.personal_information[0]?.home_phone &&
      props.userData?.personal_information[0]?.home_phone?.split("-")?.length >
        1
    ) {
      COUNTRIES.map(
        (item) =>
          item.prefix ===
            props.userData?.personal_information[0]?.home_phone?.split(
              "-"
            )[0] &&
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
    if (watch("name")) {
      props.setNameChange(watch("name"));
    }
    if (watch("intro")) {
      props.setIntroChange(watch("intro"));
    }
    if (String(watch("on_display")) || props.addToContact[0]?.on_display) {
      String(watch("on_display"))
        ? props.setAddToContactChange(watch("on_display"))
        : props.addToContact[0]?.on_display === "yes"
          ? props.setAddToContactChange(true)
          : props.setAddToContactChange(false);
    }
  }, [
    watch("name"),
    watch("intro"),
    watch("on_display"),
    props.addToContact[0]?.on_display,
  ]);

  useEffect(() => {
    if (manageIsError) {
      toast.error(managePageError.data.message);
    }
    if (managePageIsSuccess) {
      props.navigate(`/dashboard/my_link`);
    }
  }, [manageIsError, managePageIsSuccess]);
  console.log(props?.iconList);
  if (!mobile || !landline) {
    <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <form
      className="lg:col-span-2 mb-[24px] lg:mb-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[16px] mb-[16px]">
        {/* Biolink */}
        {props.iconList.length > 0 &&
          props?.iconList
            ?.map((item, i) => (
              <motion.div
                key={i}
                className="w-full flex flex-col justify-start items-start gap-[16px] bg-white p-[24px] rounded-[16px]"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 100 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Head */}
                <div className="w-full flex justify-between">
                  {/* Icon */}
                  <div>
                    <span className="bg-brand_primaryFade w-[46px] h-[46px] rounded-[4px] flex justify-center items-center">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/images/${
                          item?.icon
                        }`}
                        alt={item?.icon}
                        className="w-[26px] h-[26px] custom-transition group-hover:scale-105 rounded-[4px] object-cover"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-[10px]">
                    <label className="label cursor-pointer">
                      <input
                        defaultChecked={
                          item.on_display
                            ? item.on_display === "yes"
                              ? true
                              : false
                            : ""
                        }
                        {...register(`on_display=${item.id}`, {
                          onChange: (e) =>
                            handleItemActiveChange({
                              e,
                              id: item.id,
                            }),
                        })}
                        type="checkbox"
                        className="toggle toggle-warning toggle-sm"
                      />
                    </label>
                    {/* <DeleteIcon /> */}
                    <label
                      className="cursor-pointer custom-transition hover:scale-105"
                      onClick={() =>
                        props.setIconList((currentItem) =>
                          currentItem.filter((el) => el.id !== item.id)
                        )
                      }
                    >
                      <DeleteIcon />
                    </label>
                  </div>
                </div>
                {/* Title */}
                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                  <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                    Title
                    {Object.entries(errors).map(
                      (value, i) =>
                        value[0] === `name=${item.id}` && (
                          <p className="text-[#fd8686]" key={i}>
                            {value[1].message}
                          </p>
                        )
                    )}
                  </label>
                  <div className="w-full relative">
                    <Controller
                      name={`name=${item.id}`}
                      id={item.id}
                      defaultValue={item.name ? item.name : ""}
                      control={control}
                      rules={{
                        required: "This field is required",
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
                          // defaultValue={item.name ? item.name : ""}
                          id={item.id}
                          type={"text"}
                          placeholder="Enter your link title"
                          className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] capitalize`}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                {/* Link */}
                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                  <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
                    {item.name.toLowerCase() === "whatsapp" ||
                    item.name.toLowerCase() === "wechat" ||
                    item.name.toLowerCase() === "phone" ||
                    item.name.toLowerCase() === "viber" ||
                    item.name.toLowerCase() === "snap_chat" ? (
                      "Number"
                    ) : item.name.toLowerCase() === "facebook" ||
                      item.name.toLowerCase() === "messenger" ||
                      item.name.toLowerCase() === "instagram" ||
                      item.name.toLowerCase() === "twitter" ||
                      item.name.toLowerCase() === "tiktok" ? (
                      "Username"
                    ) : item.name.toLowerCase() === "youtube" ||
                      item.name.toLowerCase() === "vimeo" ||
                      item.name.toLowerCase() === "behance" ||
                      item.name.toLowerCase() === "flickr" ||
                      item.name.toLowerCase() === "linkedin" ||
                      item.name.toLowerCase() === "pinterest" ||
                      item.name.toLowerCase() === "skype" ||
                      item.name.toLowerCase() === "telegram" ||
                      item.name.toLowerCase() === "tripadvisor" ? (
                      "ID"
                    ) : item.name.toLowerCase() === "gmail" ? (
                      "Email"
                    ) : item.name.toLowerCase() === "zoom" ? (
                      "URL"
                    ) : (
                      <div>
                        <span>Link</span>
                        <span>Image</span>
                      </div>
                    )}

                    {Object.entries(errors).map(
                      (value) =>
                        value[0] === `alias=${item.id}` && (
                          <p className="text-[#fd8686]" key={i}>
                            {value[1].message}
                          </p>
                        )
                    )}
                  </label>
                  <div className="w-full flex flex-col md:flex-row justify-between">
                    {(item.name.toLowerCase() === "whatsapp" ||
                      item.name.toLowerCase() === "wechat" ||
                      item.name.toLowerCase() === "phone" ||
                      item.name.toLowerCase() === "viber" ||
                      item.name.toLowerCase() === "snap_chat" ||
                      item.name.toLowerCase() === "facebook" ||
                      item.name.toLowerCase() === "messenger" ||
                      item.name.toLowerCase() === "instagram" ||
                      item.name.toLowerCase() === "twitter" ||
                      item.name.toLowerCase() === "tiktok" ||
                      item.name.toLowerCase() === "youtube" ||
                      item.name.toLowerCase() === "vimeo" ||
                      item.name.toLowerCase() === "behance" ||
                      item.name.toLowerCase() === "flickr" ||
                      item.name.toLowerCase() === "linkedin" ||
                      item.name.toLowerCase() === "pinterest" ||
                      item.name.toLowerCase() === "skype" ||
                      item.name.toLowerCase() === "telegram" ||
                      item.name.toLowerCase() === "tripadvisor") && (
                      <p
                        className={`text-[#262626] text-[14px] font-[400] leading-[21px] rounded-l-md py-[14px] pt-[18px] outline-none w-full overflow-x-auto `}
                      >
                        {item.url}
                      </p>
                    )}
                    <div className="w-full relative">
                      {(item.name.toLowerCase() === "whatsapp" ||
                        item.name.toLowerCase() === "wechat" ||
                        item.name.toLowerCase() === "phone" ||
                        item.name.toLowerCase() === "viber" ||
                        item.name.toLowerCase() === "snap_chat") && (
                        <>
                          <span className="absolute top-[6px] left-[6px] w-[90px] h-[34px] bg-[#BCBCBC] p-[8px] text-white rounded-[4px] flex justify-between items-center gap-[13px]">
                            <p className="pt-[3px]">
                              {watch(`prefix=${item.id}`)
                                ? watch(`prefix=${item.id}`)?.value
                                : item.name.toLowerCase() === "wechat" &&
                                    typeof item.id !== "string"
                                  ? `+${
                                      item.url
                                        ?.split("?")[1]
                                        ?.split(item.alias)[0]
                                    }`
                                  : item.name.toLowerCase() === "viber" &&
                                      typeof item.id !== "string"
                                    ? `+${
                                        item.url
                                          ?.split("=")[1]
                                          ?.split(item.alias)[0]
                                      }`
                                    : item.name.toLowerCase() === "phone" &&
                                        typeof item.id !== "string"
                                      ? `+${
                                          item.url?.split("+")[1]?.split("-")[0]
                                        }`
                                      : item.name.toLowerCase() ===
                                            "whatsapp" &&
                                          typeof item.id !== "string"
                                        ? `+${
                                            item.url
                                              ?.split("/")[3]
                                              ?.split(item.alias)[0]
                                          }`
                                        : item.name.toLowerCase() ===
                                              "snap_chat" &&
                                            typeof item.id !== "string"
                                          ? `+${
                                              item.url
                                                ?.split("/")[1]
                                                ?.split(item.alias)[1]
                                            }`
                                          : "+977"}
                            </p>
                            <ArrowDownIcon className="h-[20px]" />
                          </span>
                          <Controller
                            name={`prefix=${item.id}`}
                            defaultValue={{
                              label:
                                item.name.toLowerCase() === "wechat" &&
                                typeof item.id !== "string"
                                  ? `+${
                                      item.url
                                        ?.split("?")[1]
                                        ?.split(item.alias)[0]
                                    }`
                                  : item.name.toLowerCase() === "viber" &&
                                      typeof item.id !== "string"
                                    ? `+${
                                        item.url
                                          ?.split("=")[1]
                                          ?.split(item.alias)[0]
                                      }`
                                    : item.name.toLowerCase() === "phone" &&
                                        typeof item.id !== "string"
                                      ? `+${
                                          item.url?.split("+")[1]?.split("-")[0]
                                        }`
                                      : item.name.toLowerCase() === "whatsapp"
                                        ? `+${
                                            item.url
                                              ?.split("/")[3]
                                              ?.split(item.alias)[0]
                                          }`
                                        : item.name.toLowerCase() ===
                                              "snap_chat" &&
                                            typeof item.id !== "string"
                                          ? `+${
                                              item.url
                                                ?.split("/")[1]
                                                ?.split(item.alias)[0]
                                            }`
                                          : "+977",
                              value:
                                item.name.toLowerCase() === "wechat" &&
                                typeof item.id !== "string"
                                  ? `+${
                                      item.url
                                        ?.split("?")[1]
                                        ?.split(item.alias)[0]
                                    }`
                                  : item.name.toLowerCase() === "viber" &&
                                      typeof item.id !== "string"
                                    ? `+${
                                        item.url
                                          ?.split("=")[1]
                                          ?.split(item.alias)[0]
                                      }`
                                    : item.name.toLowerCase() === "phone" &&
                                        typeof item.id !== "string"
                                      ? `+${
                                          item.url?.split("+")[1]?.split("-")[0]
                                        }`
                                      : item.name.toLowerCase() ===
                                            "whatsapp" &&
                                          typeof item.id !== "string"
                                        ? `+${
                                            item.url
                                              ?.split("/")[3]
                                              ?.split(item.alias)[0]
                                          }`
                                        : item.name.toLowerCase() ===
                                              "snap_chat" &&
                                            typeof item.id !== "string"
                                          ? `+${
                                              item.url
                                                ?.split("/")[1]
                                                ?.split(item.alias)[0]
                                            }`
                                          : "+977",
                            }}
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <ReactSelect
                                id={`prefix=${item.id}`}
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
                                    left: "6px",
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
                                    color: state.isSelected
                                      ? "#fff"
                                      : "#3f4247",
                                  }),
                                }}
                                {...field}
                              />
                            )}
                          />
                        </>
                      )}
                      {item.name.toLowerCase() === "whatsapp" ||
                      item.name.toLowerCase() === "wechat" ||
                      item.name.toLowerCase() === "phone" ||
                      item.name.toLowerCase() === "viber" ||
                      item.name.toLowerCase() === "snap_chat" ||
                      item.name.toLowerCase() === "facebook" ||
                      item.name.toLowerCase() === "messenger" ||
                      item.name.toLowerCase() === "instagram" ||
                      item.name.toLowerCase() === "twitter" ||
                      item.name.toLowerCase() === "tiktok" ||
                      item.name.toLowerCase() === "youtube" ||
                      item.name.toLowerCase() === "vimeo" ||
                      item.name.toLowerCase() === "behance" ||
                      item.name.toLowerCase() === "flickr" ||
                      item.name.toLowerCase() === "linkedin" ||
                      item.name.toLowerCase() === "pinterest" ||
                      item.name.toLowerCase() === "skype" ||
                      item.name.toLowerCase() === "telegram" ||
                      item.name.toLowerCase() === "tripadvisor" ? (
                        <Controller
                          name={`alias=${item.id}`}
                          defaultValue={
                            item.alias
                              ? item.alias.split("-").length > 1
                                ? item.alias.split("-")[1]
                                : item.alias
                              : ""
                          }
                          // defaultValue={
                          //   item.alias
                          //     ? item.name.toLowerCase() === "whatsapp" ||
                          //       item.name.toLowerCase() === "wechat" ||
                          //       item.name.toLowerCase() === "phone" ||
                          //       item.name.toLowerCase() === "viber" ||
                          //       item.name.toLowerCase() === "snapchat"
                          //       ? item.alias?.split("-").length > 1
                          //         ? item.alias?.split("-")[1]
                          //         : item.alias
                          //       : item.alias
                          //     : ""
                          // }
                          control={control}
                          rules={{
                            required: "This field is required",
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
                              onWheel={(e) => e.target.blur()}
                              type={
                                item.name.toLowerCase() === "whatsapp" ||
                                item.name.toLowerCase() === "wechat" ||
                                item.name.toLowerCase() === "phone" ||
                                item.name.toLowerCase() === "viber" ||
                                item.name.toLowerCase() === "snap_chat" ||
                                item.name.toLowerCase() === "facebook" ||
                                item.name.toLowerCase() === "messenger" ||
                                item.name.toLowerCase() === "instagram" ||
                                item.name.toLowerCase() === "twitter" ||
                                item.name.toLowerCase() === "tiktok"
                                  ? "text"
                                  : item.name.toLowerCase() === "youtube" ||
                                      item.name.toLowerCase() === "vimeo" ||
                                      item.name.toLowerCase() === "behance" ||
                                      item.name.toLowerCase() === "flickr" ||
                                      item.name.toLowerCase() === "linkedin" ||
                                      item.name.toLowerCase() === "pinterest" ||
                                      item.name.toLowerCase() === "skype" ||
                                      item.name.toLowerCase() === "telegram" ||
                                      item.name.toLowerCase() === "tripadvisor"
                                    ? "text"
                                    : item.name.toLowerCase() === "gmail"
                                      ? "email"
                                      : item.name.toLowerCase() === "zoom"
                                        ? "url"
                                        : "url"
                              }
                              placeholder={
                                item.name.toLowerCase() === "whatsapp" ||
                                item.name.toLowerCase() === "wechat" ||
                                item.name.toLowerCase() === "phone" ||
                                item.name.toLowerCase() === "viber" ||
                                item.name.toLowerCase() === "snap_chat"
                                  ? "Enter your number"
                                  : item.name.toLowerCase() === "facebook" ||
                                      item.name.toLowerCase() === "messenger" ||
                                      item.name.toLowerCase() === "instagram" ||
                                      item.name.toLowerCase() === "twitter" ||
                                      item.name.toLowerCase() === "tiktok"
                                    ? "Enter your username"
                                    : item.name.toLowerCase() === "youtube" ||
                                        item.name.toLowerCase() === "vimeo" ||
                                        item.name.toLowerCase() === "behance" ||
                                        item.name.toLowerCase() === "flickr" ||
                                        item.name.toLowerCase() ===
                                          "linkedin" ||
                                        item.name.toLowerCase() ===
                                          "pinterest" ||
                                        item.name.toLowerCase() === "skype" ||
                                        item.name.toLowerCase() ===
                                          "telegram" ||
                                        item.name.toLowerCase() ===
                                          "tripadvisor"
                                      ? "Enter your ID"
                                      : item.name.toLowerCase() === "gmail"
                                        ? "Enter your email"
                                        : item.name.toLowerCase() === "zoom"
                                          ? "Enter your zoom link"
                                          : "Enter your link"
                              }
                              className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] h-[46px] rounded-md p-[14px] pt-[18px] outline-none w-full grow ${
                                item.name.toLowerCase() === "whatsapp" ||
                                item.name.toLowerCase() === "wechat" ||
                                item.name.toLowerCase() === "phone" ||
                                item.name.toLowerCase() === "viber" ||
                                item.name.toLowerCase() === "snap_chat"
                                  ? "pl-[105px]"
                                  : ""
                              }`}
                              {...field}
                            />
                          )}
                        />
                      ) : (
                        <div className="flex flex-col gap-4">
                          <Controller
                            name={`alias=${item.id}`}
                            defaultValue={
                              item.alias
                                ? item.alias.split("-").length > 1
                                  ? item.alias.split("-")[1]
                                  : item.alias
                                : ""
                            }
                            control={control}
                            rules={{
                              required: "This field is required",
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
                                onWheel={(e) => e.target.blur()}
                                type="url"
                                placeholder="Enter your link"
                                className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] h-[46px] rounded-md p-[14px] pt-[18px] outline-none w-full grow`}
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="wf"
                            // name={`alias=${item.id}`}
                            // defaultValue={
                            //   item.alias
                            //     ? item.alias.split("-").length > 1
                            //       ? item.alias.split("-")[1]
                            //       : item.alias
                            //     : ""
                            // }
                            control={control}
                            rules={{
                              required: "This field is required",
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
                                // onWheel={(e) => e.target.blur()}
                                type="file"
                                // placeholder="Enter your link"
                                accept="image/png, image/jpeg"
                                className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] h-[46px] rounded-md p-[14px] pt-[10px] outline-none w-full grow`}
                                // {...field}
                              />
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
            .reverse()}
      </div>
      {/* Header */}
      <motion.div
        className="w-full flex flex-col justify-start items-start bg-white gap-[16px] p-[24px] rounded-[16px] mb-[16px]"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Header</h3>
        <div className="w-full flex flex-col justify-between items-end gap-[16px]">
          {/* Name */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Name
              {errors.name && (
                <p className="text-[#fd8686]">{errors.name.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name={`name`}
                defaultValue={
                  props.pageData ? props.pageData.page.map?.content?.name : ""
                }
                control={control}
                rules={{
                  required: "This field is required",
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
                    placeholder="Enter your name"
                    className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* Brief */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Intro
              {errors.intro && (
                <p className="text-[#fd8686]">{errors.intro.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name={`intro`}
                defaultValue={
                  props.pageData ? props.pageData.page.map?.content?.intro : ""
                }
                control={control}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Min character length required",
                  },
                  maxLength: {
                    value: 999,
                    message: "Max character length exceded",
                  },
                }}
                render={({ field }) => (
                  <textarea
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                    placeholder="Write your Introduction"
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
      </motion.div>
      {/* Add to contact */}
      <div className="w-full flex flex-col justify-start items-start gap-[16px] bg-white p-[24px] rounded-[16px] mb-[16px]">
        {/* Head */}
        <div className="w-full flex justify-between">
          {/* Icon */}
          <h3>Add To Contact</h3>
          <div className="flex flex-col justify-between items-end">
            <label className="label cursor-pointer py-0">
              <Controller
                name={`on_display`}
                defaultValue={
                  props.addToContact[0]?.on_display
                    ? props.addToContact[0]?.on_display === "yes"
                      ? true
                      : false
                    : true
                }
                control={control}
                render={({ field }) => (
                  <input
                    defaultChecked={
                      props.addToContact[0]?.on_display
                        ? props.addToContact[0]?.on_display === "yes"
                          ? true
                          : false
                        : true
                    }
                    id="addToContact"
                    type="checkbox"
                    className="toggle toggle-warning toggle-sm"
                    {...field}
                  />
                )}
              />
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col justify-between items-end gap-[16px]">
          {/* email */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Email
              {errors.email && (
                <p className="text-[#fd8686]">{errors.email.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name={`email`}
                defaultValue={props.userData ? props.userData?.email : ""}
                control={control}
                rules={{
                  required: "This field is required",
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
                    type={"email"}
                    disabled
                    placeholder="Enter your email"
                    className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.name ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* phone */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Phone Number
              {errors.mobile && (
                <p className="text-[#fd8686]">{errors.mobile.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <span className="absolute top-[6px] left-[6px] w-[90px] h-[34px] bg-[#BCBCBC] p-[8px] text-white rounded-[4px] flex justify-between items-center gap-[13px]">
                <p className="pt-[3px]">
                  {watch("mobilePrefix")
                    ? watch("mobilePrefix")?.value
                    : mobile?.value}
                </p>
                <ArrowDownIcon className="h-[20px]" />
              </span>
              <Controller
                name="mobilePrefix"
                control={control}
                defaultValue={mobile ? mobile : ""}
                // rules={{
                //   required: true,
                // }}
                render={({ field }) => (
                  <ReactSelect
                    id={"mobilePrefix"}
                    defaultValue={mobile ? mobile : ""}
                    options={COUNTRIES.map((item) => ({
                      label: item.name + " " + item.prefix,
                      value: item.prefix,
                    }))}
                    isDisabled
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
                name="mobile"
                defaultValue={
                  props.userData?.phone?.split("-").length > 1
                    ? props.userData?.phone?.split("-")[1]
                    : props.userData?.phone
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
                    disabled
                    type="number"
                    id="mobile"
                    placeholder="Enter your mobile number"
                    // defaultValue={props.userData?.phone?.split("-")[1]}
                    onWheel={(e) => e.target.blur()}
                    className={`pl-[110px] bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.mobile ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* landline */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Landline Number
              {errors.phone && (
                <p className="text-[#fd8686]">{errors.phone.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <span className="absolute top-[6px] left-[6px] w-[90px] h-[34px] bg-[#BCBCBC] p-[8px] text-white rounded-[4px] flex justify-between items-center gap-[13px]">
                <p className="pt-[3px]">
                  {watch("landlinePrefix")
                    ? watch("landlinePrefix")?.value
                    : landline?.value}
                </p>
                <ArrowDownIcon className="h-[20px]" />
              </span>
              <Controller
                name="landlinePrefix"
                control={control}
                defaultValue={landline ? landline : ""}
                // rules={{
                //   required: true,
                // }}
                render={({ field }) => (
                  <ReactSelect
                    id={"landlinePrefix"}
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
                name="phone"
                defaultValue={
                  props.userData?.personal_information[0]?.home_phone?.split(
                    "-"
                  ).length > 1
                    ? props.userData?.personal_information[0]?.home_phone?.split(
                        "-"
                      )[1]
                    : props.userData?.personal_information[0]?.home_phone
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
                    id="phone"
                    placeholder="Enter your landline number"
                    onWheel={(e) => e.target.blur()}
                    className={`pl-[110px] bg-[#EEEEEE]  text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.phone ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* address */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Address
              {errors.location && (
                <p className="text-[#fd8686]">{errors.location.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name={`location`}
                defaultValue={props.userData?.personal_information[0]?.address}
                control={control}
                rules={{
                  required: "This field is required",
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
                    className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.location
                        ? "outline-[#ffbbbb]"
                        : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* website */}
          <div className="w-full flex flex-col justify-start items-start gap-[4px]">
            <label className="font-[700] text-[14px] leading-[20px] select-none flex items-center gap-4">
              Website
              {errors.website && (
                <p className="text-[#fd8686]">{errors.website.message}</p>
              )}
            </label>
            <div className="w-full relative">
              <Controller
                name={`website`}
                defaultValue={props.userData?.personal_information[0]?.website}
                control={control}
                rules={{
                  required: "This field is required",
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
                    placeholder="Enter your website"
                    className={`bg-[#EEEEEE] text-[#262626] text-[14px] font-[400] leading-[21px] w-full h-[46px] rounded-md p-[14px] pt-[18px] ${
                      errors.website ? "outline-[#ffbbbb]" : "outline-[#EEEEEE]"
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Btn
          title={
            managePageIsLoading ? (
              <div className="flex justify-center items-center gap-4">
                <p>Please wait</p>
                <Ellipsis />
              </div>
            ) : (
              "Update"
            )
          }
          disabled={managePageIsLoading && true}
        />
      </div>
    </form>
  );
};

export default EditBio_link;
