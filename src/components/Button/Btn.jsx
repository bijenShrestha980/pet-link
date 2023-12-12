import { memo } from "react";

const Btn = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`bg-brand_primary pt-[14px] pb-[12px] px-[48px] h-[44px] w-full sm:w-[316px] text-[#ffffff] rounded-[8px] text-[14px] font-[700] leading-[20px] transition-all ease-in-out duration-300 active:scale-90 hover:scale-105 hover:shadow-md select-none ${
        props.className ? props.className : ""
      }`}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default memo(Btn);
