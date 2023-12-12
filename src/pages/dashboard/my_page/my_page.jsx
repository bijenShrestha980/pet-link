import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// FEATURES
import { useGetPagesQuery } from "../../../features/api/pageApi";
// ASSETS
import { PlusIcon } from "../../../utils/icons";
// COMPONENTS
import Loader from "../../../layout/Loader/Loader";
import LinkCard from "../../../components/Card/LinkCard";

const My_page = () => {
  const navigate = useNavigate();

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isFetching: pageIsFetching,
    isSuccess: pageIsSuccess,
  } = useGetPagesQuery();

  if (pageIsLoading || !pageIsSuccess) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <motion.div
      className="mr-0 mb-[20px] lg:mr-[20px]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-[24px] flex items-center justify-between gap-[40px]">
        <h2>My Link</h2>
      </div>
      {/* Pages */}
      <div className="grid grid-cols-1 justify-center gap-[16px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {!pageData?.data.filter((e) => e.type === "bio-link").length > 0 && (
          <div
            onClick={() => navigate("/dashboard/my_link/pet-link")}
            className="custom-transition group flex h-[220px] md:h-[290px] w-full cursor-pointer flex-col items-center justify-center gap-[16px] rounded-[8px] border-2 border-dashed border-brand_primary bg-white hover:shadow-lg active:scale-95"
          >
            <button className="custom-transition flex h-[38px] w-[38px] items-center justify-center rounded-full border border-brand_primaryFade bg-brand_primary group-hover:scale-110 group-active:scale-95">
              <PlusIcon className="custom-transition text-white group-hover:scale-105" />
            </button>
            <h3 className="text-center">Create New Link</h3>
          </div>
        )}
        {pageData.data.map((item, i) => (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.2 * i }}
            className="flex h-[220px] md:h-[290px] w-full items-center justify-center overflow-hidden rounded-[8px] bg-white"
            key={i}
          >
            <LinkCard cardItems={item} pageIsFetching={pageIsFetching} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default My_page;
