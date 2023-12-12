import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// FEATURES
import { appSelector } from "../../features/slice/appSlice";
import { useGetPagesQuery } from "../../features/api/pageApi";
import { useGetAnalyticsQuery } from "../../features/api/analyticsApi";
import { useGetUserByIdQuery } from "../../features/api/userApi";
// COMPONENTS
import Loader from "../../layout/Loader/Loader";
import ActivePageCard from "../../components/Card/ActivePageCard";
import AffixLinkCard from "../../components/Card/AffixLinkCard";
import AnalyticsCard from "../../components/Card/AnalyticsCard";
import PreviewCard from "../../components/Card/PreviewCard";
import InfoModal from "../../components/Modal/InfoModal";
import BulkMessageCard from "../../components/Card/BulkMessageCard";
import UserCard from "../../components/Card/UserCard";

const Home = () => {
  const { super_admin, token } = useSelector(appSelector);
  const [loading, setLoading] = useState(false);
  const id = token.affix_userId;

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isFetching: pageIsFetching,
    isSuccess: pageIsSuccess,
  } = useGetPagesQuery();

  const {
    data: userByIdData,
    isLoading: userByIdIsLoading,
    isSuccess: userByIdIsSuccess,
  } = useGetUserByIdQuery({ id });

  const {
    data: analyticsData,
    isLoading: analyticsIsLoading,
    isSuccess: analyticsIsSuccess,
  } = useGetAnalyticsQuery({ skip: userByIdIsSuccess });

  const activePageData = pageData?.data.filter(
    (Pactive) => Pactive.active === "yes"
  );

  if (
    pageIsLoading ||
    userByIdIsLoading ||
    !pageIsSuccess ||
    !userByIdIsSuccess
  ) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <motion.div
      className={`grid grid-cols-1 gap-4 lg:grid-cols-2 xl:mr-[20px] ${
        super_admin ? "" : "xl:grid-cols-3"
      }`}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Preview Card */}
      {!super_admin && (
        <PreviewCard
          masterLink={userByIdData?.data?.master_link}
          activePage={activePageData}
          personalData={userByIdData?.data?.personal_information[0]}
          loading={loading}
          pageIsLoading={pageIsLoading}
          pageIsFetching={pageIsFetching}
          pageIsSuccess={pageIsSuccess}
        />
      )}
      {super_admin && (
        <div className="xl:hidden">
          <div className="flex w-full flex-col gap-4 lg:h-[160px]">
            <div className="grow ">
              <BulkMessageCard
                title="Bulk Notifications"
                btnName="Send Bulk Message"
              />
            </div>
            <div className="grow">
              <UserCard />
            </div>
          </div>
        </div>
      )}
      {/* Affix Link Card */}
      <div className="xl:hidden">
        <AffixLinkCard cardData={userByIdData?.data?.personal_information[0]} />
      </div>
      <div className={`flex flex-col gap-4 lg:col-span-2`}>
        {/* Analytics */}
        {analyticsIsLoading && !analyticsIsSuccess ? (
          <SkeletonTheme baseColor="#f8ffd29e" highlightColor="#ffffff">
            <Skeleton className="h-[300px] w-full" />
          </SkeletonTheme>
        ) : (
          <AnalyticsCard
            analyticsIsLoading={analyticsIsLoading}
            analyticsIsSuccess={analyticsIsSuccess}
            masterLink={userByIdData?.data?.master_link}
            analyticsData={analyticsData?.data}
          />
        )}
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          {super_admin && (
            <div className="hidden xl:block w-full">
              <div className="flex w-full flex-col gap-4 lg:h-[160px]">
                <div className="grow ">
                  <BulkMessageCard
                    title="Bulk Notifications"
                    btnName="Send Bulk Message"
                  />
                </div>
                <div className="grow">
                  <UserCard />
                </div>
              </div>
            </div>
          )}
          {/* Active Page */}
          {/* {!super_admin && (
            <ActivePageCard
              pageData={pageData.data}
              setLoading={setLoading}
              pageIsLoading
              pageIsSuccess
            />
          )} */}
          {/* Affix Link Card */}
          <div className="hidden xl:block">
            <AffixLinkCard
              cardData={userByIdData?.data?.personal_information[0]}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <InfoModal userByIdData={userByIdData?.data?.personal_information} />
    </motion.div>
  );
};

export default Home;
