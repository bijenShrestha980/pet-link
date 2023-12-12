import { Fragment, memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// FEATURES
import { appSelector } from "../../features/slice/appSlice";
// ASSETS
import logo from "../../assets/images/login-affixlink-logo2.png";
import sm_logo from "../../assets/images/afixlink.png";
import { SidebarPropMenuIcon } from "../../utils/icons";
import { routes } from "../../routes";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { super_admin } = useSelector(appSelector);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 786) {
      setShow(false);
    }
  }, [window.innerWidth]);

  return (
    <motion.div
      className={`bg-[#ffffff] transition-all ease-in-out duration-700 absolute z-10 md:static md:z-0 shadow-md ${
        show === false
          ? "-translate-x-full w-0 md:w-0"
          : "translate-x-0 w-[70px] md:w-[292px]"
      }`}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`sticky h-[100dvh] top-0 flex md:flex-col flex-col-reverse items-center transition-all ease-in-out duration-700 bg-[#ffffff] z-10`}
      >
        <span className="bg-sky-50 h-[100dvh] w-full absolute left-0 -z-10 transition-all ease-in-out duration-700"></span>

        <div
          className={`flex flex-col justify-center items-center py-8 md:pt-[43px] md:pb-[56px] transition-all ease-in-out duration-700 ${
            show === false ? "px-0" : "px-[10px] md:px-[43px]"
          }`}
        >
          <picture>
            <source media="(max-width:768px)" srcSet={sm_logo} />
            <img
              src={logo}
              alt="affix logo"
              className={`md:h-[51px] md:w-[154px] w-[35px] h-[35px] object-contain select-none`}
              loading="lazy"
            />
          </picture>
          <span
            className="rounded-full bg-brand_primary cursor-pointer custom-transition scale-110 hover:scale-125 active:scale-100 shadow-md mt-[32px] md:mt-0 pt-[10px] pl-[8px] h-[37px] w-[37px] absolute right-[-17px]"
            onClick={() => setShow((current) => !current)}
          >
            <SidebarPropMenuIcon color="#ffffff" />
          </span>
        </div>
        <ul
          className={`py-4 w-full h-full grow flex flex-col-reverse md:flex-col justify-self-end md:justify-self-start`}
        >
          {routes.map((route, i) => (
            <Fragment key={i}>
              {route.sidebar &&
                route.pages
                  .filter((el) =>
                    super_admin === true
                      ? el.name !== "my page"
                      : el.name !== "users"
                  )
                  .map((item) => (
                    <Fragment key={item.name}>
                      {item.sidebar && (
                        <div
                          key={i}
                          className={`mb-[8px] hover:border-r-[2px] hover:border-brand_primaryFade ${
                            location.pathname?.split("/")[2] ===
                              item.path?.split("/")[1] &&
                            `${
                              show === false
                                ? "border-r-0"
                                : "border-r-[2px] border-brand_primary"
                            }`
                          }`}
                        >
                          <li
                            key={i}
                            className={`flex items-center justify-start py-[14px] px-[15px] md:pl-[14px] mx-[10px] md:mx-[16px] rounded-[8px] cursor-pointer custom-transition capitalize group relative ${
                              show === false
                                ? "-translate-x-96 "
                                : "translate-x-0 "
                            }${
                              location.pathname?.split("/")[2] ===
                              item.path?.split("/")[1]
                                ? "bg-brand_primary text-white hover:bg-brand_primary"
                                : "hover:bg-brand_primaryFade"
                            } `}
                            onClick={() => {
                              navigate(`/${route.layout}${item.path}`);
                              window.innerWidth < 768 && setShow(false);
                            }}
                          >
                            {location.pathname?.split("/")[2] ===
                            item.path?.split("/")[1]
                              ? item.iconActive
                              : item.icon}
                            <h2 className="hidden pt-[6px] text-[14px] font-[400] md:block select-none">
                              {item.name}
                            </h2>
                          </li>
                        </div>
                      )}
                    </Fragment>
                  ))}
            </Fragment>
          ))}
        </ul>
        {/* <div
          className={`hidden md:block bg-brand_primary rounded-[8px] mx-[16px] mb-[75px] px-[16px] py-[25px] text-center transition-all ease-in-out duration-700 ${
            show === false ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-[#FFFFFF] text-[20px] font-[800] leading-[28px] mb-[8px] select-none">
            Go Premium
          </h2>
          <p className="text-[white] mb-[24px] select-none">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <span className="bg-white text-brand_primary text-[14px] font-[700] py-[12px] px-[48px] rounded-[8px] select-none cursor-pointer">
            Upgrade
          </span>
        </div> */}
      </div>
    </motion.div>
  );
};

export default memo(Sidebar);
