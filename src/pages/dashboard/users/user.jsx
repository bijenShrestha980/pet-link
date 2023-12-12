import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetPageIdQuery } from "../../../features/api/pageApi";
import { useGetUserByIdQuery } from "../../../features/api/userApi";
import { useGetAnalyticsByIdQuery } from "../../../features/api/analyticsApi";

import Loader from "../../../layout/Loader/Loader";

import ActivePageCard from "../../../components/Card/ActivePageCard";
import AffixLinkCard from "../../../components/Card/AffixLinkCard";
import AnalyticsCard from "../../../components/Card/AnalyticsCard";
import PreviewCard from "../../../components/Card/PreviewCard";
import UserInfoCard from "../../../components/Card/UserInfoCard";

const User = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const {
    data: userByIdData,
    isLoading: userByIdIsLoading,
    isSuccess: userByIdIsSuccess,
  } = useGetUserByIdQuery({ id });

  const {
    data: analyticsData,
    isLoading: analyticsIsLoading,
    isSuccess: analyticsIsSuccess,
  } = useGetAnalyticsByIdQuery({ id });

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isSuccess: pageIsSuccess,
  } = useGetPageIdQuery({ id: userByIdData?.data?.page?.id });

  // const activePageData = pageData?.data?.page?.map?.filter(
  //   (Pactive) => Pactive.active === "yes"
  // );

  if (
    pageIsLoading ||
    analyticsIsLoading ||
    userByIdIsLoading ||
    !pageIsSuccess ||
    !analyticsIsSuccess ||
    !userByIdIsSuccess
  ) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <div className="mr-0 mb-[20px] lg:mr-[20px]">
      <div className="mb-[24px] flex items-center justify-between gap-[40px]">
        <h2>Users</h2>
      </div>
      <div className="grid grid-cols-1 gap-[39px] lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            {/* Active Page */}
            <UserInfoCard cardData={userByIdData?.data} />
            {/* Affix Link Card */}
            <AffixLinkCard
              cardData={userByIdData?.data?.personal_information[0]}
            />
          </div>
          {/* Analytics */}
          <AnalyticsCard
            masterLink={userByIdData?.data?.master_link}
            analyticsData={analyticsData.data}
          />
        </div>
        <PreviewCard
          masterLink={userByIdData?.data?.master_link}
          activePage={
            pageData?.data?.page?.map?.content
              ? [pageData?.data?.page]
              : pageData?.data?.page?.map
          }
          pageType={pageData?.data?.page?.type && pageData?.data?.page?.type}
          personalData={userByIdData?.data?.personal_information[0]}
          loading={loading}
          pageIsLoading={pageIsLoading}
          pageIsSuccess={pageIsSuccess}
        />
      </div>
    </div>
  );
};

export default User;
