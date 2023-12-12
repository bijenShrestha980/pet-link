import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// ASSETS
import { SearchIcon } from "../../utils/icons";
import CreateLinkModal from "./CreateLinkModal";

const BioLinksModal = (props) => {
  const [filterLink, setFilterLink] = useState("");
  const [showOwnLink, setShowOwnLink] = useState(false);

  const handleSetIcon = (item) => {
    props.setIconList([
      ...props.iconList,
      {
        id: uuidv4(),
        name: item.name,
        on_display: "yes",
        alias: null,
        icon_id: item.id,
        icon: item.image,
        url:
          item.name.toLowerCase() === "phone"
            ? "tel:"
            : item.name.toLowerCase() === "viber"
            ? "viber://add?number="
            : item.name.toLowerCase() === "whatsapp"
            ? "https://wa.me/"
            : item.name.toLowerCase() === "facebook"
            ? "https://www.facebook.com/"
            : item.name.toLowerCase() === "messenger"
            ? "https://m.me/"
            : item.name.toLowerCase() === "instagram"
            ? "instagram://user?username="
            : item.name.toLowerCase() === "twitter"
            ? "Example : www.twitter.com/"
            : item.name.toLowerCase() === "youtube"
            ? "https://www.youtube.com/watch?v="
            : item.name.toLowerCase() === "tiktok"
            ? "https://www.tiktok.com/@"
            : item.name.toLowerCase() === "wechat"
            ? "https://wa.me/"
            : item.name.toLowerCase() === "zoom"
            ? "https://"
            : item.name.toLowerCase() === "vimeo"
            ? "https://player.vimeo.com/video/"
            : item.name.toLowerCase() === "behance"
            ? "https://www.behance.net/"
            : item.name.toLowerCase() === "flickr"
            ? "https://www.flickr.com/photos/"
            : item.name.toLowerCase() === "linkedin"
            ? "https://www.linkedin.com/in/"
            : item.name.toLowerCase() === "pinterest"
            ? "https://www.pinterest.com/"
            : item.name.toLowerCase() === "skype"
            ? "https://skype:"
            : item.name.toLowerCase() === "snap_chat"
            ? "https://www.snapchat.com/add/"
            : item.name.toLowerCase() === "telegram"
            ? "https://t.me/"
            : item.name.toLowerCase() === "gmail"
            ? ""
            : item.name.toLowerCase() === "playstore"
            ? "https://play.google.com/store/apps/details?id==="
            : item.name.toLowerCase() === "tripadvisor"
            ? "https://www.tripadvisor.com/"
            : item.name.toLowerCase() === "appstore"
            ? "https://apps.apple.com/us/app/"
            : item.name.toLowerCase() === "microsoft"
            ? `https://www.microsoft.com/store/productId/`
            : "",
      },
    ]);
  };

  return (
    <>
      <input
        type="checkbox"
        id="my-icon-modal"
        className="modal-toggle"
        checked={props.bioLinksModal}
        onClick={() => props.setBioLinksModal(false)}
        readOnly
      />
      <label
        htmlFor="my-icon-modal"
        className="modal cursor-pointer custom-transition"
      >
        <label
          className={`modal-box bg-white rounded-[16px] p-[24px] custom-transition min-h-[635px] overflow-hidden`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center pb-[24px]">
            <h2>Links</h2>
            <span
              className={`bg-brand_primary pt-[14px] pb-[12px] px-[28px] h-full w-full sm:w-[204px] text-[#ffffff] rounded-[8px] text-[14px] font-[700] leading-[20px] transition-all ease-in-out duration-300 active:scale-90 hover:scale-105 hover:shadow-md select-none text-center cursor-pointer`}
              onClick={() => setShowOwnLink((current) => !current)}
            >
              Create Your Own Link
            </span>
          </div>
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute top-[11px] left-[12px]" />
            <input
              type="text"
              name="search"
              placeholder="Search for link"
              className="w-full h-[46px] bg-[#EEEEEE] rounded-[4px] mb-[32px] py-[14px] pl-[44px] pr-[14px] outline-none"
              onChange={(e) => setFilterLink(e.target.value)}
            />
          </div>
          {/* Icon links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] max-h-[440px] overflow-auto pr-1 custom-transition">
            {/* Default icons */}
            {props.pageData.page?.icons?.default.length > 0 &&
              props.pageData.page?.icons?.default
                .filter((el) => el?.name?.toLowerCase().includes(filterLink))
                .map((item, i) => (
                  <div
                    key={i}
                    className="w-full h-[58px] rounded-[8px] bg-brand_primaryFade p-[20px] flex justify-start items-center gap-[8px] capitalize cursor-pointer select-none custom-transition border border-brand_primaryFade hover:border-brand_primary group"
                    onClick={() => {
                      handleSetIcon(item);
                      props.setBioLinksModal(false);
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/images/${
                        item?.image
                      }`}
                      alt={item?.image}
                      loading="lazy"
                      className="w-[26px] h-[26px] rounded-full object-cover custom-transition group-hover:scale-105"
                    />
                    <p className="pt-[4px]">{item.name}</p>
                  </div>
                ))}
            {props.pageData.page?.icons?.custom.length > 0 &&
              props.pageData.page?.icons?.custom
                .filter((el) => el?.name?.toLowerCase().includes(filterLink))
                .map((item, i) => (
                  <div
                    key={i}
                    className="w-full h-[58px] rounded-[8px] bg-brand_primaryFade p-[20px] flex justify-start items-center gap-[8px] capitalize cursor-pointer select-none custom-transition border border-brand_primaryFade hover:border-brand_primary group"
                    onClick={() => {
                      handleSetIcon(item);
                      props.setBioLinksModal(false);
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/images/${
                        item?.image
                      }`}
                      alt={item?.image}
                      loading="lazy"
                      className="w-[26px] h-[26px] rounded-full object-cover custom-transition group-hover:scale-105"
                    />
                    <p className="pt-[4px]">{item.name}</p>
                  </div>
                ))}
          </div>
        </label>
      </label>
      <CreateLinkModal
        setShowOwnLink={setShowOwnLink}
        showOwnLink={showOwnLink}
      />
    </>
  );
};

export default BioLinksModal;
