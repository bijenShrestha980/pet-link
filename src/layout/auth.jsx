import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// ASSETS
import landing from "../assets/images/mobile-homepage.png";
import logo from "../assets/images/login-affixlink-logo2.png";
// FEATURES
import { appSelector } from "../features/slice/appSlice";
import { routes } from "../routes";

const Auth = () => {
  const navigate = useNavigate();
  const { token } = useSelector(appSelector);

  useEffect(() => {
    if (token.affix_token) {
      navigate("/dashboard/home");
    }
  }, [token.affix_token]);

  return (
    <div className="grid h-[100dvh] w-full md:grid-cols-5 bg-white relative">
      <motion.div
        className="hidden bg-brand_primaryFade text-[#fff] md:col-span-2 md:block rounded-br-[75%]"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="hidden bg-brand_secondary text-[#fff] md:col-span-2 md:block rounded-br-[85%]"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="hidden bg-brand_primary text-[#fff] md:col-span-2 md:block rounded-br-full area"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="flex h-full w-full flex-col items-center justify-center gap-[16px]">
              <h1 className="text-[36px] font-[800] leading-[54px]">
                Tap to connect!
              </h1>
              <ul className="flex list-disc flex-col gap-[16px] text-[16px] font-[400]">
                <li className=" leading-[22px]">Adventures made safe</li>
                <li className=" leading-[22px]">Safety meets technology</li>
                <li className=" leading-[22px]">Your pet's silent guardian</li>
              </ul>
              <picture className="hidden md:block">
                <source media="(max-width:768px)" />
                <img
                  src={landing}
                  alt="affix phone and card mockup"
                  className="mt-[70px] mr-[40px] md:h-[324px] lg:h-[424px]"
                />
              </picture>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="h-full w-full  md:col-span-3">
        <div className="relative m-auto flex h-[100dvh] max-w-[435px] flex-col justify-center p-5">
          <picture className="hidden md:block">
            <source media="(max-width:768px)" />
            <img src={logo} alt="affix logo" className="mb-[56px] w-[186px]" />
          </picture>

          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "auth" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Auth;
