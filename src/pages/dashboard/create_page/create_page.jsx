import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// ASSETS
import { page } from "../../../assets/data/page";
// FEATURES
import { useGetPagesQuery } from "../../../features/api/pageApi";
import Loader from "../../../layout/Loader/Loader";

const Create_page = () => {
  const [bio, setBio] = useState(false);
  const [profile, setProfile] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isSuccess: pageIsSuccess,
  } = useGetPagesQuery();

  useEffect(() => {
    if (pageIsSuccess) {
      pageData.data.map((item) => {
        item.type === "bio-link" && setBio(true),
          item.type === "profile" && setProfile(true);
      });
    }
  }, [pageIsSuccess]);

  if (pageIsLoading || !pageIsSuccess) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <motion.div
      className="md:mr-[40px] h-[100dvh]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex gap-[40px] items-center mb-[24px]">
        <h2>Create Pages</h2>
      </div>
      <div className="flex justify-center md:justify-start items-start flex-wrap gap-[16px]">
        {page
          .filter((el) =>
            bio && profile
              ? el.title !== "bio link" && el.title !== "profile"
              : bio
                ? el.title !== "bio link"
                : profile
                  ? el.title !== "profile"
                  : el
          )
          .map((item, i) => (
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.2 * i }}
              key={i}
            >
              <Link
                to={`/dashboard/my_page/create_page/${item.path}`}
                className="bg-brand_secondary  h-[106px] w-[106px] rounded-[8px] p-[8px] flex flex-col justify-center items-center cursor-pointer custom-transition hover:shadow-md group active:scale-95"
              >
                {item.icon}
                <p className="capitalize">{item.title}</p>
              </Link>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default Create_page;
