import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookCard,
  ImageCard,
  Menus,
  Video,
  Website,
  Iframe,
  LinkPreviewCard,
} from "./LinkCard";
// ASSETS
import logo from "../../assets/images/afixlink.png";
import Logo from "../../assets/images/login-affixlink-logo2.png";
import { CopyIcon, LocationIcon, QRIcon } from "../../utils/icons";
import Btn from "../Button/Btn";
import Loader from "../../layout/Loader/Loader";

const PreviewCard = (props) => {
  const location = useLocation();
  const pageURL = location.pathname.split("/").pop();
  const [copy, setCopy] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL_ADMIN}/${props.masterLink}`
    );
    setCopy(true);
  };

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `affix.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex w-full h-full flex-col gap-[24px] rounded-[8px] bg-white p-[24px] lg:col-span-1 lg:rounded-l-[8px]">
        <span className="overflow-x-auto rounded-[8px] bg-brand_secondary py-[5px] px-[15px] text-center md:py-[15px] md:px-[39px]">
          {import.meta.env.VITE_BASE_URL_ADMIN}/{props.masterLink}
        </span>
        <div className="flex flex-col items-center justify-between gap-[8px] sm:flex-row">
          <button
            onClick={copyText}
            className="custom-transition flex w-full items-center justify-center gap-[12px] rounded-[8px] bg-brand_primary p-[12px] hover:scale-105"
          >
            <CopyIcon color="#ffffff" />
            <p className="mt-1 text-white">{copy ? `Copied` : `Copy Link`}</p>
          </button>
          <label
            htmlFor="my-modal-3"
            className="custom-transition dropdown flex w-full cursor-pointer items-center justify-center gap-[12px] rounded-[8px] border border-brand_primary p-[12px] hover:scale-105"
          >
            <QRIcon color="#752444" />
            <p className="mt-1 select-none text-brand_primary">Generate QR</p>
          </label>
        </div>
        <h4 className="mt-[16px] text-center">Preview</h4>
        <span className="scrollBarWidthNone relative mx-auto h-[650px] min-w-full max-w-[320px] overflow-hidden overflow-y-scroll rounded-[36px] border-[8px] border-[#262626] bg-white sm:min-w-[320px]">
          <>
            {/* ActiveCardPreviewHere */}
            <div className="h-full">
              {props.loading || props.pageIsLoading || props.pageIsFetching ? (
                <div className="absolute flex h-full w-full justify-center rounded-[8px] bg-brand_primaryFade opacity-50">
                  <Loader />
                </div>
              ) : (
                <>
                  {props?.activePage[0]?.type === "profile" ||
                  props?.pageType === "profile" ? (
                    <Previewprofile
                      pageData={props.activePage[0]}
                      userData={props.personalData}
                    />
                  ) : props?.activePage[0]?.type === "bio-link" ||
                    props?.pageType === "bio-link" ? (
                    <Biolink
                      pageData={props.activePage[0]}
                      userData={props.personalData}
                    />
                  ) : props?.activePage[0]?.type === "menus" ||
                    props?.pageType === "menus" ? (
                    <Menus menu={props.activePage[0]} preview={pageURL} />
                  ) : props?.activePage[0]?.type === "image" ||
                    props?.pageType === "image" ? (
                    <ImageCard image={props.activePage[0]} preview={pageURL} />
                  ) : props?.activePage[0]?.type === "video" ||
                    props?.pageType === "video" ? (
                    <Video video={props.activePage[0]} preview={pageURL} />
                  ) : props?.activePage[0]?.type === "links" ||
                    props?.pageType === "links" ? (
                    <LinkPreviewCard
                      link={props.activePage[0]}
                      preview={pageURL}
                    />
                  ) : props?.activePage[0]?.type === "file" ||
                    props?.pageType === "file" ? (
                    <Website file={props.activePage[0]} preview={pageURL} />
                  ) : props?.activePage[0]?.type === "books" ||
                    props?.pageType === "book" ? (
                    <BookCard book={props.activePage[0]} preview={pageURL} />
                  ) : props?.activePage[0]?.type === "iframe" ||
                    props?.pageType === "iframe" ? (
                    <Iframe iframe={props.activePage[0]} preview={pageURL} />
                  ) : null}
                </>
              )}
            </div>
          </>
        </span>
      </div>
      {/* Generate QR Modal*/}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative max-w-[318px] rounded-[8px] text-center">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            <span className="mt-[4px] ml-[1px]">✕</span>
          </label>
          <h3 className="mb-[33px] text-center font-[800]">QR Code</h3>
          <div className="mb-[24px]">
            <QRCode
              id="qr-gen"
              value={`${import.meta.env.VITE_BASE_URL_ADMIN}/${
                props.masterLink
              }`}
              size={270}
              level={"H"}
              includeMargin={true}
              imageSettings={{
                src: logo,
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
          <Btn
            title={<p>Download</p>}
            className="max-w-[165px]"
            onClick={downloadQRCode}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Previewprofile = ({ pageData, userData }) => {
  return (
    <div className="h-full">
      <div className="mx-auto mb-[40px] flex w-full flex-col items-center justify-center pt-[40px]">
        {/* Profile Data  */}
        <img
          src={`${import.meta.env.VITE_BASE_URL}/images/${userData?.image}`}
          alt=""
          className="h-[107px] w-[107px] rounded-full object-cover"
        />
        <div className="mt-[24px] flex flex-col items-center justify-center">
          <h2 className="mb-[8px] text-[24px] font-[700] leading-[36px] text-center">
            {userData?.full_name}
          </h2>
          <h4 className="text-[16px] font-[700]">
            {pageData?.map?.content?.designation}
          </h4>
          <div className="flex items-center gap-1">
            <LocationIcon />
            <h4 className="items-start text-center text-[14px] font-[500] leading-[21px] text-[#585858]">
              {/* {props.masterLinkData.page?.map?.content?.company_address} */}
              {pageData?.map?.content?.company_address}
            </h4>
          </div>
        </div>
      </div>
      <div className="px-4">
        <button className="btn w-full border-none bg-brand_primary hover:bg-brand_primary">
          My Info
        </button>
      </div>
    </div>
  );
};

const Biolink = ({ pageData, userData }) => {
  return (
    <div>
      <div className="Bio_Wrapper">
        <div className="Bio_Details  mb-[40px] flex flex-col items-center justify-center">
          {/* Profile Data  */}
          <div className="img_container pt-[10px] ">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/images/${userData?.image}`}
              alt=""
              className="h-[107px] w-[107px] rounded-full object-cover"
            />
          </div>
          <div className="Bio_contents mt-[24px]  flex flex-col items-center justify-center">
            <h2 className="mb-[8px] text-[24px] font-[700] leading-[36px] text-center">
              {/* {props.masterLinkData?.page.map?.content?.name} */}
              {pageData?.map?.content?.name}
            </h2>
            <p className="text-center text-[16px] font-[400] leading-[22px]">
              {/* {props.masterLinkData?.page.map?.content?.intro} */}
              {pageData?.map?.content?.intro}
            </p>
          </div>
        </div>
        <div className="Bio_links px-3">
          {/* Map Links Items */}
          {pageData?.map?.content?.biolink
            .filter(
              (el) => el.name !== "addToContact" && el.on_display === "yes"
            )
            .map((linksData, i) => (
              <div
                key={i}
                className="links_item custom-transition relative mb-[16px] cursor-pointer select-none rounded-[16px] border-[1px] border-[#585858] pt-[16px] pb-[12px] hover:scale-105 hover:shadow-md active:scale-95"
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/images/${
                    linksData?.icon
                  }`}
                  alt=""
                  className="absolute top-[50%] left-[13px] h-[34px] w-[34px] translate-y-[-50%] object-cover"
                />
                <h4 className="w-full text-center text-[14px] font-[700] capitalize leading-[28px]">
                  {linksData.name}
                </h4>
              </div>
            ))}
        </div>
      </div>
      {pageData?.map?.content?.biolink
        .filter((el) => el.name === "addToContact" && el.on_display === "yes")
        .map((_, i) => (
          <div className="ButtonGroup mb-[60px] px-4" key={i}>
            <button className="btn w-full border-none bg-brand_primary hover:bg-brand_primary ">
              Add to Contact
            </button>
          </div>
        ))}
      <img
        src={Logo}
        alt="affix logo"
        className="mx-auto h-[45px] w-[136px] object-contain select-none pb-2"
        loading="lazy"
      />
    </div>
  );
};

export default PreviewCard;
